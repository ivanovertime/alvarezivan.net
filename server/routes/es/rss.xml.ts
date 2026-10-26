import { defineEventHandler, setHeader } from 'h3'
import { buildRssFeed } from '../../utils/rss'

export default defineEventHandler(async (event) => {
  const xml = await buildRssFeed(event, 'es')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return xml
})
