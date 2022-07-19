import {useState} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import { useAuthContext } from "../contexts/auth";
import {useNavigate} from 'react-router-dom';



export default function ListCol({}) {
    const navigate = useNavigate();
    return (
        <div className='border border-purple-500 w-1/3 mr-4 p-2 h-full p-2'>
            <div className='flex flex-row w-full justify-between'>
                <h2 className='text-xl'>list col</h2>
                <button className='border border-violet-500 rounded' onClick={() => navigate('/newlist')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                </button>
            </div>
        </div>
    );
}