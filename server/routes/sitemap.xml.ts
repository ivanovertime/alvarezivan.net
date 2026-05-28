import { queryCollection } from '@nuxt/content/server'
import { defineEventHandler, setHeader } from 'h3'

type ContentEntry = {
  path?: string
  date?: string | Date
  updated?: string | Date
}

const formatIsoDate = (value?: string | Date) => {
  if (!value) return undefined
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return undefined
  return date.toISOString()
}

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&apos;')

export default defineEventHandler(async (event) => {
  const siteUrl = 'https://alvarezivan.net'

  const [pages, posts] = await Promise.all([
    queryCollection(event, 'pages').all() as Promise<ContentEntry[]>,
    queryCollection(event, 'blog').where('hidden', '=', false).all() as Promise<ContentEntry[]>
  ])

  const staticRoutes: ContentEntry[] = [
    { path: '/' }
  ]

  const mergedRoutes = [...staticRoutes, ...pages, ...posts]
  const byPath = new Map<string, ContentEntry>()

  for (const route of mergedRoutes) {
    if (!route.path) continue
    byPath.set(route.path, route)
  }

  const urls = [...byPath.values()]
    .map((route) => {
      const lastmod = formatIsoDate(route.updated ?? route.date)
      const location = `${siteUrl}${route.path === '/' ? '' : route.path}`

      return [
        '  <url>',
        `    <loc>${escapeXml(location)}</loc>`,
        ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
        '  </url>'
      ].join('\n')
    })
    .join('\n')

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>'
  ].join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return xml
})
