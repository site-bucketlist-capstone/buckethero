import { useAuthContext } from "../contexts/auth";
import { useState } from "react";
import { UserCircleIcon } from '@heroicons/react/solid'

import Banner from '../assets/profile-banner.png';
import Completed from "./Completed";

import apiClient from '../services/apiClient';
import * as axios from 'axios';

export default function Profile( ) {
   const {user, setUser} = useAuthContext();
   const [isShowing, setIsShowing] = useState(false);
   const [complete, setComplete] = useState([]);
   const [isProcessing, setIsProcessing] = useState(false);
   const [error, setError] = useState();

   const imgUrl = user?.pfp ? user.pfp : "https://c8.alamy.com/zooms/9/52c3ea49892f4e5789b31cadac8aa969/2gefnr1.jpg";

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

   function handleComplete() {
      setIsShowing(true);
      showCompleted();
   }

   const [file, setFile] = useState()

   // const handleOnChangeImage = event => {
   //    const file = event.target.files[0]
   //    setFile(file)
   //    console.log(file)
   // }

   const handleOnSubmitImage = async (event) => {
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
         .catch(err => console.error(err)) 
   }


   return (
       <div>
         <div className="flex flex-col">
            <img src={Banner} alt="" className="-z-20 h-60 w-full"/>
            <div className="-mt-20 pl-2 sm:pl-0 sm:ml-12 pr-6 flex flex-col items-center sm:flex-row sm:items-end sm:justify-between">
               <div className="flex flex-row">
                  <div className="h-40 w-40 rounded-full overflow-hidden hover:drop-shadow-xl">
                     <label htmlFor="file">
                        <img src={user.profile_image ? user.profile_image : imgUrl} alt="" className="scale-150 cursor-pointer"/>
                     </label>
                     <input type="file" id="file" onChange={handleOnSubmitImage}/>
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
               {
               !isShowing ? <button className="mt-4 sm:mt-0 self-center rounded bg-purple-400 p-2 text-white hover:bg-white hover:border-2 hover:border-purple-400 hover:text-purple-400" onClick={handleComplete}>Completed Items</button>
               : 
               <button className="mt-4 sm:mt-0 self-center bg-white border-2 border-purple-400 text-purple-400 rounded p-2 hover:bg-purple-400 hover:text-white" onClick={() => setIsShowing(false)}>Hide Completed</button>
            }
            {error ? <span>{error}</span> : "" }
            </div>
            {isShowing ? <Completed completed={complete}/> : null}
         </div>            
      </div>
   );
}