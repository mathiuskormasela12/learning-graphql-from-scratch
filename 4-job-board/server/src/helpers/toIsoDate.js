// ========= To Iso Date

export const toIsoDate = (rawDate) => new Date(rawDate).toISOString().slice(0, 'yyyy-mm-dd'.length);
