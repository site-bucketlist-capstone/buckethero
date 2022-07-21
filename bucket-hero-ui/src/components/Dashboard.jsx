import {useState} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import { useAuthContext } from "../contexts/auth";
import { useDashContext } from '../contexts/dashboard';
import {useNavigate} from 'react-router-dom';
import ComingUp from './ComingUp';
import ListCol from './ListCol';
import ListItems from './ListItems';
import NewItem from './NewItem';



export default function Dashboard({}) {
    const {modalOpen, setModalOpen} = useDashContext();
    return (
        <div className='container mx-auto h-full'>
            {modalOpen ? <NewItem></NewItem> : null}
            <div className='flex flex-row items-center justify-center h-1/4'>
                <ComingUp></ComingUp>
            </div>
            
            <div className='flex flex-row items-center justify-center mt-4 h-3/4'>
                <ListCol></ListCol>
                <ListItems></ListItems>
            </div>
            
        </div>
    );
}