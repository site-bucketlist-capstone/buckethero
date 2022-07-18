import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <Hero/>
      
    </>
    
  )
}

export default App
