/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import heroExtra from '../assets/heroextra.png'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Hero() {
  return (
    <div className="relative bg-white overflow-hidden ">
      <div className="max-w-7xl mx-auto flex flex-row items-center">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">

          <main className=" mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 ">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Prioritize your college experience with a </span>{' '}
                <span className="block text-orange-600 xl:inline">bucket list</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Bucket Hero will help you organize all of the events, locations, clubs, experiences, and more that you may want to explore and try in your time at school. Go outside of your bubble, get social, and get started now!
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="/register"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 hover:text-orange-100 md:py-4 md:text-lg md:px-10"
                  >
                    Register
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="/signin"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 hover:text-orange-500 md:py-4 md:text-lg md:px-10"
                  >
                    Sign In
                  </a>
                </div>
              </div>
            </div>
            
          </main>
        </div>
        <img src={heroExtra} alt="" className='h-auto w-1/2 md:w-1/3 md:h-full hidden sm:hidden md:block lg:block'/>
      </div>
      
    </div>
  )
}