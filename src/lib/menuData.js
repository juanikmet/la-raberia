import Papa from 'papaparse'

export const MENU_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vR3m-eh4PRxIpUeN791xFn2g3liwxwDcJxb_7fm2n97-0VaOn_89rUUa0wM_ko51snK3QqCfZTmbhCy/pub?gid=938545336&single=true&output=csv'

export const formatPrice = (value) => {
  const number = Number(value)
  if (Number.isNaN(number)) return value
  return `$${number.toLocaleString('es-AR')}`
}

export const fetchMenuRows = () =>
  new Promise((resolve, reject) => {
    Papa.parse(MENU_CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: reject,
    })
  })

export const getStartingPrice = (row) => {
  const candidates = [row.precio, row.precio_con_papas, row.precio_con_bebida, row.precio_con_cerveza]
    .map(Number)
    .filter((value) => !Number.isNaN(value) && value > 0)
  if (!candidates.length) return null
  return Math.min(...candidates)
}
