import {useState} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import { useAuthContext } from "../contexts/auth";
import {useNavigate} from 'react-router-dom';



export default function ComingUp({}) {
    return (
        <div className='rounded bg-slate-50 w-full p-2 h-full'>
            <h1 className='text-2xl font-semibold'>Coming Up</h1>
        </div>
    );
}