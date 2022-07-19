import {createContext, useState, useContext, useEffect} from 'react'

import apiClient from '../services/apiClient';

const DashContext = createContext(null);

export const DashContextProvider = ({children}) => {
    const [lists, setLists] = useState([]);
    const [initialized, setInitialized] = useState();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState();
    const [selected, setSelected] = useState();

    useEffect(() => {
        //initialize lists? by fetching the lists?
        const fetchLists = async () => {
            const {data, error} = await apiClient.fetchLists();
            if (data) setLists(data.list);
            if (error) setError(err);
        }
        const token = localStorage.getItem("buckethero-token");
        if(token) {
            apiClient.setToken(token);
            fetchLists();
        }
        console.log("useEffect", lists)
        
        

    }, []);

    const newList = async (form) => {
        //const {data, error} = await apiClient.newList(form);
        setIsProcessing(true)
        setError((e) => ({ ...e, form: null }))
        const fetchNew = async () => {
            const {data, err} = await apiClient.newList(form);
            if (data) {
                return true;
            } else if (err) {
                return false;
            }

        }
        const fetchLists = async () => {
            const {data, err} = await apiClient.fetchLists();
            if (data) {
                setLists(data.list);
                return true;
            };
            if (err) setError(err);
        }
        const nav = await fetchNew();
        await fetchLists();
        setIsProcessing(false);
        console.log("lists after new", lists);
        return nav;
    }

    //function to fetch items for a given list
    const fetchListItems = async (id) => {
        //fetch list item using id
        
        const {data, err} = await apiClient.fetchItemsById(id);
        if (data) {
            console.log("fetched list item data", data)
            return data;
        }
        if (err) return false;
        //return value to be an array of list items
    }


    const dashValue = {lists, 
        setLists, 
        initialized, 
        setInitialized,
        isProcessing,
        setIsProcessing,
        error,
        setError,
        newList,
        selected,
        setSelected,
        fetchListItems
        
    }

    return (
        <DashContext.Provider value={dashValue}>
            <>{children}</>
        </DashContext.Provider>
    )

}

export const useDashContext = () => useContext(DashContext)