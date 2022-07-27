import {useState} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import { useAuthContext } from "../contexts/auth";
import { useDashContext } from '../contexts/dashboard';
import {useNavigate} from 'react-router-dom';
import { ExclamationIcon, ClockIcon, BookmarkIcon, LocationMarkerIcon, CurrencyDollarIcon } from '@heroicons/react/outline'


const tempData = [
    {name: "Go to a Frat Party", due_date: "2022-07-23T07:00:00.000Z", location: "outside", price_point: 5},
    {name: "Coffee at Coupa w Prof", due_date: "2022-07-23T07:00:00.000Z", location: "outside", price_point: 5},
    {name: "Super Exciting Activity", due_date: "2022-07-22T07:00:00.000Z", location: "outside", price_point: 5},
    {name: "Go For a Run", due_date: "2022-07-23T07:00:00.000Z", location: "outside", price_point: 5}
]

export default function ComingUp({}) {
    const {comingUp} = useDashContext();
    console.log(comingUp);
    function formatDate(date) {
        if(date) return new Date(date).toDateString();
        else return null
    }
    return (
        <div className='rounded bg-slate-50 w-full p-2 h-full sm:flex sm:flex-row sm:items-center sm:pl-6'>
            <h1 className='text-xl mt-2 mb-2 sm:mb-0 sm:text-3xl text-center sm:text-left text-orange-500 font-semibold sm:w-1/4'>Coming Up</h1>
            <div className='sm:grid sm:grid-cols-2 sm:w-3/4 sm:gap-2'>
                {comingUp.map((item) => (
                    <div key={item.id} className='border-2 border-purple-400 rounded flex flex-row justify-between p-2 w-full'>
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