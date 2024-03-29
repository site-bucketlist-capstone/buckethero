import { useDashContext } from "../contexts/dashboard";
import ListItemComp from "./ListItemComp";

export default function Completed({completed, isPublic}) {
    const {lists} = useDashContext();
    function withinMonth() {
        //count the number of completed items that are within the current month so start and end of the month
        let monthCount = 0;
        

    }

    function withinYear() {
        //count the num of completed items that are within start and end of current year
    }
    
    return (
        <div className='mt-4 flex flex-col items-center sm:px-12 mb-8 '>
            <div className="bg-slate-100 p-6 sm:w-1/2 flex flex-col rounded items-center">
                { isPublic ? <p className="text-lg font-semibold">Number of list items:</p> : 
                <p className="text-lg font-semibold">Number of completed items:</p>
                }
                <p className="text-3xl font-bold">{completed.length}</p>
            </div>
            { isPublic ?          
                    <div className='border p-2 rounded w-full mt-4'>
                       { completed.map((item) => {return <div key={item.id}><ListItemComp item={item} isPublic={true}/></div>}) }
                    </div>
                :
                lists.map((list) => {
                   return (
                   <div key={list.id} className='border p-2 rounded w-full mt-4'>
                       <div className="flex flex-row">
                            {list.emoji_unicode ? <p className='mr-2 text-xl' dangerouslySetInnerHTML={{__html : `&#x${list.emoji_unicode};`}}></p> : null} 
                            <p className="text-lg font-semibold">{list.name}</p>
                       </div>
                       {completed.map((item) => {if (item.list_id === list.id) return <div key={item.id}><ListItemComp item={item}/></div>})}
                   </div>)
                })
            }
        </div>
    );
}