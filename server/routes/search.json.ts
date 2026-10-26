import { defineEventHandler, setHeader } from 'h3'
// Imported explicitly: the auto-import resolves to the client signature
// `(collection, opts)`, which does not accept an event.
import { queryCollectionSearchSections } from '@nuxt/content/server'

/**
 * The ⌘K search index, generated at build time.
 *
 * This is deliberately a prerendered route rather than a query in `app.vue`.
 * A client-side `queryCollectionSearchSections` is what made Nuxt Content
 * download `sqlite3.wasm` (~380 KiB) plus every collection's `sql_dump.txt`
 * and initialise SQLite on the main thread on each page load. Putting the
 * sections in the Nuxt payload instead duplicated them into every route.
 */
export default defineEventHandler(async (event) => {
  const sections = await queryCollectionSearchSections(event, 'blog')

  setHeader(event, 'content-type', 'application/json; charset=utf-8')
  return sections
})
