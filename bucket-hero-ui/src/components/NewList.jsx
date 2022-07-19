import {useState} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import { useAuthContext } from "../contexts/auth";
import {useNavigate} from 'react-router-dom';



export default function NewList({}) {
    const [form, setForm] = useState({'list-name': ""});
    const [isProcessing, setIsProcessing] = useState();

    const handleOnInputChange = (event) => {
    
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        //const res = await loginUser(form);
        console.log("submitted");
        //const nav = await loginUser(form);
        //if (res) navigate("/");
        
    }

    return (
        <div className='container mx-auto border rounded w-2/3 p-7 h-max flex flex-col justify-between'>
            <div className=''>
                <h2 className='text-xl font-bold'>New List</h2>
                <form className="mt-8 space-y-6" >
                <div className='flex flex-row justify-between items-center px-4'>
                    <p>List Name:</p>
                    <div className="rounded-md shadow-sm -space-y-px w-3/4">
                    <div>
                        
                        <input
                        id="list-name"
                        name="list-name"
                        type="text"
                        value={form.name}
                        onChange={handleOnInputChange}
                        required
                        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                        placeholder="My Bucket List"
                        />
                    </div>
                    </div>
                </div>
                </form>
            </div>
            
            <div className=' flex justify-end mt-8'>
              <button
                type="submit"
                className="group relative w-1/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                onClick={handleOnSubmit}
              >
                
                {isProcessing ? "Loading..." : "Save"}
              </button>
            </div>
        </div>
    );
}