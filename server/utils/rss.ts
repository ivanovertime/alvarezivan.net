import { queryCollection } from '@nuxt/content/server'
import type { H3Event } from 'h3'

type BlogEntry = {
  title: string
  description?: string
  path?: string
  locale?: string
  date?: string | Date
  updated?: string | Date
}

type FeedLocale = 'en' | 'es'

const SITE_URL = 'https://alvarezivan.net'

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

const feeds: Record<FeedLocale, { title: string, link: string, description: string, language: string }> = {
  en: {
    title: 'Ivan Over Time',
    link: `${SITE_URL}/blog`,
    description: 'Case studies, side projects, and engineering notes by Iván Álvarez.',
    language: 'en-US'
  },
  es: {
    title: 'Ivan Over Time (Español)',
    link: `${SITE_URL}/es/blog`,
    description: 'Casos de estudio, proyectos personales y notas de ingeniería de Iván Álvarez.',
    language: 'es-ES'
  }
}

// One builder, two channels (`/rss.xml` and `/es/rss.xml`). The feed declares a
// single `<language>`, so each channel lists only its own locale: the translations
// live at parallel `/es/blog/…` paths and must not appear as duplicate items.
// `locale` is a Zod default and is NOT materialised in the queryable column, so the
// filter is done in JS — do not "simplify" it back into a `.where()`.
export const buildRssFeed = async (event: H3Event, locale: FeedLocale) => {
  const feed = feeds[locale]

  const posts = (await queryCollection(event, 'blog').where('hidden', '=', false).all() as BlogEntry[])
    .filter(post => (post.locale ?? 'en') === locale)

  posts.sort((a, b) => {
    const aDate = new Date((a.date ?? a.updated ?? 0) as string | Date).getTime()
    const bDate = new Date((b.date ?? b.updated ?? 0) as string | Date).getTime()
    return bDate - aDate
  })

  const items = posts
    .filter(post => !!post.path)
    .map((post) => {
      const link = `${SITE_URL}${post.path}`
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

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '  <channel>',
    `    <title>${escapeXml(feed.title)}</title>`,
    `    <link>${escapeXml(feed.link)}</link>`,
    `    <description>${escapeXml(feed.description)}</description>`,
    `    <language>${feed.language}</language>`,
    ...(items ? [items] : []),
    '  </channel>',
    '</rss>'
  ].join('\n')
}
