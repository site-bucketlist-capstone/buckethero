import {useState, useEffect} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import ListItemComp from './ListItemComp';
import { useDashContext } from "../contexts/dashboard";
import {useNavigate} from 'react-router-dom';


//Main container to display list items for the selected list
export default function ListItems({}) {
    const {selected, fetchListItems, blTitle, setModalOpen, modalOpen, lists, items, setItems} = useDashContext();
   
    useEffect(() => {
        
        const getItems = async () => {
            console.log("selected in list items", selected);
            const result = await fetchListItems(selected);
            if (result.result !== items) {
                let itemsCopy = result.result.sort((a, b) => (a.is_completed > b.is_completed) ? 1 : -1);
                await setItems(itemsCopy);
                //await setItems(result.result);
                
            }
            return result;
        }
        getItems();
        
        
        //console.log("use effect items", items);
        
    }, [selected, modalOpen, lists]);

    return (
        <div className='sm:w-2/3 p-4 h-full'>
            <div className='flex flex-row w-full my-2 items-center justify-between'>
                <h2 className='text-xl font-semibold'>{blTitle}</h2>
                {blTitle ? <div className='justify-self-end flex items-center'>
                    <button className='flex bg-purple-400 rounded p-1 pl-2' onClick={() => setModalOpen(true)}>
                        <p className='text-white'>Add</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div> : null}
                
            </div>
            
            {items.length > 0 ? items.map((item) => {
                return <div key={item.id}><ListItemComp item={item} isPublic={false}/></div>
            }) : blTitle ? <p>No items yet. Press the plus button to add some! Check out the Inspo Board for ideas.</p> : <p>No lists yet. Press the plus button next to Your Lists to add one!</p>}
        </div>
    );
}