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
        <div className='container mx-auto border border-black h-full'>
            <div className='flex flex-row border items-center justify-center h-1/4'>
                <ComingUp></ComingUp>
            </div>
            
            <div className='flex flex-row items-center border justify-center mt-4 h-3/4'>
                <ListCol></ListCol>
                <ListItems></ListItems>
            </div>
            
        </div>
    );
}