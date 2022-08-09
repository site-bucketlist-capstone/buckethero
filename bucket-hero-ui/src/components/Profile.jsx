import { useAuthContext } from "../contexts/auth";
import { useState, useRef, Fragment, useEffect } from "react";
import { UserCircleIcon } from '@heroicons/react/solid'
import { useNavigate } from "react-router-dom";

import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline'

import Banner from '../assets/profile-banner.png';
import Completed from "./Completed";
import ProfileEditForm from "./ProfileEditForm";
import NewcomerBadge from '../assets/1.png';
import ThirdTimesACharmBadge from '../assets/2.png';
import GoGetterBadge from '../assets/3.png';

import apiClient from '../services/apiClient';
import * as axios from 'axios';
import { useDashContext } from "../contexts/dashboard";
import { useGallContext } from "../contexts/gallery";

export default function Profile( ) {
   const {lists, fetchListItems} = useDashContext();
   const {inspired} = useGallContext();
   const {user, setUser, fetchUserFromToken} = useAuthContext();
   const [isShowing, setIsShowing] = useState(true);
   const [success, setSuccess] = useState({message: ""})
   const [complete, setComplete] = useState([]);
   const [isProcessing, setIsProcessing] = useState(false);
   const [error, setError] = useState();
   const [profileChangeOpen, setProfileChangeOpen] = useState(false);
   const [passwordOpen, setPasswordOpen] = useState(false);
   const imgUrl = user?.pfp ? user.pfp : "https://c8.alamy.com/zooms/9/52c3ea49892f4e5789b31cadac8aa969/2gefnr1.jpg";
   const navigate = useNavigate();

   async function showCompleted() {
      setIsProcessing(true)
      setError(null)
      const {data, error} = await apiClient.fetchCompletedItems();
      if (error) {
        const message = error?.response?.data?.error?.message
        setError(error)
        setIsProcessing(false);
      }
      if (data) {
        setComplete(data.result);
        setIsProcessing(false);
      }
   }

   useEffect(() => {
      fetchUserFromToken();
      handleComplete();
   }, []);

   function handleComplete() {
      setIsShowing(true);
      showCompleted();
   }

   const [file, setFile] = useState()

   const handleOnSubmitImage = async (event) => {
    //event.preventDefault();
      const file = event.target.files[0]
      setFile(file)
      let imageString = ""
      const data = new FormData()
      data.append("name", user.first_name)
      data.append("file", file)

      //post request to httpbin.org returns the base64 encoded string for the image 
      axios.post("https://httpbin.org/anything", data)
         .then(res => 
            {
               imageString = res.data.files.file
               let response = apiClient.addProfilePicture({"imageString" : imageString})
               //need to properly fetch user 
               // setUser(apiClient.fetchUserFromToken())
            })
         .catch(err => console.error(err));
        return data;
   }

   const [thirdTimesACharm, setThirdTimesACharm] = useState(false)
   const [goGetter, setGoGetter] = useState(false)
   const [newcomer, setNewcomer] = useState(false)

   //checks if user has at least one item in their list
   const checkItems = async (listId) => {
    const result = await fetchListItems(listId);
    let numItems = 0 
    result.result.map((item) => {
      if (item.is_completed == true) {
        setNewcomer(true)
      }
      numItems += 1
    })
    if (numItems >= 5) 
    {
      setGoGetter(true)
    }
   }

   useEffect(() => {
    let numLists = 0 
    lists.map((list) => {
      numLists +=  1 
      checkItems(list.id)
    })
    if (numLists >= 3) {
      setThirdTimesACharm(true)
    }
    
   })
 




   return (
       <div>
          {profileChangeOpen ? <ProfileChange setSuccess={setSuccess} profileChangeOpen={profileChangeOpen} setProfileChangeOpen={setProfileChangeOpen}></ProfileChange>: null}
          {passwordOpen ? <PasswordChange setSuccess={setSuccess} passwordOpen={passwordOpen} setPasswordOpen={setPasswordOpen}></PasswordChange>: null}
         <div className="flex flex-col p-4">
            <img src={Banner} alt="" className="-z-20 h-60 w-full rounded"/>
            <div className="-mt-14 sm:-mt-20 pl-2 sm:pl-0 sm:ml-12 pr-6 flex flex-col items-center sm:flex-row sm:items-end sm:justify-between">
               <div className="sm:flex sm:flex-row sm:items-center">
                  <div className="flex flex-row items-center">
                     <div>
                        <div className="h-24 w-24 sm:h-40 sm:w-40 rounded-full overflow-hidden hover:drop-shadow-xl">
                           <label htmlFor="file">
                              <img src={user.profile_image ? user.profile_image : imgUrl} alt="profile picture" className="scale-150 cursor-pointer"/>
                           </label>
                           <input type="file" id="file" accept="image/png, image/jpeg" onChange={handleOnSubmitImage}/>
                        </div>
                        <p className="text-gray-400 text-xs sm:text-sm text-center">Click profile pic to edit</p>
                     </div>
                     
                     <div className="ml-4 flex flex-col justify-end mt-4">
                        <span className="mb-6 ">   </span>
                        <div className="mt-4">
                           <span className="font-semibold text-lg">{user.first_name}   {user.last_name}</span>
                        </div>  
                        <div className="font-light text-slate-500">
                           <span>Email: </span>
                           <span>   {user.email}</span>
                        </div>
                     </div>

                     
                  </div>
                  
                  <div className="mt-12 ml-8 text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
                     {isShowing ? <><ul className="flex flex-wrap -mb-px">
                        <li className="mr-2">
                              <a className="inline-block p-4 text-purple-600 rounded-t-lg border-b-2 border-purple-600 active " aria-current="page">Completed Items</a>
                        </li>
                        <li className="mr-2" onClick={() => setIsShowing(false)}>
                              <a className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 cursor-pointer">Edit Profile</a>
                        </li>
                     </ul></> : <><ul className="flex flex-wrap -mb-px">
                        <li className="mr-2">
                              <a onClick={handleComplete} className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 cursor-pointer">Completed Items</a>
                        </li>
                        <li className="mr-2">
                              <a className="inline-block p-4 text-purple-600 rounded-t-lg border-b-2 border-purple-600 active " aria-current="page">Edit Profile</a>
                        </li>
                     </ul></>}
                  </div>
               </div>
            
            </div>
            <div className="sm:flex sm:flex-row sm:px-16 sm:mt-4">
               <div className="w-2/12 flex flex-col items-center pt-8 bg-slate-100 h-fit pb-4 rounded">
                  <p className="font-semibold">Achievements</p>
                  <div className="flex flex-col w-full justify-around mt-2">
                     { newcomer ?
                     <div className="flex flex-row items-center p-2 justify-around">
                        <img src={NewcomerBadge} className="w-16 h-16" alt="orange gradient circle with white 1"/>
                        <div className="w-3/4">
                           <p>Newcomer:</p>
                           <p>Completed 1 list item</p>
                        </div>
                     </div>
                     : null} 
                     { thirdTimesACharm ? 
                     <div className="flex flex-row items-center p-2 justify-around">
                        <img src={ThirdTimesACharmBadge} className="w-14 h-14" alt="orange gradient circle with white 1"/>
                        <div className="w-3/4">
                           <p>Third Times a Charm:</p>
                           <p>Created 3 lists</p>
                        </div> 
                     </div>
                     : null}
                     { goGetter ? 
                     <div className="flex flex-row items-center p-2 justify-around">
                        <img src={GoGetterBadge} className="w-14 h-14" alt="orange and pink gradient diamond with star in middle"/>
                        <div className="w-3/4">
                           <p>Go Getter:</p>
                           <p>Created 5 list items</p>
                        </div>
                     </div>
                      : null} 
                  </div>
               </div>
               <div className="w-10/12">
                  {!isShowing ? <ProfileEditForm setSuccess={setSuccess} success={success} passwordOpen={passwordOpen} setPasswordOpen={setPasswordOpen} profileChangeOpen={profileChangeOpen} setProfileChangeOpen={setProfileChangeOpen} info={user}/> : <Completed completed={complete} isPublic={false}/>}
               </div>
               
            </div>
            
            
         </div>            
      </div>
   );
}

function ProfileChange({profileChangeOpen, setProfileChangeOpen}) {

   const cancelButtonRef = useRef(null);
   const navigate = useNavigate();
 
   //logout handler
   const {user, setUser, fetchUserFromToken, logoutUser} = useAuthContext();
   
   return (
     <Transition.Root show={profileChangeOpen} as={Fragment}>
       <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={(e) => {logoutUser(); setProfileChangeOpen(!profileChangeOpen); navigate('/')}}>
         <Transition.Child
           as={Fragment}
           enter="ease-out duration-300"
           enterFrom="opacity-0"
           enterTo="opacity-100"
           leave="ease-in duration-200"
           leaveFrom="opacity-100"
           leaveTo="opacity-0"
         >
           <div className="fixed inset-x-0 bottom-0 h-full bg-gray-500 bg-opacity-75 transition-opacity" />
         </Transition.Child>
 
         <div className="fixed z-10 inset-0 overflow-y-auto ">
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
                           Because you changed your email, you must log out and log back in for your profile to update.
                         </p>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                   <button
                     type="button"
                     className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                     onClick={(e) => {logoutUser(); setProfileChangeOpen(!profileChangeOpen); navigate('/')}}
                   >
                     Logout
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

 function PasswordChange({passwordOpen, setPasswordOpen, setSuccess}) {

   const cancelButtonRef = useRef(null);
   const navigate = useNavigate();
 
   //logout handler
   const {user, setUser, fetchUserFromToken, logoutUser, updatePassword, error} = useAuthContext();
   const [form, setForm] = useState({oldPassword: "", newPassword: "", confirmNewPassword: ""});
   const [errors, setErrors] = useState({});

   const handleOnInputChange = (event) => {
      if (event.target.name === "newPassword") {
        if (form.confirmNewPassword && form.confirmNewPassword !== event.target.value) {
          setErrors((e) => ({ ...e, confirmpassword: "Password's do not match" }))
        } else {
          setErrors((e) => ({ ...e, confirmpassword: null }))
        }
      }
      if (event.target.name === "confirmNewPassword") {
        if (form.newPassword && form.newPassword !== event.target.value) {
          setErrors((e) => ({ ...e, confirmpassword: "Password's do not match" }))
        } else {
          setErrors((e) => ({ ...e, confirmpassword: null }))
        }
      }
  
      setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }
   
   const handleOnSubmit = (event) => {
      event.preventDefault();
      
      //check that the new passwords match
      if (!errors?.confirmpassword) {
         
         const passwordForm = {old_password: form.oldPassword, password: form.newPassword};
         const res = updatePassword(passwordForm);
         if (res) {setPasswordOpen(false); setSuccess({message: "Successfully changed password"})};
      }

   }

   
   return (
     <Transition.Root show={passwordOpen} as={Fragment}>
       <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={(e) => {setPasswordOpen(!passwordOpen); navigate('/')}}>
         <Transition.Child
           as={Fragment}
           enter="ease-out duration-300"
           enterFrom="opacity-0"
           enterTo="opacity-100"
           leave="ease-in duration-200"
           leaveFrom="opacity-100"
           leaveTo="opacity-0"
         >
           <div className="fixed inset-x-0 bottom-0 h-full bg-gray-500 bg-opacity-75 transition-opacity" />
         </Transition.Child>
 
         <div className="fixed z-10 inset-0 overflow-y-auto">
           <div className="flex items-center sm:items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
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
                         Change password
                       </Dialog.Title>
                       {errors?.confirmpassword ? <p className="text-red-500">{errors.confirmpassword}</p> : null}
                       {error?.updatePassword ? <p className="text-red-500">{error.updatePassword}</p> : null}
                       <form>
                        <div className="shadow-sm -space-y-px w-3/4">
                              <div>
                                 <input
                                 id="oldPassword"
                                 name="oldPassword"
                                 type="password"
                                 value={form.oldPassword}
                                 onChange={handleOnInputChange}
                                 required
                                 className="appearance-none relative block w-full px-3 py-2 border-x-0 border-t-0 bg-gray-100 border-b-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                 placeholder="Old Password"
                                 />
                              </div>
                        </div>
                        <div className="shadow-sm -space-y-px w-3/4">
                              <div>
                                 <input
                                 id="newPassword"
                                 name="newPassword"
                                 type="password"
                                 value={form.newPassword}
                                 onChange={handleOnInputChange}
                                 required
                                 className="appearance-none relative block w-full px-3 py-2 border-x-0 border-t-0 bg-gray-100 border-b-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                 placeholder="New Password"
                                 />
                              </div>
                        </div>
                        <div className="shadow-sm -space-y-px w-3/4">
                              <div>
                                 <input
                                 id="confirmNewPassword"
                                 name="confirmNewPassword"
                                 type="password"
                                 value={form.confirmNewPassword}
                                 onChange={handleOnInputChange}
                                 required
                                 className="appearance-none relative block w-full px-3 py-2 border-x-0 border-t-0 bg-gray-100 border-b-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                 placeholder="Confirm New Password"
                                 />
                              </div>
                        </div>
                       </form>
                     </div>
                   </div>
                 </div>
                 <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                   <button
                     type="button"
                     className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                     onClick={handleOnSubmit}
                   >
                     Confirm
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