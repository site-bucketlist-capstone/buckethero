import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon, ClockIcon, BookmarkIcon, LocationMarkerIcon, CurrencyDollarIcon } from '@heroicons/react/outline'
import { useDashContext } from '../contexts/dashboard'


export default function EditItem({item}) {
  //const [open, setOpen] = useState(true)

    const {editItemModal, setEditItemModal, blTitle, newItem, selected, editItem} = useDashContext();
    const itemDate = item?.due_date ? item?.due_date.substr(0,10) : ""
    const [form, setForm] = useState({'name': item?.name, 'location': item?.location, 'due_date': itemDate, 'category': item?.category, 'price_point': item?.price_point, "list_id": selected, 'item_id': item?.id});

    const cancelButtonRef = useRef(null);

    const handleOnInputChange = (event) => {
    
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }
    
    const handleOnSubmit = async (e) => {
        console.log("in submit");
        e.preventDefault();
        if (form.due_date === "") {
            let copy = form;
            delete copy["due_date"];
            setForm(copy);
        }
        const res = await editItem(form);
        console.log("submitted");
        if (res) setEditItemModal((e) => ({...e, open: false}));
        
    }
    
  return (
    <Transition.Root show={editItemModal.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => setEditItemModal((e) => ({...e, open: false}))}>
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
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Edit List Item for {blTitle}
                      </Dialog.Title>
                      <form className="mt-8 space-y-6" onSubmit={(e) => handleOnSubmit(e)}>
                        <div className="shadow-sm -space-y-px w-3/4">
                            <div>
                                <input
                                id="name"
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={handleOnInputChange}
                                required
                                className="appearance-none relative block w-full px-3 py-2 border-x-0 border-t-0 bg-gray-100 border-b-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Item Name"
                                />
                            </div>
                        </div>
                        <div className='sm:flex sm:flex-row'>
                            <div className=" -space-y-px sm:w-3/4 sm:mr-4 flex flex-row items-center">
                                <ClockIcon className='text-gray-500 h-6 w-6 mr-2'/>
                                <div>
                                    <input
                                    id="due_date"
                                    name="due_date"
                                    type="date"
                                    value={form.due_date}
                                    onChange={handleOnInputChange}
                                    className="appearance-none pr-14 sm:pr-11 relative block w-full px-3 py-2 border-x-0 border-t-0 bg-gray-100 border-b-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                    placeholder="Due Date"
                                    />
                                </div>
                            </div>
                            <div className="-space-y-px sm:w-3/4 flex flex-row items-center">
                                <BookmarkIcon className='text-gray-500 h-6 w-6 mr-2'/>
                                <div>
                                        <input
                                        id="category"
                                        name="category"
                                        type="text"
                                        value={form.category}
                                        onChange={handleOnInputChange}
                                        className="appearance-none relative block w-full px-3 py-2 border-x-0 border-t-0 bg-gray-100 border-b-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                        placeholder="Category"
                                        />
                                </div>
                            </div>
                        </div>
                        <div className='sm:flex sm:flex row'>
                            <div className="-space-y-px sm:w-3/4 mr-4 flex flex-row items-center">
                                <LocationMarkerIcon className='text-gray-500 h-6 w-6 mr-2'/>
                                <div>
                                    <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    value={form.location}
                                    onChange={handleOnInputChange}
                                    className="appearance-none relative block w-full px-3 py-2 border-x-0 border-t-0 bg-gray-100 border-b-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                    placeholder="Location"
                                    />
                                </div>
                            </div>
                            <div className="-space-y-px sm:w-3/4 flex flex-row items-center">
                                <CurrencyDollarIcon className='text-gray-500 h-6 w-6 mr-2'/>
                                <div>
                                        <input
                                        id="price_point"
                                        name="price_point"
                                        type="number"
                                        min="0"
                                        value={form.price_point}
                                        onChange={handleOnInputChange}
                                        className="appearance-none relative block w-full px-3 py-2 border-x-0 border-t-0 bg-gray-100 border-b-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                        placeholder="Price Point"
                                        />
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-500 text-base font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setEditItemModal((e) => ({...e, open: false}))}
                            ref={cancelButtonRef}
                        >
                            Cancel
                        </button>
                        </div>
                    </form>
                    </div>
                  </div>
                </div>
                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}