import { useState, useEffect, Fragment, useRef } from "react";
import Picker from 'emoji-picker-react';
import { useDashContext } from "../contexts/dashboard";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import apiClient from "../services/apiClient";
import EditListItem from "./EditListItem";
import { ExclamationIcon } from '@heroicons/react/outline'
import { useAuthContext } from "../contexts/auth";
import { Dialog, Transition } from '@headlessui/react'

// takes user to seperate page that 
// allows the user to edit list or delete list or delete lsit items
export default function EditList( ) {
   // parameters to fetch Id and needed variable from dashboard context
   const { list_id } = useParams();
   const { lists, fetchLists, fetchComingUp, fetchListItems } = useDashContext();
   const { fetchUserFromToken } = useAuthContext();
   const [itemsList, setItemsList] = useState([]);
   //form to send to apiclient to edit list
   const [form, setForm] = useState({'list_id': list_id, 'name': "", 'emoji_unicode': ""});

   // state variables for handler functions
   const [isProcessingDelete, setIsProcessingDelete] = useState(false);
   const [isProcessing, setIsProcessing] = useState(false);
   const [error, setError] = useState();
   const [open, setOpen] = useState(false);
   
   // state varible to hold emoji_unicode
   const [chosenEmojiUnicode, setChosenEmojiUnicode] = useState("")
   const navigate = useNavigate();

   //finds current list needed to be edit and populates form with old information
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
      getItems(list_id);
   }, [lists]);

   // hanldes input change of form
   const handleOnInputChange = (event) => {
      setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
   }

   // fetches new list of items
   const getItems = async (id) => {
      const result = await fetchListItems(id);
      if (result) {
          await setItemsList(result.result);
      }
      return;
  }

   // handles when user submits save
   const handleOnSubmit = async (e) => {
      e.preventDefault();
      setIsProcessing(true)
      setError((e) => ({ ...e, form: null }))
      const editList = async (form) => {
          const {data, err} = await apiClient.editList(form);
          if (data) {     
              return true;
          } else if (err) {
            setError((e) => ({ ...e, form: error }))
            return false;
          }
      }
      setIsProcessing(false);
      const res = await editList(form);
      await fetchLists();
      await fetchComingUp();
      await fetchListItems(list_id);
      if (res) navigate("/");   
  }

   // handles when user clicks delete
   const handleOnDelete = async (e) => {
      e.preventDefault();
      setIsProcessingDelete(true)
      setError((e) => ({ ...e, form: null }))
      const deleteList = async () => {
        const {data, err} = await apiClient.deleteList(list_id);
        if (data) {     
          return true
        } else if (err) {
          // console.log(err);
          setError((e) => ({ ...e, form: err }))
          return false;
        }
        // console.log("INSIDEEEEE")
      }
      setIsProcessingDelete(false);  
      const res = await deleteList();
      await fetchLists()
      await fetchComingUp();
      await fetchListItems(list_id);
      await fetchUserFromToken();
      if (res) navigate("/");
   }

   // will togle delete modal open and close
   const openModal = () => {
      setOpen(!open);
   }

   // EMOJI CONSTANTS
   // let emoji_unicode = form?.emoji_unicode;
   const [openEmojiBoard, setOpenEmojiBoard] = useState(false)
   const onEmojiClick = (event, emojiObject) => {
      setChosenEmojiUnicode(emojiObject.unified);
      setForm((f) => ({ ...f, ["emoji_unicode"]: emojiObject.unified}));
      setOpenEmojiBoard(false);
   };
   const handleOnEmojiClick = () => {
         setOpenEmojiBoard(true);
   }
   let emojiString = `&#x${chosenEmojiUnicode};`;
  
  return (
      <div className='container mx-auto border rounded sm:w-2/3 p-7 h-max flex flex-col justify-between'>
         { open ? <Modal handleOnDelete={handleOnDelete} open={open} setOpen={setOpen}/> :
         <div className=''>
            <h2 className='text-xl font-bold'>Edit List</h2>
            <form className="mt-8 space-y-6" onSubmit={handleOnSubmit}>

            <div className='sm:flex sm:flex-row justify-between items-center px-4'>
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
            <div className='sm:flex sm:flex-row items-center px-4'>
               <p className="sm:w-1/4">Edit List Icon:</p>
               <div className="hover:drop-shadow-xl" onClick={handleOnEmojiClick}>
                  <p className="text-6xl cursor-pointer" dangerouslySetInnerHTML={{__html : emojiString}}></p>   
               </div>
            </div>
            {openEmojiBoard ? <Picker onEmojiClick={onEmojiClick}/> : null}
            <div>
               {itemsList.length  > 0 ? itemsList.map((item) => {
                return <div key={item.id}><EditListItem item={item} getItems={getItems} /></div> 
            }) : <></> }
            </div>
            <div className=' flex justify-end mt-8'>
                    <button
                        
                        onClick={openModal}
                        className="group relative mr-4 w-1/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"   >
                        {isProcessingDelete ? "Loading..." : "Delete"}
                    </button>
                    <br />
                    <button
                        type="submit"
                        className="group relative mr-4 w-1/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"         >
                        {isProcessing ? "Loading..." : "Save"}
                    </button>
            </div>       
            </form>           
          </div>      
            }
      </div>
      
  )
}

function Modal({handleOnDelete, open, setOpen}) {

   const cancelButtonRef = useRef(null);
    
   return (
     <Transition.Root show={open} as={Fragment}>
       <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
         <Transition.Child
           as={Fragment}
           enter="ease-out duration-300"
           enterFrom="opacity-0"
           enterTo="opacity-100"
           leave="ease-in duration-200"
           leaveFrom="opacity-100"
           leaveTo="opacity-0"
         >
           <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
         </Transition.Child>
 
         <div className="fixed z-10 inset-0 overflow-y-auto">
           <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
             <Transition.Child
               as={Fragment}
               enter="ease-out duration-300"
               enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
               enterTo="opacity-100 translate-y-0 sm:scale-100"
               leave="ease-in duration-200"
               leaveFrom="opacity-100 translate-y-0 sm:scale-100"
               leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
             >
               <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                 <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                   <div className="sm:flex sm:items-start">
                     <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                       <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                     </div>
                     <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                       <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                         Delete List
                       </Dialog.Title>
                       <div className="mt-2">
                         <p className="text-sm text-gray-500">
                           Are you sure you want to delete your list? All of your data will be permanently
                           removed. This action cannot be undone.
                         </p>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                   <button
                     type="button"
                     className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                     onClick={(e) => handleOnDelete(e)}
                   >
                     Delete
                   </button>
                   <button
                     type="button"
                     className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                     onClick={() => setOpen(!open)}
                     // onClick={() =>  handleOnDelete()}
                     ref={cancelButtonRef}
                   >
                     Cancel
                   </button>
                 </div>
               </Dialog.Panel>
             </Transition.Child>
           </div>
         </div>
       </Dialog>
     </Transition.Root>
   )
}


