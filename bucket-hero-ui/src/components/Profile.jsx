import { useAuthContext } from "../contexts/auth";
import { useState } from "react";
import { UserCircleIcon } from '@heroicons/react/solid'

import Banner from '../assets/profile-banner.png';

import apiClient from '../services/apiClient';

export default function Profile( ) {
   const {user} = useAuthContext();
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
   return (
       <div>
         <div className="flex flex-col">
            <img src={Banner} alt="" className="h-60 w-full"/>
            <div className="-mt-20 ml-12 pr-6 flex flex-row items-end justify-between">
               <div className="flex flex-row">
                  <div className=" h-40 w-40 rounded-full overflow-hidden">
                     <img src={imgUrl} alt="" className="scale-150"/>
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
               !isShowing ? <button className="rounded bg-purple-400 p-2 text-white hover:bg-white hover:border-2 hover:border-purple-400 hover:text-purple-400" onClick={handleComplete}>Completed Items</button>
               : 
               <button className="bg-white border-2 border-purple-400 text-purple-400 rounded p-2 hover:bg-purple-400 hover:text-white" onClick={() => setIsShowing(false)}>Hide Completed</button>
            }
            {error ? <span>{error}</span> : "" }
            </div>
            
         </div>
            
      </div>
   );
}