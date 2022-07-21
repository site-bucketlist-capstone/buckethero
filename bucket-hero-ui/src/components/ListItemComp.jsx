import {useState} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import { useAuthContext } from "../contexts/auth";
import { ExclamationIcon, ClockIcon, BookmarkIcon, LocationMarkerIcon, CurrencyDollarIcon } from '@heroicons/react/outline'
import {useNavigate} from 'react-router-dom';



export default function ListItemComp({item}) {
    function handleClick(event) {
        
        
    }

    function formatDate(date) {
        return new Date(date).toDateString();
    }
    return (
        <div className='rounded bg-slate-100 flex flex-row items-center justify-around p-2 mb-2 cursor-pointer'>
            <div className='mr-8 text-xl font-semibold w-1/4 text-violet-800'>
                {item?.name}
            </div>
            <div className='flex flex-col w-1/2'>
                <div className='flex flex-row'>
                    <div className='flex flex-row w-1/2'>
                        <ClockIcon className='text-gray-500 h-6 w-6 mr-2'/>
                        {formatDate(item?.due_date)}
                    </div>
                    <div className='flex flex-row w-1/2'>
                        <BookmarkIcon className='text-gray-500 h-6 w-6 mr-2'/>
                        {item?.category}
                    </div>
                </div>
                <div className='flex flex-row'>
                    <div className='flex flex-row w-1/2'>
                        <LocationMarkerIcon className='text-gray-500 h-6 w-6 mr-2'/>
                        {item?.location}
                    </div>
                    <div className='flex flex-row w-1/2'>
                        <CurrencyDollarIcon className='text-gray-500 h-6 w-6 mr-2'/>
                        {item?.price_point}
                    </div>
                </div>
            </div>
            <div>
                {item?.is_completed ? <ion-icon name="checkbox-outline" size="small"></ion-icon> : <div className='border w-6 h-6 rounded border-2 border-violet-400 cursor-pointer'></div>}
            </div>
            
        </div>
        
    );
}