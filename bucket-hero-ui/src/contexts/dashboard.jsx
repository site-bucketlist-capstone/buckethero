import {createContext, useState, useContext, useEffect} from 'react'

import apiClient from '../services/apiClient';
import { useAuthContext } from './auth';

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
    const [items, setItems] = useState([]);
    const [editItemModal, setEditItemModal] = useState({open: false, item: {}});

    const {user} = useAuthContext();

    useEffect(() => {
        //initialize lists? by fetching the lists?
        
        console.log("user", user);
        const fetchLists = async () => {
            const {data, error} = await apiClient.fetchLists();
            if (data) {
                await setLists(data.list);
                setSelected(data.list[0]?.id);
                setBlTitle(data.list[0]?.name);
            }

            if (error) setError(error);
        }
        const fetchComingUp = async () => {
            const {data, error} = await apiClient.fetchComingUpItems();
            if (data) {
                await setComingUp(data.result);
            }
            if (error) setError(error);
        }
        const token = localStorage.getItem("buckethero-token");
        if(token && user?.email) {
            apiClient.setToken(token);
            fetchLists();
            fetchComingUp();
        }
        
    }, [user]);

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

        const nav = await fetchNew();
        await fetchLists();
        setIsProcessing(false);
        //console.log("lists after new", lists);
        return nav;
    }

    const fetchLists = async () => {
        const {data, err} = await apiClient.fetchLists();
        if (data) {
            setLists(data.list);
            setBlTitle(data.list[0]?.name);
            setSelected(data.list[0]?.id);
            return true;
        };
        if (err) setError(err);
    }

    //function to fetch items for a given list
    const fetchListItems = async (id) => {
        //fetch list item using id
        console.log("fetch items id", id);
        if (id) {
            const {data, err} = await apiClient.fetchItemsById(id);
            if (data) {
                //console.log("fetched list item data", data)
                return data;
            }
            if (err) return false;
        } else {
            return {result: []}
        }
        //return value to be an array of list items
    }

    const newItem = async (form) => {
        setIsProcessing(true)
        setError((e) => ({ ...e, form: null }))
        //console.log("in new item")
        const fetchNew = async () => {
            const {data, err} = await apiClient.newItem(form);
            if (data) {
                //console.log("got data")
                return true;
            } else if (err) {
                return false;
            }

        }
        const nav = await fetchNew();
        //console.log("have nav", nav);
        const items = await fetchListItems(form.list_id);
        await fetchComingUp();
        setIsProcessing(false);
        //console.log("list items after new", items);
        return nav;
    }
    const fetchComingUp = async () => {
        const {data, error} = await apiClient.fetchComingUpItems();
        if (data) {
            console.log(data)
            await setComingUp(data.result);
        }
        if (error) setError(error);
    }

    const editItem = async(form) => {
        //apiclient editItem, needs list_id and item_id
        const fetchComingUp = async () => {
            const {data, error} = await apiClient.fetchComingUpItems();
            if (data) {
                //console.log(data)
                await setComingUp(data.result);
            }
            if (error) setError(error);
        } 
        //console.log("form", form);
        const {data, err} = await apiClient.editItem(form);
        if (data) {
            //fetch list items
            const items = await fetchListItems(form.list_id);
            await fetchComingUp();
            const itemsCopy = items.result.sort((a, b) => (a.is_completed > b.is_completed) ? 1 : -1);
            await setItems(itemsCopy);
            //setItems(items);
            return data
        } else if (err) {
            setError(error)
        }
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
        setSelected, fetchLists,
        fetchListItems,
        blTitle,
        setBlTitle,
        modalOpen,
        setModalOpen,
        newItem,
        comingUp, fetchComingUp,
        editItem,
        items,
        setItems,
        setEditItemModal,
        editItemModal
        
    }

    return (
        <DashContext.Provider value={dashValue}>
            <>{children}</>
        </DashContext.Provider>
    )

}

export const useDashContext = () => useContext(DashContext)