import {createContext, useState, useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useDashContext } from './dashboard';

import apiClient from '../services/apiClient';

const EditContext = createContext(null);

export const EditContextProvider = ({children}) => {
   
   const { list_id } = useParams();
   const { lists } = useDashContext();
   
   let currentList = lists.filter(list => list.id == list_id);
   currentList = currentList[0];

   console.log(list_id)
   // useEffect(() => {
   //    const fetchGallery = async () => {
   //        const {data, error} = await apiClient.fetchGallery();
   //        if (data) {
   //            await setGallery(data.list);
   //        }
   //        if (error) setError(error);
   //    }
   //    fetchGallery();
   // }, []);

      
   const editValue = {
      
   }

  return (
      <EditContext.Provider value={editValue}>
          <>{children}</>
      </EditContext.Provider>
  )

}

export const useEditContext = () => useContext(EditContext)