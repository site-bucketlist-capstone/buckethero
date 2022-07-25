import { useAuthContext } from "../contexts/auth";
import { useState } from "react";
import { UserCircleIcon } from '@heroicons/react/solid'

import Banner from '../assets/profile-banner.png';

import apiClient from '../services/apiClient';
import * as axios from 'axios';

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

   const [file, setFile] = useState()

//    async function postProfilePic(data) {
//       try {
//           let config = {
//               headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZ21haWwuY29tIiwiaWF0IjoxNjU4Nzc0MzUxLCJleHAiOjE2NTg4NjA3NTF9.twBSmDMvqwy4lL2LCceSmup9s3wQfxrBezDoI2hBED4"
//               }
//             }
//           console.log(data)
//           let response = await axios.post("http://localhost:3001/profile", data, config)
//           console.log(response.data)
//       } catch(error) {
//           console.error(error)
//       }
//   }   

   const handleOnChangeImage = event => {
      const file = event.target.files[0]
      setFile(file)
      console.log(file)
   }

   const handleOnSubmitImage = event => {
      const data = new FormData()
      data.append("name", user.first_name)
      data.append("file", file)

      //needs to be updated in apiClient and dashContext
      axios.post("https://httpbin.org/anything", data).then(res => console.log(res.data.files.file)).catch(err => console.log(err)) 
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
            
            <div>
               <label htmlFor="file">File</label>
               <input type="file" id="file" onChange={handleOnChangeImage}/>
            </div>
            <button onClick={handleOnSubmitImage}>Send</button>

         </div>
            
      </div>
   );
}