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
    
    function formatDate(date) {
        //if(date) return new Date(date).toDateString();
        //else return null
        let date_1 = new Date(date);
        let date_2 = new Date();

        const days = (date_1, date_2) =>{
            let difference = date_1.getTime() - date_2.getTime();
            let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
            return TotalDays;
        }
        
        const res = days(date_1, date_2);
        if (res < 0) return <><ClockIcon className='text-red-500 h-6 w-6 mr-2'/><p className='text-red-500'>{res*-1} days late</p></>;
        else if (res == 1) return <><ClockIcon className='text-gray-500 h-6 w-6 mr-2'/><p className=''>{res} day away</p></>
        else if (res == 0) return <><ClockIcon className='text-gray-500 h-6 w-6 mr-2'/><p className=''>Today!</p></>
        else return <><ClockIcon className='text-gray-500 h-6 w-6 mr-2'/><p className=''>{res} days away</p></>
    }
    return (
        <div className='rounded bg-slate-50 w-full p-2 h-full sm:flex sm:flex-row sm:items-center sm:justify-between sm:pl-6'>
            <h1 className='text-xl mt-2 mb-2 sm:mb-0 sm:text-3xl text-center sm:text-left text-orange-500 font-semibold sm:w-1/4'>Coming Up</h1>
            {comingUp.length > 0 ? 
                <div className='sm:grid sm:grid-cols-2 sm:w-3/4 sm:gap-2'>
                {comingUp.map((item) => {if (item.due_date) return (
                    <div key={item.id} className='border-2 border-purple-400 rounded flex flex-row justify-between p-2 w-full'>
                        <p className='font-medium self-center'>{item.name}</p>
                        <div className='flex flex-row items-center'>
                            
                            {formatDate(item.due_date)}
                        </div>
                    </div>
                )})}
                </div>
            :   <p className='sm:mr-12'>Add more list items to see what's coming up!</p>}
            
            
        </div>
    );
}