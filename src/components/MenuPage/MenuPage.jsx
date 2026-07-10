import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import './MenuPage.css'

const CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vR3m-eh4PRxIpUeN791xFn2g3liwxwDcJxb_7fm2n97-0VaOn_89rUUa0wM_ko51snK3QqCfZTmbhCy/pub?gid=938545336&single=true&output=csv'

const formatPrice = (value) => {
  const number = Number(value)
  if (Number.isNaN(number)) return value
  return `$${number.toLocaleString('es-AR')}`
}

const groupByCategoria = (rows) => {
  const groups = new Map()
  let appearanceIndex = 0

  rows.forEach((row) => {
    const categoria = row.categoria?.trim()
    if (!categoria) return

    if (!groups.has(categoria)) {
      const orden = Number(row.orden)
      groups.set(categoria, {
        items: [],
        orden: Number.isNaN(orden) ? null : orden,
        appearance: appearanceIndex++,
      })
    }

    groups.get(categoria).items.push({
      titulo: row.titulo?.trim(),
      descripcion: row.descripcion?.trim(),
      precio: row.precio,
      esCombo: row.es_combo?.trim().toUpperCase() === 'TRUE',
      precioConPapas: row.precio_con_papas,
      precioConBebida: row.precio_con_bebida,
      precioConCerveza: row.precio_con_cerveza,
    })
  })

  return [...groups.entries()]
    .sort(([, a], [, b]) => {
      if (a.orden !== null && b.orden !== null) return a.orden - b.orden
      if (a.orden !== null) return -1
      if (b.orden !== null) return 1
      return a.appearance - b.appearance
    })
    .map(([categoria, group]) => ({ categoria, items: group.items }))
}

const MenuPage = () => {
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState('loading')
  const [openCategories, setOpenCategories] = useState(new Set())

  useEffect(() => {
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCategories(groupByCategoria(results.data))
        setStatus('ready')
      },
      error: () => setStatus('error'),
    })
  }, [])

  const toggleCategory = (categoria) => {
    setOpenCategories((current) => {
      const next = new Set(current)
      if (next.has(categoria)) {
        next.delete(categoria)
      } else {
        next.add(categoria)
      }
      return next
    })
  }

  return (
    <main className="menu-page">
      <h1 className="menu-page__title">Menú</h1>

      {status === 'loading' && <p className="menu-page__status">Cargando menú...</p>}
      {status === 'error' && (
        <p className="menu-page__status">No se pudo cargar el menú, intentá de nuevo más tarde.</p>
      )}

      {status === 'ready' && (
        <div className="menu-page__accordion">
          {categories.map(({ categoria, items }) => {
            const isOpen = openCategories.has(categoria)
            return (
              <div className="menu-category" key={categoria}>
                <h2 className="menu-category__heading">
                  <button
                    type="button"
                    className="menu-category__header"
                    onClick={() => toggleCategory(categoria)}
                    aria-expanded={isOpen}
                  >
                    <span>{categoria}</span>
                    <svg
                      className={`menu-category__chevron${isOpen ? ' menu-category__chevron--open' : ''}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </h2>
                <div className={`menu-category__panel${isOpen ? ' menu-category__panel--open' : ''}`}>
                  <ul className="menu-category__panel-inner">
                    {items.map((item, index) => (
                      <li className="menu-item" key={`${item.titulo}-${index}`}>
                        <div className="menu-item__row">
                          <h3 className="menu-item__title">{item.titulo}</h3>
                          {!item.esCombo && (
                            <span className="menu-item__price">{formatPrice(item.precio)}</span>
                          )}
                        </div>
                        {item.descripcion && <p className="menu-item__description">{item.descripcion}</p>}
                        {item.esCombo && (
                          <ul className="menu-item__combo-prices">
                            {item.precio && (
                              <li className="menu-item__combo-row">
                                <span>{item.precioConPapas ? 'Sin papas' : 'Sin bebida'}</span>
                                <span>{formatPrice(item.precio)}</span>
                              </li>
                            )}
                            {item.precioConPapas && (
                              <li className="menu-item__combo-row">
                                <span>Con papas</span>
                                <span>{formatPrice(item.precioConPapas)}</span>
                              </li>
                            )}
                            {item.precioConBebida && (
                              <li className="menu-item__combo-row">
                                <span>Con bebida</span>
                                <span>{formatPrice(item.precioConBebida)}</span>
                              </li>
                            )}
                            {item.precioConCerveza && (
                              <li className="menu-item__combo-row">
                                <span>Con cerveza</span>
                                <span>{formatPrice(item.precioConCerveza)}</span>
                              </li>
                            )}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}

export default MenuPage
