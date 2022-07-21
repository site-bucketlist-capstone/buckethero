import {useState} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import { useDashContext } from "../contexts/dashboard";
import {useNavigate} from 'react-router-dom';
import Picker from 'emoji-picker-react';



export default function NewList({}) {
    const [form, setForm] = useState({'name': "", 'emoji_unicode': ""});
    const navigate = useNavigate();

    const {lists, 
        setLists, 
        initialized, 
        setInitialized,
        isProcessing,
        setIsProcessing,
        error,
        setError,
        newList} = useDashContext();

    const handleOnInputChange = (event) => {
    
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const res = await newList(form);
        console.log("submitted");
        if (res) navigate("/");
        
    }

    //transfer all this to dashcontext
    const [chosenEmoji, setChosenEmoji] = useState({
        activeSkinTone: "", 
        emoji: "", 
        names: [], 
        originalUnified: "", 
        unified: "1f4d4"
    });

    const [openEmojiBoard, setOpenEmojiBoard] = useState(false)

    const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject)
      setOpenEmojiBoard(false)
      console.log(chosenEmoji)
    };

    const handleOnEmojiClick = () => {
        setOpenEmojiBoard(true)
    }


    let emojiString = `&#x${chosenEmoji.unified};`

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
                        id="name"
                        name="name"
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
                <div className='flex flex-row justify-between items-center px-4'>
                    <p>List Icon:</p>
                    <div className="rounded-md shadow-sm -space-y-px w-3/4">
                    <div>
                        
                        <input
                        id="emoji_unicode"
                        name="emoji_unicode"
                        type="text"
                        value={form.emoji_unicode}
                        onChange={handleOnInputChange}
                        required
                        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                        placeholder="Emoji Unicode"
                        />
                    </div>
                    </div>
                </div>
                <div className='flex flex-row items-center px-4'>
                    <p className="">List Emoji:</p>
                    <div className="ml-10 hover:bg-orange-200" onClick={handleOnEmojiClick}>
                        <p className="text-6xl" dangerouslySetInnerHTML={{__html : emojiString}}></p>
                    </div>
                </div>
                </form>
            </div>
            {openEmojiBoard ? <Picker onEmojiClick={onEmojiClick}/> : null}

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