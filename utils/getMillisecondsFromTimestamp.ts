export const getMillisecondsFromTimestamp = (timestamptz: string) => {
  const dateTz = new Date(timestamptz)
  return dateTz.getTime()
}
