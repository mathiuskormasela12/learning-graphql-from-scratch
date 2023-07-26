// ======== To Iso Date

export const toIsoDate = (date) => new Date(date).toISOString().slice(0, 'yyyy-mm-dd'.length);
