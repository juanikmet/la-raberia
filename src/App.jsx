import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LogoCover from './components/LogoCover/LogoCover'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LogoCover greeting={'Muy pronto'}/>
    </>
  )
}

export default App
