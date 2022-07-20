import {useState, useEffect} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import ListItemComp from './ListItemComp';
import { useDashContext } from "../contexts/dashboard";
import {useNavigate} from 'react-router-dom';



export default function ListItems({}) {
    const {selected, fetchListItems, blTitle, setModalOpen} = useDashContext();
    const [items, setItems] = useState([]);
    useEffect(() => {
        //fetch the list items for the given selected id
        const getItems = async () => {
            const result = await fetchListItems(selected);
            if (result) {
                await setItems(result.result);
                console.log(result)
            }
            return result;
        }
        getItems();
        console.log("use effect items", items);
        
    }, [selected])
    return (
        <div className='border border-blue-500 w-2/3 p-2 h-full'>
            <h2>{blTitle}</h2>
            <button className='border border-violet-500 rounded' onClick={() => setModalOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            </button>
            {items.length > 0 ? items?.map((item) => {
                <ListItemComp item={item}/>
            }) : <p>No items yet. Press the plus button to add some!</p>}
        </div>
    );
}