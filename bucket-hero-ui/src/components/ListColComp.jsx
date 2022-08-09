import {useState} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import { useAuthContext } from "../contexts/auth";
import {useNavigate, Link} from 'react-router-dom';
import { PencilAltIcon } from '@heroicons/react/outline'




export default function ListColComp({name, emojiUnicode, id, selected, setSelected, setBlTitle}) {
    function handleClick(event) {
        setSelected(id);
        setBlTitle(name);
        
    }
    
    function handleOnEditClick(event) {
        event.stopPropagation();
        // console.log("clicked edit icon");
    }
    
    let emojiString = ""
    if (emojiUnicode){
        emojiString = `&#x${emojiUnicode};`
    } 
    return (
        <div onClick={handleClick}>
            {selected === id ? 
            <div className='bg-orange-400 p-4 my-2 rounded flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center'>
                    <p className='mr-4' dangerouslySetInnerHTML={{__html : emojiString}}></p>
                    <h4 className='text-lg text-white font-semibold'>{name}</h4>
                </div>
                <div>
                <Link to={`/list/${id}/edit`}><PencilAltIcon className='text-white h-6 w-6 mr-2'/></Link>
                </div>
                
            </div> : 
            <div className='bg-purple-400 hover:bg-orange-400 cursor-pointer p-4 my-2 rounded flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center'>
                    <p className='mr-4' dangerouslySetInnerHTML={{__html : emojiString}}></p>
                    <h4 className='text-lg text-white font-semibold'>{name}</h4>
                </div>
                
                
                <div className='cursor-pointer' >
                    <PencilAltIcon className='text-white h-6 w-6 mr-2'/> 
                </div>
                
                
            </div>}
        </div>
        
    );
}