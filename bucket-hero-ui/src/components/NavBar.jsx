/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Logo from "../assets/BH.png";
import { useAuthContext } from "../contexts/auth";


export default function NavBar({setLogoutOpen}) {
    const {user, logoutUser} = useAuthContext();
    const navigation = user?.email ? [
        { name: 'Dashboard', href: '/'},
        { name: 'Inspo', href: '/inspo' },
        { name: 'New List', href: '/newlist' },
        { name: 'Profile', href: '/profile' },
        
        
      ] : [];

   
      
    
  return (
    <div className="fixed z-50 top-0 left-0 right-0 bg-white ">
        <Popover>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav className="relative flex items-center justify-between sm:h-10 lg:justify-between" aria-label="Global">
                <div className="flex items-center justify-between h-20 w-full md:w-auto">
                  <div className="flex items-center justify-between h-20 w-full md:w-auto">
                    <a href="/" className='w-auto md:w-full h-full'>
                      <span className="sr-only">Workflow</span>
                      <img
                        alt="Workflow"
                        className="w-full h-full"
                        src={Logo}
                      />
                    </a>
                    <div className="-mr-2 flex items-center md:hidden">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 hover:outline-none hover:ring-1 hover:ring-orange-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500">
                        <span className="sr-only">Open main menu</span>
                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                  {navigation.map((item) => (
                    <a key={item.name} href={item.href} className="font-medium text-gray-500 hover:text-gray-900">
                      {item.name}
                    </a>
                  ))}
                  {user?.email ? 
                  <a onClick={(e) => {setLogoutOpen(true)}} className="cursor-pointer font-medium text-orange-600 hover:text-orange-500">
                    Logout
                  </a> : <><a href="/register" className="font-medium hover:text-orange-100 hover:bg-orange-700 text-white bg-orange-600 p-3 px-4 rounded">
                    Register
                  </a>
                  <a href="/signin" className="font-medium text-orange-700 bg-orange-100 hover:bg-orange-200 rounded p-3 px-4 hover:text-orange-500">
                    Sign in
                  </a></>
                  }
                </div>
              </nav>
            </div>

            <Transition
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute z-50 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="z-50 rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="px-5 pt-4 flex items-center justify-between">
                    <div>
                      <img
                        className="h-20 w-auto"
                        src={Logo}
                        alt=""
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:ring-orange-500 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500">
                        <span className="sr-only">Close main menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="z-50 px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  
                  {user?.email ? 
                  <a href="/" onClick={logoutUser} className="block w-full px-5 py-3 text-center font-medium text-orange-600 bg-gray-50 hover:bg-gray-100">
                    Logout
                  </a> : <><a href="/register" className="block w-full px-5 py-3 text-center font-medium text-orange-600 bg-gray-50 hover:bg-gray-100">
                    Register
                  </a>
                  <a href="/signin" className="block w-full px-5 py-3 text-center font-medium text-orange-600 bg-gray-50 hover:bg-gray-100">
                    Log in
                  </a></>
                  }
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
    </div>
  )
}