import {createContext, useState, useContext, useEffect} from 'react'

import apiClient from '../services/apiClient';
import { useAuthContext } from './auth';

const GallContext = createContext(null);

export const GallContextProvider = ({children}) => {
    const {user} = useAuthContext();
   const [gallery, setGallery] = useState([]);
   const [gallModal, setGallModal] = useState({open: false, item: {}, list_id: "", name: ""});
   const [isProcessing, setIsProcessing] = useState(false);
   const [success, setSuccess] = useState("");
   const [searchCategory, setSearchCategory] = useState("name");
   const [searchValue, setSearchValue] = useState("");
   const [error, setError] = useState();
   //for inspired badge
   const [inspired, setInspired] = useState(false);

   
   useEffect(() => {
      const fetchGallery = async () => {
          const {data, error} = await apiClient.fetchGallery();
          if (data) {
              await setGallery(data.list);
          }
          if (error) setError(error);
      }
      if (user?.email) {
        fetchGallery();
      }
      
   }, [user]);
   
   const gallValue = {
      gallery,
      gallModal,
      setGallModal,
      success,
      setSuccess,
      searchValue, 
      setSearchValue,
      searchCategory,
      setSearchCategory,
      inspired, 
      setInspired
   }

  return (
      <GallContext.Provider value={gallValue}>
          <>{children}</>
      </GallContext.Provider>
  )

}

export const useGallContext = () => useContext(GallContext)
