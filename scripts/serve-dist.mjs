// Static server for dist/ that mimics Cloudflare Pages: gzip + dist/_headers cache rules.
// Maps /foo -> foo.html (Nitro writes about.html, not about/index.html), which
// @lhci/cli's built-in staticDistDir server does not do — it 404s every page.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { gzipSync } from 'node:zlib'
import { join, extname, resolve } from 'node:path'

const projectRoot = resolve(import.meta.dirname, '..')
const root = join(projectRoot, 'dist')
const port = Number(process.env.PORT ?? 4174)
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.xml': 'application/xml', '.ico': 'image/x-icon', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json',
  '.wasm': 'application/wasm', '.avif': 'image/avif', '.gif': 'image/gif'
}

// Parse dist/_headers into [pattern, {name: value}] pairs (Pages syntax).
const rules = []
try {
  const raw = await readFile(join(root, '_headers'), 'utf8')
  let current = null
  for (const line of raw.split('\n')) {
    if (!line.trim()) {
      current = null
      continue
    }
    if (!/^\s/.test(line)) {
      const pattern = line.trim()
      current = { pattern, headers: {} }
      rules.push(current)
    } else if (current) {
      const i = line.indexOf(':')
      if (i > 0) current.headers[line.slice(0, i).trim().toLowerCase()] = line.slice(i + 1).trim()
    }
  }
} catch { /* no _headers */ }

function cacheControlFor(path) {
  for (const { pattern, headers } of rules) {
    // Pages patterns are path prefixes; '*' is a wildcard suffix.
    const base = pattern.replace(/\*+$/, '')
    if (path.startsWith(base)) return headers['cache-control']
  }
  return undefined
}

const compressible = new Set(['.html', '.js', '.mjs', '.css', '.json', '.svg', '.xml', '.txt', '.webmanifest', '.wasm'])

// `@nuxt/icon` asks its own origin for any icon that was not baked into the
// prerendered CSS: /api/_nuxt_icon/<collection>.json?icons=a,b. In production
// that is a Nitro route inside dist/_worker.js; a static server has no routes,
// so it 404s — and a 404 is the one answer Iconify does not fall back from, so
// the icon vanishes silently. Serve it from the same installed collection the
// build reads, the way `serverBundle: 'local'` would.
const ICON_ROUTE = /^\/api\/_nuxt_icon\/([a-z0-9-]+)\.json$/

async function serveIconRequest(res, collectionName, requested) {
  if (!requested.length) return notFound(res)

  try {
    const { getIcons } = await import('@iconify/utils')
    const file = join(projectRoot, 'node_modules', '@iconify-json', collectionName, 'icons.json')
    const collection = JSON.parse(await readFile(file, 'utf8'))
    const body = JSON.stringify(getIcons(collection, requested))
    res.writeHead(200, { 'content-type': 'application/json', 'content-length': String(body.length) })
    res.end(body)
  } catch {
    notFound(res)
  }
}

function notFound(res) {
  res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' })
  res.end('<h1>404</h1>')
}

createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0])
  if (p.length > 1) p = p.replace(/\/+$/, '')

  const iconRoute = p.match(ICON_ROUTE)
  if (iconRoute) {
    const requested = (new URL(req.url, 'http://127.0.0.1').searchParams.get('icons') ?? '').split(',').filter(Boolean)
    return serveIconRequest(res, iconRoute[1], requested)
  }

  const candidates = [join(root, p), join(root, `${p}.html`), join(root, p, 'index.html')]
  for (const c of candidates) {
    try {
      const s = await stat(c)
      if (!s.isFile()) continue
      const ext = extname(c)
      let body = await readFile(c)
      const headers = { 'content-type': types[ext] ?? 'application/octet-stream' }
      const cc = cacheControlFor(p)
      if (cc) headers['cache-control'] = cc
      if (compressible.has(ext) && (req.headers['accept-encoding'] ?? '').includes('gzip') && body.length > 1024) {
        body = gzipSync(body)
        headers['content-encoding'] = 'gzip'
        headers.vary = 'accept-encoding'
      }
      headers['content-length'] = String(body.length)
      res.writeHead(200, headers)
      res.end(body)
      return
    } catch { /* try next */ }
  }
  notFound(res)
}).listen(port, '127.0.0.1', () => console.log(`serve-dist listening on http://127.0.0.1:${port}`))
