import {useState, useEffect} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import ListColComp from './ListColComp';
import { useDashContext } from "../contexts/dashboard";
import {useNavigate} from 'react-router-dom';



export default function ListCol({}) {
    const navigate = useNavigate();
    const {lists, selected, setSelected, setBlTitle} = useDashContext();

    useEffect(() => {
        if(!selected){
            setSelected(lists[0]?.id);
        }
    }, [])
    //const [selected, setSelected] = useState(lists[0].id);

    return (
        <div className='border border-purple-500 w-1/3 mr-4 p-2 h-full p-2'>
            <div className='flex flex-row w-full justify-between mb-4'>
                <h2 className='text-xl'>list col</h2>
                <button className='border border-violet-500 rounded' onClick={() => navigate('/newlist')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                </button>
            </div>
            {lists?.map((list) => <div key={list.id}><ListColComp setSelected={setSelected} selected={selected} name={list.name} setBlTitle={setBlTitle} id={list.id}/></div>)}
        </div>
    );
}