import { useState, useEffect, useRef, Fragment } from 'react'
import {
  BrowserRouter,
  Route,
  Link,
  Routes,
  useResolvedPath
} from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline'
import {useNavigate} from 'react-router-dom';




import Hero from './components/Hero';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Gallery from './components/Gallery';
import NewList from './components/NewList';
import Profile from './components/Profile';
import EditList from './components/EditList';
import PublicProfile from './components/PublicProfile';



import { AuthContextProvider, useAuthContext } from "./contexts/auth";
import { DashContextProvider, useDashContext } from "./contexts/dashboard";
import { GallContextProvider, useGallContext } from './contexts/gallery';

import apiClient from './services/apiClient';



export default function AppContainer() {
  return (
    <AuthContextProvider>
      <DashContextProvider>
      <GallContextProvider>
        <App/>
      </GallContextProvider>
      </DashContextProvider>
    </AuthContextProvider>
  )
}

function App() {
  const {user, setUser, fetchUserFromToken, logoutUser} = useAuthContext();
  const [logoutOpen, setLogoutOpen] = useState(false);
  

  useEffect(() => {
    const fetchUser = async () => {
      console.log("in app fetch user")
      const {data, err} = await fetchUserFromToken()
      if (data) setUser(data.user)
      if (err) setError(err)
    }

    const token = localStorage.getItem("buckethero-token");
    if(token) {
      apiClient.setToken(token)
      fetchUser();
    }
  }, [])
  
  
  return (
    <div className='w-full mt-8 h-full'>
      <BrowserRouter>
        <NavBar user={user} setLogoutOpen={setLogoutOpen}/>
        {logoutOpen ? <LogoutConfirm logoutOpen={logoutOpen} setLogoutOpen={setLogoutOpen}></LogoutConfirm>: null}
        
        <Routes>
          <Route path='/' element={user?.email ? <Dashboard/>: <Hero/>}/>
          <Route path='/signin' element={<SignIn setUser={setUser}/>}/>
          <Route path='/register' element={<Register setUser={setUser}/>}/>
          <Route path='/inspo' element={<Gallery/>}/>
          <Route path='/newlist' element={<NewList/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/list/:list_id/edit' element={<EditList />}/>
          <Route path='*' element={<div>Not Found: Page doesnt exist</div>}/>
          <Route path='/inspo/user/:userId' element={<PublicProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
      
      
    
  )
}

function LogoutConfirm({setLogoutOpen, logoutOpen}) {

  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();

  //logout handler
  const {user, setUser, fetchUserFromToken, logoutUser} = useAuthContext();
  console.log("logout modal")
  return (
    <Transition.Root show={logoutOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setLogoutOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Logout
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to logout?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={(e) => {logoutUser(); setLogoutOpen(!logoutOpen); navigate('/')}}
                  >
                    Logout
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setLogoutOpen(!logoutOpen)}
                    // onClick={() =>  handleOnDelete()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}




