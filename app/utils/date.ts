/**
 * Format a post's date as a stable calendar date.
 *
 * Content dates are date-only values (`date: "2026-06-15"`) that Content parses to a
 * Date at UTC midnight. Formatting that instant in the runtime's own timezone shifts
 * the calendar day: the prerendered HTML was rendered in the build machine's offset
 * while the reader's browser uses theirs, so in any negative-offset timezone the two
 * disagree by one day and Vue reports a hydration text mismatch. Pinning the formatter
 * to UTC always renders the authored calendar day, everywhere.
 */
export const formatPostDate = (date: Date | string, locale: string) => {
  const value = date instanceof Date ? date : new Date(date)
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  }).format(value)
}
