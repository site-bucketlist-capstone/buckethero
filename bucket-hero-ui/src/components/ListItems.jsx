import {useState, useEffect} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import { useDashContext } from "../contexts/dashboard";
import {useNavigate} from 'react-router-dom';



export default function ListItems({}) {
    const {selected, fetchListItems} = useDashContext();
    const [items, setItems] = useState([]);
    useEffect(() => {
        //fetch the list items for the given selected id
        const getItems = async () => {
            const result = await fetchListItems(selected);
            if (result) {
                await setItems(result.items);
                console.log(result)
            }
            return result;
        }
        getItems();
        console.log("use effect items", items);
        
    }, [])
    return (
        <div className='border border-blue-500 w-2/3 p-2 h-full'>
            list items
        </div>
    );
}