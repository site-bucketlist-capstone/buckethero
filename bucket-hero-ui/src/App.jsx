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

import { AuthContextProvider, useAuthContext } from "./contexts/auth";


import './App.css'

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <App/>
    </AuthContextProvider>
  )
}

function App() {
  const [user, setUser] = useState({email: ""})
  

  return (
    <div className='app'>
      <BrowserRouter>
        <NavBar user={user}/>
        <Routes>
          <Route path='/' element={<Hero/>}/>
          <Route path='/signin' element={<SignIn setUser={setUser}/>}/>
          <Route path='/register' element={<Register setUser={setUser}/>}/>
          <Route path='/dashboard' element={<div>dashboard</div>}/>
        </Routes>
      </BrowserRouter>
    </div>
      
      
    
  )
}


