import {useState} from 'react';
import apiClient from '../services/apiClient';
import Logo from "../assets/BH.png";
import { useDashContext } from "../contexts/dashboard";
import {useNavigate} from 'react-router-dom';
import Picker from 'emoji-picker-react';



export default function NewList({}) {
    const [form, setForm] = useState({'name': "", 'emoji_unicode': "1f92f"});
    const navigate = useNavigate();
    const [errorEmoji, setErrorEmoji] =  useState("");

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
        console.log("emoji: ", chosenEmojiUnicode) 
        console.log(form)

        const res = await newList(form);
        console.log("submitted");
        if (res) navigate("/");
        
    }

    //transfer all this to dashcontext
    const [chosenEmojiUnicode, setChosenEmojiUnicode] = useState("1f92f")

    const [openEmojiBoard, setOpenEmojiBoard] = useState(false)

    const onEmojiClick = (event, emojiObject) => {
      setErrorEmoji("");
      setChosenEmojiUnicode(emojiObject.unified)
      if (emojiObject.unified.length > 6) {
        let result = chosenEmojiUnicode.slice(0, 6);
        setChosenEmojiUnicode(result);
        setErrorEmoji("Emoji unavaible, please pick another one");
        return;
      }
      setForm((f) => ({ ...f, ["emoji_unicode"]: emojiObject.unified}))
      setOpenEmojiBoard(false)
      
    };
    const handleOnEmojiClick = () => {
        setOpenEmojiBoard(true)
    }
    let emojiString = `&#x${chosenEmojiUnicode};`

    return (
        <div className='mt-20 container mx-auto border rounded sm:w-2/3 p-7 h-max flex flex-col justify-between'>
            <div className=''>
                <h2 className='text-xl font-bold'>New List</h2>
                <form className="mt-8 space-y-6" onSubmit={handleOnSubmit}>
                <div className='sm:flex sm:flex-row justify-between items-center px-4'>
                    <p className='sm:w-1/4'>List Name:</p>
                    <div className="z-50 rounded-md -space-y-px w-3/4">
                    <div className=''>
                        
                        <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleOnInputChange}
                        required
                        className="appearance-none rounded  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                        placeholder="My Bucket List"
                        />
                    </div>
                    </div>
                </div>
                <div className='sm:flex sm:flex-row items-center px-4'>
                    <p className="sm:w-1/4">List Icon:</p>
                    <div className="hover:drop-shadow-xl" onClick={handleOnEmojiClick}>
                        <p className="text-6xl cursor-pointer" dangerouslySetInnerHTML={{__html : emojiString}}></p>
                    </div>
                </div>
                <div className=' flex justify-end mt-8'>
                    <button
                        type="submit"
                        className="group relative w-1/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        
                    >
                
                        {isProcessing ? "Loading..." : "Save"}
                    </button>
                </div>
                </form>
            </div>
            <span className="text-red-500">{errorEmoji ? errorEmoji : <></>}</span>
            
            {openEmojiBoard ? <Picker onEmojiClick={onEmojiClick}/> : null}

            
        </div>
    );
}