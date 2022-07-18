import { useState } from 'react'
import {
  BrowserRouter,
  Route,
  Link,
  Routes,
  useResolvedPath
} from "react-router-dom";

import Hero from './components/Hero';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import Register from './components/Register';


import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Hero/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
      
      
    
  )
}

export default App
