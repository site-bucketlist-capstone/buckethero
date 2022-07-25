import { useState, useEffect } from "react";
import Picker from 'emoji-picker-react';
import { useDashContext } from "../contexts/dashboard";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import apiClient from "../services/apiClient";


export default function EditList( ) {
   const { list_id } = useParams();
   const { lists } = useDashContext();

   const [form, setForm] = useState({'list_id': list_id, 'name': "", 'emoji_unicode': ""});
   const [isProcessingDelete, setIsProcessingDelete] = useState(false);
   const [isProcessing, setIsProcessing] = useState(false);
   const [error, setError] = useState();
   const [chosenEmojiUnicode, setChosenEmojiUnicode] = useState("")
   const navigate = useNavigate();
   useEffect(() => {
      const setUpForm = () => {
         if (currentList) {
            setForm((f) =>  ({...f, "name": currentList.name}))
            setForm((f) =>  ({...f, "emoji_unicode": currentList.emoji_unicode}))
            setChosenEmojiUnicode(currentList.emoji_unicode);
         }
      }
      let currentList = lists.filter((list) => {
         let id = parseInt(list_id);
         return list.id === id
      });
      currentList = currentList[0];
      setUpForm();
      console.log("inside useEffect");
   }, [lists])
   console.log("form", form);
   const handleOnInputChange = (event) => {
      setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
   }
   const handleOnSubmit = async (e) => {
      e.preventDefault();
      setIsProcessing(true)
      setError((e) => ({ ...e, form: null }))
      const editList = async (form) => {
          const {data, err} = await apiClient.editList(form);
          if (data) {     
              return true;
          } else if (err) {
              return false;
          }
          if (error) {
            setError((e) => ({ ...e, form: error }))
          }
      }
      setIsProcessing(false);
      const res = await editList(form);
      if (res) navigate("/");   
  }

   const handleOnDelete = async ( ) => {
      setIsProcessingDelete(true)
      setError((e) => ({ ...e, form: null }))
      const deleteList = async () => {
         const {data, err} = await apiClient.deleteList(list_id);
         if (data) {     
            return true;
         } else if (err) {
            return false;
         }
         if (error) {
            setError((e) => ({ ...e, form: error }))
         }
      }
      setIsProcessingDelete(false);
      const res = await deleteList();
      if (res) navigate("/");
   }

  // EMOJI CONSTANTS
  //let emoji_unicode = form?.emoji_unicode;
//   const [chosenEmojiUnicode, setChosenEmojiUnicode] = useState(emoji_unicode)
  const [openEmojiBoard, setOpenEmojiBoard] = useState(false)
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmojiUnicode(emojiObject.unified)
    setForm((f) => ({ ...f, ["emoji_unicode"]: emojiObject.unified}))
    setOpenEmojiBoard(false)
    console.log(chosenEmojiUnicode)
  };
  const handleOnEmojiClick = () => {
      setOpenEmojiBoard(true)
  }
  let emojiString = `&#x${chosenEmojiUnicode};`
  
  return (
      <div className='container mx-auto border rounded w-2/3 p-7 h-max flex flex-col justify-between'>
         <div className=''>
            <h2 className='text-xl font-bold'>Edit List</h2>
            <form className="mt-8 space-y-6" onSubmit={handleOnSubmit}>
            <div className='flex flex-row justify-between items-center px-4'>
               <p>Edit List Name:</p>
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
                        placeholder={form.name}
                        />
                     </div>
                  </div>
            </div>
            <div className='flex flex-row items-center px-4'>
               <p className="">Edit List Icon:</p>
               <div className="ml-28 hover:drop-shadow-xl" onClick={handleOnEmojiClick}>
                  <p className="text-6xl cursor-pointer" dangerouslySetInnerHTML={{__html : emojiString}}></p>   
               </div>
            </div>
            <div className=' flex justify-end mt-8'>
                    <button
                        type="submit"
                        onClick={handleOnDelete}
                        className="group relative w-1/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"   >
                        {isProcessingDelete ? "Loading..." : "Delete"}
                    </button>
                    <br />
                    <button
                        type="submit"
                        className="group relative w-1/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"         >
                        {isProcessing ? "Loading..." : "Save"}
                    </button>
            </div>
            </form>           
          </div>      
          {openEmojiBoard ? <Picker onEmojiClick={onEmojiClick}/> : null}
      </div>
      
  )
}

