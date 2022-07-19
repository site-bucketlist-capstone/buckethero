import {useState} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import { useAuthContext } from "../contexts/auth";
import {useNavigate} from 'react-router-dom';



export default function ListCol({}) {
    return (
        <div className='border border-purple-500 w-1/3 mr-4 p-2'>
            list col
        </div>
    );
}