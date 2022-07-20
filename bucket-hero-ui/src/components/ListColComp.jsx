import {useState} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import { useAuthContext } from "../contexts/auth";
import {useNavigate} from 'react-router-dom';



export default function ListColComp({name, id, selected, setSelected, setBlTitle}) {
    function handleClick(event) {
        setSelected(id);
        setBlTitle(name);
        
    }
    return (
        <div onClick={handleClick}>
            {selected === id ? 
            <div className='bg-orange-400 p-4 my-2 rounded flex flex-row'>
                <p className='mr-4'>&#128512;</p>
                <h4 className='text-lg text-white font-semibold'>{name}</h4>
            </div> : 
            <div className='bg-purple-400 hover:bg-orange-400 cursor-pointer p-4 my-2 rounded flex flex-row'>
                <p className='mr-4'>&#128512;</p>
                <h4 className='text-lg text-white font-semibold'>{name}</h4>
            </div>}
        </div>
        
    );
}