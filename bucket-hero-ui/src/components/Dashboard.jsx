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
        <div className='container mx-auto mt-'>
            <div className='flex flex-row border items-center justify-center'>
                <ComingUp></ComingUp>
            </div>
            
            <div className='flex flex-row items-center border justify-center mt-4'>
                <ListCol></ListCol>
                <ListItems></ListItems>
            </div>
            
        </div>
    );
}