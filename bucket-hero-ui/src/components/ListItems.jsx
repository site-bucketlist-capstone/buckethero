import {useState, useEffect} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import ListItemComp from './ListItemComp';
import { useDashContext } from "../contexts/dashboard";
import {useNavigate} from 'react-router-dom';



export default function ListItems({}) {
    const {selected, fetchListItems, blTitle, setModalOpen, modalOpen, lists} = useDashContext();
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
        
    }, [selected, modalOpen, lists]);

    return (
        <div className='w-2/3 p-4 h-full'>
            <div className='flex flex-row w-full my-2 items-center justify-between'>
                <h2 className='text-xl font-semibold'>{blTitle}</h2>
                {blTitle ? <div className='justify-self-end flex items-center'>
                    <button className='flex bg-purple-400 rounded p-1' onClick={() => setModalOpen(true)}>
                        <p className='text-white'>Add</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div> : null}
                
            </div>
            
            {items.length > 0 ? items.map((item) => {
                return <div key={item.id}><ListItemComp item={item}/></div>
            }) : blTitle ? <p>No items yet. Press the plus button to add some!</p> : <p>No lists yet. Press the plus button next to Your Lists to add some!</p>}
        </div>
    );
}