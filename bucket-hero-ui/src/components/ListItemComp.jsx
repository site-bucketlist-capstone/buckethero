import {useState} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import { useAuthContext } from "../contexts/auth";
import {useNavigate} from 'react-router-dom';



export default function ListItemComp(item) {
    function handleClick(event) {
        
        
    }
    return (
        <div className='border'>
            {item?.name}
            yayadshfhjakdsf
        </div>
        
    );
}