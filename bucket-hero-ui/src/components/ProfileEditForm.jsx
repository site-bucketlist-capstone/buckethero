import { useAuthContext } from "../contexts/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserCircleIcon } from '@heroicons/react/solid'


//this component is used to edit a user's profile information and save any changes
export default function ProfileEditForm({info, success, setSuccess, profileChangeOpen, setProfileChangeOpen, passwordOpen, setPasswordOpen}) {
    const navigate = useNavigate();
    const [form, setForm] = useState({'first_name': "", 'last_name': "", 'email': "", 'password': ""})
    const [error, setError] = useState({});

    const {updateProfile, updatePassword} = useAuthContext();

    useEffect(() => {
      const setUpForm = async () => {
         if (info?.first_name) {
            await setForm({'first_name': info?.first_name, 'last_name': info?.last_name, 'email': info?.email, 'password': ""})
          }
      }
      setUpForm();
   }, [info]);

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

    const handleOnSubmit = async (event) => {
      event.preventDefault();
      
      const nav = await updateProfile(form);
      setSuccess({message: "Successfully updated profile!"});
      //if nav show modal
      
      if (nav) {
        setProfileChangeOpen(true);
      }
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
            <form className=" flex flex-col items-center w-full sm:w-1/2" onSubmit={handleOnSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md w-full">
                
                <div className="px-4 py-5 bg-white sm:p-6 ">
                  <p className="text-sm mb-2 text-green-500">{success?.message}</p>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        placeholder={form.first_name}
                        value={form?.first_name}
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
                        value={form?.last_name}
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
                    <div className="col-span-6 sm:col-span-4">
                      <p onClick={() => {setPasswordOpen(true);}} className="block text-sm font-medium text-purple-500 underline hover:text-purple-400 cursor-pointer">
                        Update password
                      </p>
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