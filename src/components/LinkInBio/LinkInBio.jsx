import { Link } from 'react-router-dom'
import { MenuIcon, PinIcon, DeliveryIcon, InstagramIcon } from './icons'
import './LinkInBio.css'

const LinkInBio = () => {
  return (
    <main className="link-in-bio">
      <div className="link-in-bio__content">
        <div className="link-in-bio__header">
          <img src="/logo.png" alt="La Ráberia" className="link-in-bio__logo" />
        </div>
        <nav className="link-in-bio__buttons" aria-label="Enlaces principales">
          <Link to="/menu" className="link-in-bio__button">
            <MenuIcon />
            <span>Menú</span>
          </Link>
          <a
            href="https://maps.app.goo.gl/CGq7nfEZZNTpxFcJ9"
            target="_blank"
            rel="noopener noreferrer"
            className="link-in-bio__button"
          >
            <PinIcon />
            <span>¿Dónde estamos?</span>
          </a>
          <a
            href="https://www.pedidosya.com.ar/restaurantes/buenos-aires/la-raberia-bar-fa2e5ed9-9fd1-4f7e-a6a1-ff9e9067476e-menu"
            target="_blank"
            rel="noopener noreferrer"
            className="link-in-bio__button"
          >
            <DeliveryIcon />
            <span>Delivery</span>
          </a>
          <a
            href="https://www.instagram.com/la.raberia/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-in-bio__button"
          >
            <InstagramIcon />
            <span>Instagram</span>
          </a>
        </nav>
      </div>
      <div className="link-in-bio__strip" role="presentation" />
    </main>
  )
}

export default LinkInBio
