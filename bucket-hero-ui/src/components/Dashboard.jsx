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
import EditItem from './EditItem';



export default function Dashboard({}) {
    const {modalOpen, setModalOpen, editItemModal} = useDashContext();
    return (
        <div className='container mx-auto h-full mt-20 pb-4 sm:pb-0 sm:mt-4'>
            {modalOpen ? <NewItem></NewItem> : null}
            {editItemModal?.open ? <EditItem item={editItemModal?.item}></EditItem> : null}
            <div className='flex flex-row items-center justify-center sm:h-1/4'>
                <ComingUp></ComingUp>
            </div>
            
            <div className='sm:flex sm:flex-row sm:items-center sm:justify-center mt-4 h-3/4'>
                <ListCol></ListCol>
                <ListItems></ListItems>
            </div>
            
        </div>
    );
}