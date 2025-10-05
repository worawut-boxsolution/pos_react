// hosting/src/services/export.service.js
export const downloadCSV = (rows, filename = 'export.csv') => {
  const header = Object.keys(rows[0]).join(',')
  const body = rows.map(r => Object.values(r).join(',')).join('\n')
  const blob = new Blob([`${header}\n${body}`], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}