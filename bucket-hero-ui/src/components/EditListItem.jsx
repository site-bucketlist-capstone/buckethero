import apiClient from '../services/apiClient';
import { useDashContext } from '../contexts/dashboard';
import { MinusIcon, TrashIcon, XIcon, ExclamationIcon, ClockIcon, BookmarkIcon, LocationMarkerIcon, CurrencyDollarIcon } from '@heroicons/react/outline'

export default function EditListItem({item, getItems}) {
   const {selected, editItem, setModalOpen, editItemModal, setEditItemModal, setItems } = useDashContext();
    
   const handleClick = async (event) => {
      //edit item
      event.stopPropagation();
      const form = {list_id: selected, item_id: item.id, is_completed: !item.is_completed}
      const data = await editItem(form);
      await getItems(item.list_id);
   }

   // handles when user clicks delete for an item
   const handleOnDeleteItem = async () => {
      const deleteItem = async () => {
         const {data, err} = await apiClient.deleteItem(item.list_id, item.id);
         if (data) {     
            return true;
         } else if (err) {
            return false;
         }
      }
      await deleteItem();
      await getItems(item.list_id);
      return;
   }

   function formatDate(date) {
      if (date) return new Date(date).toDateString();
      else return null;
   }
    return (
        <div className='rounded bg-slate-100 flex flex-row sm:items-center justify-around p-2 mb-2' > {/* onClick={(e) => handleEdit(e)} */}
            <div className='rounded border-2 border-red-600 h-full'>
               <XIcon className='h-5 w-5 text-red-600 cursor-pointer' onClick={handleOnDeleteItem}/>
            </div>
            {item?.is_completed ? 
            <div className='w-3/4 sm:flex sm:w-3/4 sm:justify-between'><div className=' w-full self-center flex flex-row mr-4 text-xl font-semibold sm:w-1/3 text-slate-600'>
            
            {item?.name}
            </div>
        <div className='flex flex-col sm:w-1/2 sm:justify-center'>
            <div className='sm:flex sm:flex-row'>
                <div className='flex flex-row sm:w-1/2 text-gray-400 mb-2 sm:mb-0'>
                    <ClockIcon className='text-gray-400 h-6 w-6 mr-2'/>
                    {formatDate(item?.due_date)}
                </div>
                <div className='flex flex-row sm:w-1/2 text-gray-400 mb-2 sm:mb-0'>
                    <BookmarkIcon className='text-gray-400 h-6 w-6 mr-2'/>
                    {item?.category}
                </div>
            </div>
            <div className='sm:flex sm:flex-row'>
                <div className='flex flex-row sm:w-1/2 text-gray-400 mb-2 sm:mb-0'>
                    <LocationMarkerIcon className='text-gray-400 h-6 w-6 mr-2'/>
                    {item?.location}
                </div>
                <div className='flex flex-row sm:w-1/2 text-gray-400 mb-2 sm:mb-0'>
                    <CurrencyDollarIcon className='text-gray-400 h-6 w-6 mr-2'/>
                    {item?.price_point}
                </div>
            </div>
        </div></div> : <div className='w-3/4 sm:flex sm:w-3/4 sm:justify-between'><div className=' w-full self-center flex flex-row mr-4 text-xl font-semibold sm:w-1/3 text-purple-800'>
                
                {item?.name}
            </div>
            <div className='flex flex-col sm:w-1/2  sm:justify-center'>
                <div className='sm:flex sm:flex-row'>
                    <div className='flex flex-row sm:w-1/2 text-gray-600 mb-2 sm:mb-0'>
                        <ClockIcon className='text-gray-500 h-6 w-6 mr-2'/>
                        {formatDate(item?.due_date)}
                    </div>
                    <div className='flex flex-row sm:w-1/2 text-gray-600 mb-2 sm:mb-0'>
                        <BookmarkIcon className='text-gray-500 h-6 w-6 mr-2'/>
                        {item?.category}
                    </div>
                </div>
                <div className='sm:flex sm:flex-row'>
                    <div className='flex flex-row sm:w-1/2 text-gray-600 mb-2 sm:mb-0'>
                        <LocationMarkerIcon className='text-gray-500 h-6 w-6 mr-2'/>
                        {item?.location}
                    </div>
                    <div className='flex flex-row sm:w-1/2 text-gray-600 mb-2 sm:mb-0'>
                        <CurrencyDollarIcon className='text-gray-500 h-6 w-6 mr-2'/>
                        {item?.price_point}
                    </div>
                </div>
            </div></div>}
            <div className='' onClick={(e) => handleClick(e)}>
                {item?.is_completed ? <ion-icon name="checkbox-outline" style={{color: "#a855f7", "--ionicon-stroke-width": "44px", cursor: "pointer"}} size="large" className='text-purple-400'></ion-icon> : <div className='border w-7 border-4 h-7 mb-1 mr-1 rounded border-purple-400 cursor-pointer'></div>}
            </div>
            
        </div>
        
    );
}
