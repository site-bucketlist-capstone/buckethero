import { useState, useEffect } from 'react'
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
import Dashboard from './components/Dashboard';
import Gallery from './components/Gallery';
import NewList from './components/NewList';

import { AuthContextProvider, useAuthContext } from "./contexts/auth";
import { DashContextProvider, useDashContext } from "./contexts/dashboard";

import apiClient from './services/apiClient';



export default function AppContainer() {
  return (
    <AuthContextProvider>
      <DashContextProvider>
        <App/>
      </DashContextProvider>
    </AuthContextProvider>
  )
}

function App() {
  const {user, setUser, fetchUserFromToken} = useAuthContext();

  useEffect(() => {
    const fetchUser = async () => {
      const {data, err} = await fetchUserFromToken()
      if (data) setUser(data.user)
      if (err) setError(err)
    }

    const token = localStorage.getItem("buckethero-token");
    if(token) {
      apiClient.setToken(token)
      fetchUser()
    }
  }, [])
  

  return (
    <div className='container mx-auto mt-8 p-4 h-full'>
      <BrowserRouter>
        <NavBar user={user}/>
        <Routes>
          <Route path='/' element={user?.email ? <Dashboard/>: <Hero/>}/>
          <Route path='/signin' element={<SignIn setUser={setUser}/>}/>
          <Route path='/register' element={<Register setUser={setUser}/>}/>
          <Route path='/gallery' element={<Gallery/>}/>
          <Route path='/newlist' element={<NewList/>}/>
          <Route path='/profile' element={<div>profile</div>}/>
        </Routes>
      </BrowserRouter>
    </div>
      
      
    
  )
}


