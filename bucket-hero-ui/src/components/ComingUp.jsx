import {useState} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import { useAuthContext } from "../contexts/auth";
import {useNavigate} from 'react-router-dom';



export default function ComingUp({}) {
    return (
        <div className='border border-orange-500 w-full p-2 h-full'>
            coming up
        </div>
    );
}