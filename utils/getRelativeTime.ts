const units: { unit: Intl.RelativeTimeFormatUnit; value: number }[] = [
  { unit: 'year', value: 31536000000 },
  { unit: 'month', value: 2628000000 },
  { unit: 'day', value: 86400000 },
  { unit: 'hour', value: 3600000 },
  { unit: 'minute', value: 60000 },
  { unit: 'second', value: 1000 }
]

const rtf = new Intl.RelativeTimeFormat('en')

/**
 * Return relative time message from elapsed time
 * @param elapsed  - the elapsed time in milliseconds
 */
export function relativeTimeFromElapsed(elapsed: number): string {
  for (const { unit, value } of units) {
    if (Math.abs(elapsed) >= value || unit === 'second') {
      return rtf.format(Math.round(elapsed / value), unit)
    }
  }
  return ''
}

/**
 * Return relative time between two dates
 * @param targetDate      - the relative dateTime, generally is in the past or future
 * @param referenceDate   - the dateTime of reference, generally is the current time
 */
// TODO: Improve function when time exceeds a year, in this case it should return the date
export function getRelativeTime(targetDate: Date | null, referenceDate: Date = new Date()): string {
  if (!targetDate) return ''
  const elapsed = targetDate.getTime() - referenceDate.getTime()
  return relativeTimeFromElapsed(elapsed)
}
