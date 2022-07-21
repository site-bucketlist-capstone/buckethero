import {createContext, useState, useContext, useEffect} from 'react'

import apiClient from '../services/apiClient';

const DashContext = createContext(null);

export const DashContextProvider = ({children}) => {
    const [lists, setLists] = useState([]);
    const [comingUp, setComingUp] = useState([]);
    const [initialized, setInitialized] = useState();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState();
    const [selected, setSelected] = useState();
    const [blTitle, setBlTitle] = useState();
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        //initialize lists? by fetching the lists?
        const fetchLists = async () => {
            const {data, error} = await apiClient.fetchLists();
            if (data) {
                await setLists(data.list);
                setBlTitle(data.list[0]?.name);
            }

            if (error) setError(error);
        }
        const fetchComingUp = async () => {
            const {data, error} = await apiClient.fetchComingUpItems();
            if (data) {
                console.log(data)
                await setComingUp(data.result);
            }
            console.log("coming up")
            console.log(data);
            if (error) setError(error);
        }
        const token = localStorage.getItem("buckethero-token");
        if(token) {
            apiClient.setToken(token);
            fetchLists();
            fetchComingUp();
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

    const newItem = async (form) => {
        setIsProcessing(true)
        setError((e) => ({ ...e, form: null }))
        console.log("in new item")
        const fetchNew = async () => {
            const {data, err} = await apiClient.newItem(form);
            if (data) {
                console.log("got data")
                return true;
            } else if (err) {
                return false;
            }

        }
        const nav = await fetchNew();
        console.log("have nav", nav);
        const items = await fetchListItems(form.list_id);
        setIsProcessing(false);
        console.log("list items after new", items);
        return nav;
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
        fetchListItems,
        blTitle,
        setBlTitle,
        modalOpen,
        setModalOpen,
        newItem
        
    }

    return (
        <DashContext.Provider value={dashValue}>
            <>{children}</>
        </DashContext.Provider>
    )

}

export const useDashContext = () => useContext(DashContext)