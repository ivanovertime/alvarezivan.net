import { queryCollection } from '@nuxt/content/server'
import { defineEventHandler, setHeader } from 'h3'

type BlogEntry = {
  title: string
  description?: string
  path?: string
  date?: string | Date
  updated?: string | Date
}

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&apos;')

const toRssDate = (value?: string | Date) => {
  if (!value) return undefined
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return undefined
  return date.toUTCString()
}

export default defineEventHandler(async (event) => {
  const siteUrl = 'https://alvarezivan.net'

  const posts = await queryCollection(event, 'blog').all() as BlogEntry[]

  posts.sort((a, b) => {
    const aDate = new Date((a.date ?? a.updated ?? 0) as string | Date).getTime()
    const bDate = new Date((b.date ?? b.updated ?? 0) as string | Date).getTime()
    return bDate - aDate
  })

  const items = posts
    .filter(post => !!post.path)
    .map((post) => {
      const link = `${siteUrl}${post.path}`
      const pubDate = toRssDate(post.date ?? post.updated)

      return [
        '  <item>',
        `    <title>${escapeXml(post.title)}</title>`,
        `    <link>${escapeXml(link)}</link>`,
        `    <guid>${escapeXml(link)}</guid>`,
        ...(post.description ? [`    <description>${escapeXml(post.description)}</description>`] : []),
        ...(pubDate ? [`    <pubDate>${pubDate}</pubDate>`] : []),
        '  </item>'
      ].join('\n')
    })
    .join('\n')

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '  <channel>',
    '    <title>Ivan Over Time</title>',
    '    <link>https://alvarezivan.net/blog</link>',
    '    <description>Case studies, side projects, and engineering notes by Iván Álvarez.</description>',
    '    <language>en-US</language>',
    ...(items ? [items] : []),
    '  </channel>',
    '</rss>'
  ].join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return xml
})
