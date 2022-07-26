import { ExclamationIcon, ClockIcon, BookmarkIcon, LocationMarkerIcon, CurrencyDollarIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useDashContext } from '../contexts/dashboard'
import { useGallContext } from '../contexts/gallery'



export default function GalleryListItems({item}) {
// being imported into the Gallery page
// User will add gallery list item via the dropdown component
   return (
      <div className='rounded bg-slate-100 flex flex-row items-center justify-around p-2 mb-2 cursor-pointer'>
      <div className='mr-8 text-xl font-semibold w-1/4 text-purple-800'>
          {item?.name}
      </div>
      <div className='flex flex-col w-1/2'>
          <div className='flex flex-row'>
              <div className='flex flex-row w-1/2'>
                  <BookmarkIcon className='text-gray-500 h-6 w-6 mr-2'/>
                  {item?.category}
              </div>
          </div>
          <div className='flex flex-row'>
              <div className='flex flex-row w-1/2'>
                  <LocationMarkerIcon className='text-gray-500 h-6 w-6 mr-2'/>
                  {item?.location}
              </div>
          </div>
      </div>
      <Dropdown item={item}></Dropdown>
      
  </div>
   )
}



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

//dropdown component that is rendered dynamically for a user's list
function Dropdown({item}) {
    const {lists} = useDashContext();
    const {gallModal, setGallModal} = useGallContext();

    function onClickDropdown(list_id, name) {
        console.log('clicked:', list_id, item);
        setGallModal({open: true, list_id: list_id, item: item, name: name});
    }

    //conditionally render menu items by lists. When an item is clicked, it will pull up the
    //new item modal with the infomation and the list name
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-orange-500 z-10">
          Add to
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40">
          <div className="py-1">
            
            {lists?.map((list) => <div key={list.id}>
                <Menu.Item>
              {({ active }) => (
                <a
                list_id={list.id}
                  onClick={() => onClickDropdown(list.id, list.name)}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900 flex flex-row' : 'text-gray-700',
                    'block px-4 py-2 text-sm flex flex-row'
                  )}
                >
                    <p className='mr-4' dangerouslySetInnerHTML={{__html : `&#x${list.emoji_unicode};`}}></p>
                    {list.name}
                </a>
              )}
            </Menu.Item>
            </div>)}
            {/* <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full text-left px-4 py-2 text-sm'
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form> */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}