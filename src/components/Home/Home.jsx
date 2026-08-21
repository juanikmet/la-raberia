import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchMenuRows, formatPrice, getStartingPrice } from '../../lib/menuData'
import { InstagramIcon, TikTokIcon } from '../LinkInBio/icons'
import './Home.css'

const INSTAGRAM_URL = 'https://www.instagram.com/la.raberia/'
const TIKTOK_URL = 'https://www.tiktok.com/@la.raberia'
const MAPS_URL = 'https://maps.app.goo.gl/CGq7nfEZZNTpxFcJ9'
const MAPS_EMBED_URL = 'https://www.google.com/maps?q=La+Raber%C3%ADa%2C+Dorrego+783&output=embed'
const DELIVERY_URL =
  'https://www.pedidosya.com.ar/restaurantes/buenos-aires/la-raberia-bar-fa2e5ed9-9fd1-4f7e-a6a1-ff9e9067476e-menu'
const HORARIOS = 'Miércoles a domingo de 17hs a 00hs'

const MARQUEE_ITEMS = ['Rabas', 'Langostinos', 'Nuggets', 'Birra', 'Vino', 'Vermú']
const MARQUEE_TEXT = `${MARQUEE_ITEMS.join(' • ')} • `

const HIGHLIGHT_CONFIG = [
  {
    categoria: 'Rabas',
    titulo: 'Bocata de calamar',
    nombre: 'Bocata de calamar',
    imagen: '/destacados/bocata.jpg',
    tag: '★ Más pedido',
  },
  { categoria: 'Rabas', titulo: 'Torre de rabas', nombre: 'Torre de rabas', imagen: '/destacados/torre-de-rabas.jpg' },
  {
    categoria: 'Langostinos',
    titulo: 'Porción',
    nombre: 'Porción de langostinos',
    imagen: '/destacados/langostinos.jpg',
  },
  { categoria: 'Nuggets', titulo: 'Porción Golden', nombre: 'Nuggets Golden', imagen: '/destacados/nuggets.jpg' },
]

const scrollToLocation = () => {
  document.getElementById('ubicacion')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const Home = () => {
  const navRef = useRef(null)
  const [navSolid, setNavSolid] = useState(false)
  const [highlights, setHighlights] = useState(HIGHLIGHT_CONFIG.map((item) => ({ ...item, precio: null })))

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return
      setNavSolid(navRef.current.getBoundingClientRect().top <= 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    fetchMenuRows()
      .then((rows) => {
        setHighlights(
          HIGHLIGHT_CONFIG.map((item) => {
            const row = rows.find(
              (r) => r.categoria?.trim() === item.categoria && r.titulo?.trim() === item.titulo
            )
            const startingPrice = row ? getStartingPrice(row) : null
            return { ...item, precio: startingPrice ? `Desde ${formatPrice(startingPrice)}` : null }
          })
        )
      })
      .catch(() => {})
  }, [])

  return (
    <main className="home">
      <div ref={navRef} className={`home-nav${navSolid ? ' home-nav--solid' : ''}`}>
        <div className="home-nav__inner">
          <img src="/logo-horizontal.png" alt="La Rabería" className="home-nav__logo" />
          <nav className="home-nav__links" aria-label="Navegación principal">
            <Link to="/menu">Menú</Link>
            <button type="button" onClick={scrollToLocation}>
              Ubicación
            </button>
            <a href={DELIVERY_URL} target="_blank" rel="noopener noreferrer">
              Delivery
            </a>
          </nav>
        </div>
      </div>

      <section className="home-hero">
        <img className="home-hero__photo" src="/hero.jpg" alt="" />
        <div className="home-badge">
          <svg className="home-badge__ring" viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <path id="badgeCircle" d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" />
            </defs>
            <circle cx="50" cy="50" r="48" fill="#ff8c44" />
            <text fontFamily="Archivo" fontWeight="700" fontSize="8.6" fill="#06263d" letterSpacing="1.5">
              <textPath href="#badgeCircle" startOffset="0%">
                RABAS ORIGINALES · DESDE SIEMPRE ·
              </textPath>
            </text>
          </svg>
          <div className="home-badge__center">
            <img src="/logo.png" alt="La Rabería" />
          </div>
        </div>
        <div className="home-hero__inner">
          <h1 className="home-hero__title">
            El primer bar de
            <br />
            <span>rabas</span>
          </h1>
          <p className="home-hero__sub">
            Vení a comer las mejores rabas, acompañadas de una birra bien fría a solo 1 cuadra del Movistar Arena.
          </p>
          <div className="home-hero__ctas">
            <Link to="/menu" className="home-btn-solid">
              Ver el menú
            </Link>
            <button type="button" className="home-btn-ghost" onClick={scrollToLocation}>
              ¿Dónde estamos?
            </button>
          </div>
          <span className="home-scribble">↳ Probá nuestra bocata de calamar</span>
        </div>
      </section>

      <div className="home-marquee-checker" aria-hidden="true" />
      <div className="home-marquee-track">
        <span>{MARQUEE_TEXT.repeat(2)}</span>
      </div>
      <div className="home-marquee-checker" aria-hidden="true" />

      <section className="home-menu">
        <div className="home-menu__head">
          <h2 className="home-sticker">
            <span className="home-star">★</span> Lo más pedido
          </h2>
          <Link to="/menu">Ver menú completo →</Link>
        </div>
        <div className="home-menu__track">
          {highlights.map((dish) => (
            <div className="home-dish" key={dish.titulo}>
              {dish.tag && <span className="home-dish__tag">{dish.tag}</span>}
              <div className="home-dish__photo">
                <img src={dish.imagen} alt={dish.nombre} />
              </div>
              <div className="home-dish__body">
                <h4>{dish.nombre}</h4>
                <span className="home-dish__price">{dish.precio || ' '}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-manifesto">
        <p className="home-manifesto__statement">
          La previa y el after son <em>siempre con rabas</em>
        </p>
      </section>

      <section className="home-location" id="ubicacion">
        <div className="home-location__map">
          <iframe
            title="Ubicación de La Rabería"
            src={MAPS_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="home-location__info">
          <h2 className="home-sticker">¿Dónde estamos?</h2>
          <div className="home-loc-row">
            <span className="home-loc-label">Dirección</span>
            <span>Dorrego 783</span>
          </div>
          <div className="home-loc-row">
            <span className="home-loc-label">Horarios</span>
            <span>{HORARIOS}</span>
          </div>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="home-btn-solid">
            Cómo llegar
          </a>
        </div>
      </section>

      <section className="home-insta">
        <div className="home-insta__head">
          <h2 className="home-sticker">@la.raberia</h2>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            Seguinos →
          </a>
        </div>
        <div className="home-insta__grid">
          {[1, 2, 3].map((n) => (
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="home-insta__post"
              key={n}
            >
              <img src={`/instagram/post-${n}.jpg`} alt={`Post ${n} de @la.raberia`} />
            </a>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <div className="home-footer__top">
          <div className="home-logo">
            <span className="home-dot" /> LA RABERÍA
          </div>
          <div className="home-footer__links">
            <Link to="/menu">Menú</Link>
            <Link to="/enlaces">Enlaces</Link>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <InstagramIcon /> Instagram
            </a>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer">
              <TikTokIcon /> TikTok
            </a>
          </div>
        </div>
        <div className="home-footer__bottom">
          <span>© La Rabería</span>
          <span>
            Dorrego 783 · {HORARIOS}
          </span>
        </div>
      </footer>
    </main>
  )
}

export default Home
