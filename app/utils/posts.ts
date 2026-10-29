/**
 * Keep only the entries that belong to a locale.
 *
 * English content carries no explicit `locale` in frontmatter, relying on the
 * schema default, and that default is not materialised in the column a
 * `.where('locale', '=', …)` would match against — so this has to happen in JS,
 * never back in the query. See §"locale is not filterable in SQL" in HANDOFF.md.
 */
export const filterByLocale = <T extends { locale?: string | null }>(
  items: T[],
  locale: string
): T[] => items.filter(item => (item.locale ?? 'en') === locale)
