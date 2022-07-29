import {useState} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import { useAuthContext } from "../contexts/auth";
import { useDashContext } from '../contexts/dashboard';
import { ExclamationIcon, ClockIcon, BookmarkIcon, LocationMarkerIcon, CurrencyDollarIcon } from '@heroicons/react/outline'
import {useNavigate} from 'react-router-dom';



export default function ListItemComp({item}) {
    const {selected, editItem, setModalOpen, editItemModal, setEditItemModal} = useDashContext();
    
    const handleClick = async (event) => {
        //edit item
        console.log("clciked check");
        event.stopPropagation();
        console.log(!item.is_completed)
        const form = {list_id: selected, item_id: item.id, is_completed: !item.is_completed}
        const data = await editItem(form);
    }

    function handleEdit(event) {
        console.log("clicked item");
        setEditItemModal({open: true, item: item});
        //setModalOpen(true);
    }

    function formatDate(date) {
        if (date) return new Date(date).toDateString();
        else return null;
    }
    return (
        <div className='rounded bg-slate-100 flex flex-row items-center justify-around p-2 mb-2 cursor-pointer' onClick={(e) => handleEdit(e)}>
            {item?.is_completed ? 
            <div className='w-5/6 sm:flex  sm:w-5/6 sm:justify-between'><div className=' self-center text-xl font-semibold sm:w-1/3 text-slate-600'>
            {item?.name}
        </div>
        <div className='flex flex-col sm:w-2/3 sm:justify-center '>
            <div className='flex flex-row'>
                <div className='flex flex-row w-1/2 text-gray-400'>
                    <ClockIcon className='text-gray-400 h-6 w-6 mr-2'/>
                    {formatDate(item?.due_date)}
                </div>
                <div className='flex flex-row w-1/2 text-gray-400 sm:pl-4'>
                    <BookmarkIcon className='text-gray-400 h-6 w-6 mr-2'/>
                    {item?.category}
                </div>
            </div>
            <div className='flex flex-row'>
                <div className='flex flex-row w-1/2 text-gray-400'>
                    <LocationMarkerIcon className='text-gray-400 h-6 w-6 mr-2'/>
                    {item?.location}
                </div>
                <div className='flex flex-row w-1/2 text-gray-400 sm:pl-4'>
                    <CurrencyDollarIcon className='text-gray-400 h-6 w-6 mr-2'/>
                    {item?.price_point}
                </div>
            </div>
        </div></div> : <div className='w-5/6 sm:flex sm:w-5/6 sm:justify-between '><div className='self-center text-xl font-semibold sm:w-1/3 text-purple-800'>
                {item?.name}
            </div>
            <div className='flex flex-col sm:w-2/3 sm:justify-center '>
                <div className='flex flex-row'>
                    <div className='flex flex-row w-1/2 text-gray-600'>
                        <ClockIcon className='text-gray-500 h-6 w-6 mr-2'/>
                        {formatDate(item?.due_date)}
                    </div>
                    <div className='flex flex-row w-1/2 text-gray-600 sm:pl-4'>
                        <BookmarkIcon className='text-gray-500 h-6 w-6 mr-2'/>
                        {item?.category}
                    </div>
                </div>
                <div className='flex flex-row'>
                    <div className='flex flex-row w-1/2 text-gray-600'>
                        <LocationMarkerIcon className='text-gray-500 h-6 w-6 mr-2'/>
                        {item?.location}
                    </div>
                    <div className='flex flex-row w-1/2 text-gray-600 sm:pl-4'>
                        <CurrencyDollarIcon className='text-gray-500 h-6 w-6 mr-2'/>
                        {item?.price_point}
                    </div>
                </div>
            </div></div>}
            <div onClick={(e) => handleClick(e)}>
                {item?.is_completed ? <ion-icon name="checkbox-outline" style={{color: "#a855f7", "--ionicon-stroke-width": "44px"}} size="large" className='text-purple-400'></ion-icon> : <div className='border w-7 border-4 h-7 mb-1 mr-1 rounded border-purple-400 cursor-pointer'></div>}
            </div>
            
        </div>
        
    );
}