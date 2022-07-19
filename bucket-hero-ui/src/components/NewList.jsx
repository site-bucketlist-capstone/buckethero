import {useState} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import { useAuthContext } from "../contexts/auth";
import {useNavigate} from 'react-router-dom';



export default function NewList({}) {
    return (
        <div className='container mx-auto border border-blue-500 w-2/3 p-2 h-full'>
            new list
        </div>
    );
}