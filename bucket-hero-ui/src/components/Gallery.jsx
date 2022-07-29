import GalleryListItems from "./GalleryListItems";
import GalleryNewItem from "./GalleryNewItem";
import { useGallContext } from "../contexts/gallery";

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useState } from 'react'

export default function Gallery({}) {
    const {gallery, gallModal, setGallModal, success, searchValue, setSearchValue, searchCategory, setSearchCategory} = useGallContext();

    const handleOnTextChange = (event) => {
        setSearchValue(event.target.value)
      }

    const currentItems = gallery.filter((item) => {
        try {
          let itemCategory = searchCategory.toLowerCase()
          let itemFilter = ""
          if (itemCategory == "name") {
            itemFilter = item.name
          } else if (itemCategory == "category"){
            itemFilter = item.category
          } else if (itemCategory == "location"){
            itemFilter = item.location
          } 
            
          if (itemFilter.toLowerCase().match(searchValue) !== null) {
            return true
          } else {
            return false
          }
        } catch {
          return false 
        }
      })

    //gallery page renders items for user to add to their bucket lists
    return (
        <div className='flex flex-col items-center mt-16 sm:mt-6 p-4 sm:p-0'>
            <div className="w-full px-12 sm:flex sm:flex-row items-end justify-between">
                <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-semibold">Gallery</h3>
                    <p>Gain items to put on your own list and gain inspiration!</p>
                </div>
                <p className="text-lime-500 font-semibold text-center sm:text-left">{success}</p>
                {/* search bar */}
                <form className="flex flex-row">   
                    <SearchDropdown/>
                    <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
                    <div class="relative w-full">
                        <input onChange={handleOnTextChange} type="search" id="search-dropdown" class="block p-2.5 w-64 z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-purple-500" placeholder={"Search by " + searchCategory.toLowerCase()} required/>
                        <button type="submit" class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-purple-700 rounded-r-lg border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                            <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </div>
                    {/* <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input onChange={handleOnTextChange} type="search" id="default-search" className="block p-4 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" placeholder="Search for an item" />
                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-purple-800 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Search</button>
                    </div> */}
                </form>
            </div>
            <div className="sm:w-3/4 mt-4">
                {
                    currentItems.map((item) => {
                    return <GalleryListItems key={item.id} item={item} />
                    })
                }
            </div>
            {gallModal.open ? <GalleryNewItem/> : null}
            
        </div>
    );
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

function SearchDropdown() {
    const {searchCategory, setSearchCategory} = useGallContext();

    function handleOnClickSearchDropdown(event) {
        setSearchCategory(event.target.text)
    }


    return (
        <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full h-10 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          {searchCategory == 'name' ? 'Options' : searchCategory }
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                    onClick={handleOnClickSearchDropdown}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Name
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                    onClick={handleOnClickSearchDropdown}
                    className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Category
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                    onClick={handleOnClickSearchDropdown}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Location
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                    onClick={handleOnClickSearchDropdown}
                    className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Price
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    )
}