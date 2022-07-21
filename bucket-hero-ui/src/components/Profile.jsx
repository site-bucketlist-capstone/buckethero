import { useAuthContext } from "../contexts/auth";
import { useState } from "react";

import apiClient from '../services/apiClient';

export default function Profile( ) {
   const {user} = useAuthContext();
   const [isShowing, setIsShowing] = useState(false);
   const [complete, setComplete] = useState([]);
   const [isProcessing, setIsProcessing] = useState(false);
   const [error, setError] = useState();

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
      setIsShowing(!isShowing);
      showCompleted();
   }
   return (
       <div>
           <h4>Profile</h4> 
           <div>
            <span>{user.first_name}   {user.last_name}</span>
           </div>  
            <div>
               <span>Email</span>
               <span>   {user.email}</span>
            </div>
            {
               !isShowing ? <button className="border" onClick={handleComplete}>Completed Items</button>
               : 
               <div>Completed</div>
            }
            {error ? <span>{error}</span> : "" }
            
       </div>
   );
}