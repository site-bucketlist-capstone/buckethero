import {useState, useEffect} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import ListColComp from './ListColComp';
import { useDashContext } from "../contexts/dashboard";
import {useNavigate} from 'react-router-dom';



export default function ListCol({}) {
    const navigate = useNavigate();
    const {lists, selected, setSelected, setBlTitle, setModalOpen} = useDashContext();

    useEffect(() => {
        if(!selected || selected !== lists[0]?.id){
            setSelected(lists[0]?.id);
        }
    }, [])
    //const [selected, setSelected] = useState(lists[0].id);

    return (
        <div className='sm:w-1/3 sm:mr-4 p-2 py-4 sm:h-full p-2 sm:border-r-2 bg-slate-50 rounded'>
            <div className='flex flex-row items-center w-full justify-between mb-4 mt-2'>
                <h2 className='text-xl font-semibold'>Your Lists</h2>
                <div className='justify-self-end flex items-center'>
                    <button className='flex bg-orange-400 rounded p-1' onClick={() => navigate('/newlist')}>
                        <p className='text-white'>Add</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>
            {lists?.map((list) => <div key={list.id}><ListColComp setSelected={setSelected} selected={selected} name={list.name} emojiUnicode={list.emoji_unicode} setBlTitle={setBlTitle} id={list.id}/></div>)}
        </div>
    );
}