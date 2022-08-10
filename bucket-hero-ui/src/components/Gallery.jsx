import GalleryListItems from "./GalleryListItems";
import GalleryNewItem from "./GalleryNewItem";
import { useGallContext } from "../contexts/gallery";
import { useAuthContext } from "../contexts/auth";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, XIcon } from '@heroicons/react/solid'
import { useState, useEffect } from 'react'

export default function Gallery({}) {
    const {gallery, gallModal, setGallModal, success, searchValue, setSearchValue, searchCategory, setSearchCategory} = useGallContext();
    const {user} = useAuthContext();
    const [itemInfo, setItemInfo] = useState({
        "name" : "",
        "location" : "",
        "category" : "", 
        "price" : 0 
    }) 
    

    useEffect(() => {
        setItemInfo((f) => ({ ...f, [searchCategory.toLowerCase()]: searchValue }))
    }, [searchValue]);

    const handleOnTextChange = (event) => {
        setSearchValue(event.target.value)
      }

    const currentItems = gallery.filter((item) => {
        try {
          if (item.name.toLowerCase().match(itemInfo.name) !== null && item.category.toLowerCase().match(itemInfo.category) !== null && item.location.toLowerCase().match(itemInfo.location) !== null) {
            return true
          } else {
            return false
          }
        } catch {
          return false 
        }
      })

    const handleOnSubmit = (event) => {
        event.preventDefault()      
    }

    //gallery page renders items for user to add to their bucket lists
    return (
        <div className='flex flex-col items-center mt-16 sm:mt-6 p-4 sm:p-0'>
            <div className="w-full px-20 sm:flex sm:flex-row items-end justify-between sm:mt-4">
                <div className="text-center sm:text-left sm:ml-20">
                    <h3 className="text-2xl font-semibold">Inspo Board</h3>
                    <p>Gain items to put on your own list and gain inspiration!</p>
                </div>
                <p className="text-lime-500 font-semibold text-center sm:text-left">{success}</p>
                {/* search bar */}
                <div className="flex flex-col items-center">
                    <form onSubmit={handleOnSubmit} className="flex flex-row sm:mr-20">   
                        <SearchDropdown setSearchValue={setSearchValue}/>
                        <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
                        <div className="relative w-full">
                            <input onChange={handleOnTextChange} value={searchValue} type="search" id="search-dropdown" className="block p-2.5 pb-2 sm:w-64 z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-purple-500 focus:border-purple-500" placeholder={"Search by " + searchCategory.toLowerCase()} required/>
                            <button type="submit" className="absolute top-0 right-0 p-2.5 pb-2 text-sm font-medium text-white bg-purple-700 rounded-r-lg border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                                <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                    </form>
                    {/* loops through itemInfo object to display all filters*/}
                    <div className="flex flex-row flex-wrap mt-2">
                        {Object.keys(itemInfo).map(key => {
                           //makes the filter keywork capital
                            const filter = key.charAt(0).toUpperCase() + key.slice(1);
                            if (itemInfo[key] != "")
                                return (
                                    <div className="flex flex-row items-center mr-2">
                                        {/* onClick updates form and deletes filter */}
                                        <XIcon className="h-4 w-4 pr-1 text-slate-400 cursor-pointer" onClick={() => setItemInfo((f) => ({ ...f, [key]: ""}))}/>
                                        <p>{`${filter}: ${itemInfo[key]}`}</p>
                                    </div>
                                )
                        })}
                     </div>
                </div>
            </div>
            <div className="sm:w-3/4 mt-4 flex flex-col">
                {
                    currentItems.map((item) => {
                      if (item.first_name != user.first_name) {
                        return <GalleryListItems key={item.id} item={item} />
                      }
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

function SearchDropdown({setSearchValue}) {
    const {searchCategory, setSearchCategory} = useGallContext();

    function handleOnClickSearchDropdown(event) {
        setSearchCategory(event.target.text)
        setSearchValue("")
    }


    return (
        <Menu as="div" className="sm:relative sm:inline-block text-left ">
      <div>
        <Menu.Button className="inline-flex justify-center w-full h-10 rounded-md rounded-r-none border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
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