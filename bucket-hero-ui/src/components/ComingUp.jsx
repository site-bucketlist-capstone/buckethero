import {useState} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import { useAuthContext } from "../contexts/auth";
import {useNavigate} from 'react-router-dom';
import { ExclamationIcon, ClockIcon, BookmarkIcon, LocationMarkerIcon, CurrencyDollarIcon } from '@heroicons/react/outline'


const tempData = [
    {name: "Go to a Frat Party", due_date: "2022-07-23T07:00:00.000Z", location: "outside", price_point: 5},
    {name: "Coffee at Coupa w Prof", due_date: "2022-07-23T07:00:00.000Z", location: "outside", price_point: 5},
    {name: "Super Exciting Activity", due_date: "2022-07-22T07:00:00.000Z", location: "outside", price_point: 5},
    {name: "Go For a Run", due_date: "2022-07-23T07:00:00.000Z", location: "outside", price_point: 5}
]

export default function ComingUp({}) {
    function formatDate(date) {
        return new Date(date).toDateString();
    }
    return (
        <div className='rounded bg-slate-50 w-full p-2 h-full flex flex-row items-center pl-6'>
            <h1 className='text-3xl text-orange-500 drop-shadow-xl font-semibold w-1/4'>Coming Up</h1>
            <div className='grid grid-cols-2 w-3/4 gap-2'>
                {tempData.map((item) => (
                    <div className='border-2 border-purple-400 rounded flex flex-row justify-between p-2'>
                        <p className='font-medium'>{item.name}</p>
                        <div className='flex flex-row items-center'>
                            <ClockIcon className='text-gray-500 h-6 w-6 mr-2'/>
                            {formatDate(item.due_date)}
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
}