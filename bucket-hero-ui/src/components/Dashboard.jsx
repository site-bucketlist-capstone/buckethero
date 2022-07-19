import {useState} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import { useAuthContext } from "../contexts/auth";
import {useNavigate} from 'react-router-dom';
import ComingUp from './ComingUp';
import ListCol from './ListCol';
import ListItems from './ListItems';



export default function Dashboard({}) {
    return (
        <div className='border border-orange-500 container mx-auto'>
            <div className='flex flex-row border'>
                <ComingUp></ComingUp>
            </div>
            
            <div className='flex flex-row border'>
                <ListCol></ListCol>
                <ListItems></ListItems>
            </div>
            
        </div>
    );
}