import { Routes, Route } from 'react-router-dom'
import './App.css'
import LinkInBio from './components/LinkInBio/LinkInBio'
import MenuPage from './components/MenuPage/MenuPage'
import TvDisplay from './components/TvDisplay/TvDisplay'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LinkInBio />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route
        path="/tv/izquierda"
        element={<TvDisplay image="/menu/tv-izquierda.jpg" alt="Menú TV izquierda" />}
      />
      <Route
        path="/tv/derecha"
        element={<TvDisplay image="/menu/tv-derecha.jpg" alt="Menú TV derecha" />}
      />
    </Routes>
  )
}

export default App
