import { useAuthContext } from "../contexts/auth";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserCircleIcon } from '@heroicons/react/solid'

import Banner from '../assets/profile-banner.png';
import Completed from "./Completed";

import apiClient from '../services/apiClient';
import * as axios from 'axios';

export default function PublicProfile( ) {
   const [viewer, setViewer] = useState({});
   const viewerId = useParams().userId;
   useEffect(() => {
      const setUpViewer = async () => {
         setIsProcessing(true)
         setError(null)
         const { data, error } = await apiClient.getViewerInfo(viewerId);
         if (error) {
            const message = error?.response?.data?.error?.message
            setError(error)
          }
          if (data) {
            
            await setViewer(data.user);
         }
         console.log(data.user);
         setIsProcessing(false);

      }

      const showListItems =  async() => {
         setIsProcessing(true)
         setError(null)
         const {data, error} = await apiClient.fetchAllUserListItems(viewerId);
         if (error) {
           const message = error?.response?.data?.error?.message
           setError(error)
           setIsProcessing(false);
         }
         if (data) {
           setComplete(data.result);
           setIsProcessing(false);
         }
         console.log(data);
      }
      setUpViewer();
      showListItems();
   }, []);

   const {user, setUser} = useAuthContext();
   const [isShowing, setIsShowing] = useState(true);
   const [isPublic, setIsPublic] = useState(true);
   const [complete, setComplete] = useState([]);
   const [isProcessing, setIsProcessing] = useState(false);
   const [error, setError] = useState();

   const imgUrl = viewer?.pfp ? viewer.pfp : "https://c8.alamy.com/zooms/9/52c3ea49892f4e5789b31cadac8aa969/2gefnr1.jpg";

   const [file, setFile] = useState();

   return (
       <div>
         <div className="flex flex-col p-4">
            <img src={Banner} alt="" className="-z-20 h-60 w-full rounded"/>
            <div className="-mt-20 pl-2 sm:pl-0 sm:ml-12 pr-6 flex flex-col items-center sm:flex-row sm:items-end sm:justify-between">
               <div className="flex flex-row items-center">
                  <div>
                     <div className="h-40 w-40 rounded-full overflow-hidden hover:drop-shadow-xl">
                        <label htmlFor="file">
                           <img src={viewer?.profile_image ? viewer.profile_image : imgUrl} alt="profile picture" className="scale-150 cursor-pointer"/>
                        </label>
                        
                     </div>
                  </div>
                  
                  <div className="ml-4 flex flex-col justify-end mt-4">
                     <span className="mb-6 ">   </span>
                     <div className="mt-4">
                        <span className="font-semibold text-lg">{viewer.first_name}   {viewer.last_name}</span>
                     </div>  
                     <div className="font-light text-slate-500">
                        <span>Email: </span>
                        <span>   {viewer.email}</span>
                     </div>
                  </div>
               </div>
               {/* {
               !isShowing ? <button className="mt-4 sm:mt-12 self-center rounded bg-purple-400 p-2 text-white hover:bg-white hover:border-2 hover:border-purple-400 hover:text-purple-400" onClick={() => setIsShowing(false)}  >{viewer.first_name} List Items</button>
               : 
               <button className="mt-4 sm:mt-12 self-center bg-white border-2 border-purple-400 text-purple-400 rounded p-2 hover:bg-purple-400 hover:text-white" onClick={handleComplete}>Hide {viewer.first_name} List Items</button>
            } */}
            {error ? <span>{error}</span> : "" }
            </div>
            {isProcessing ? <p>Loading...</p> : null}
            {<Completed completed={complete} isPublic={isPublic}/>}
         </div>            
      </div>
   );
}