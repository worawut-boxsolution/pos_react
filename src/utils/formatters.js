// hosting/src/utils/formatters.js

export const fmtMoney = (n) =>
  Number(n || 0).toLocaleString('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

export const fmtQty = (n) => Number(n || 0).toLocaleString('th-TH')

export const fmtDate = (seconds) =>
  new Date(seconds * 1000).toLocaleString('th-TH')

export const fmtDateShort = (seconds) =>
  new Date(seconds * 1000).toLocaleDateString('th-TH', {
    year: '2-digit',
    month: 'short',
    day: 'numeric',
  })

export const fmtTime = (seconds) =>
  new Date(seconds * 1000).toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
  })