import { Routes, Route } from 'react-router-dom'
import './App.css'
import LogoCover from './components/LogoCover/LogoCover'
import TvDisplay from './components/TvDisplay/TvDisplay'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LogoCover greeting={'Muy pronto'} />} />
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
