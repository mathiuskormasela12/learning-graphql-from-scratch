// ======== Date Helpers

const dateFormat = 'yyyy-mm-dd'

export const parseDate = (rawDate) => {
  return new Date(rawDate).toISOString().slice(0, dateFormat.length)
}
