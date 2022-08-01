import { useAuthContext } from "../contexts/auth";
import { useState } from "react";
import { UserCircleIcon } from '@heroicons/react/solid'

export default function ProfileEditForm({info}) {
    const [form, setForm] = useState({first_name: info.first_name, last_name: info.last_name, email: info.email, password: ""})
    
    const handleOnInputChange = (event) => {
        if (event.target.name === "email") {
          if (event.target.value.indexOf("@") === -1) {
            setError((e) => ({ ...e, email: "Please enter a valid email." }))
          } else {
            setError((e) => ({ ...e, email: null }))
          }
        }
    
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
      }
    
    return (
        <>
      {/* <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div> */}

      <div className="mt-10 sm:mt-0 ">
        
          <div className="mt-5 md:mt-0 flex flex-col items-center">
            <form className=" flex flex-col items-center w-1/2">
              <div className="shadow overflow-hidden sm:rounded-md  w-full">
                <div className="px-4 py-5 bg-white sm:p-6 ">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        value={form.first_name}
                        onChange={handleOnInputChange}
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={form.last_name}
                        onChange={handleOnInputChange}
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={handleOnInputChange}
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-400 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        
      </div>
    </>
    )
}