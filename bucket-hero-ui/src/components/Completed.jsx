import { useDashContext } from "../contexts/dashboard";

export default function Completed({completed}) {
    const {lists} = useDashContext();
    function withinMonth() {
        //count the number of completed items that are within the current month so start and end of the month
        let monthCount = 0;
        

    }

    function withinYear() {
        //count the num of completed items that are within start and end of current year
    }
    return (
        <div className=''>
            <h3>Completed Items</h3>
            
            {
                lists.map((list) => {
                   return (
                   <div key={list.id}>
                       {list.name}
                       {completed.map((item) => {if (item.list_id === list.id) return <div key={item.id}>{item.name}</div>})}
                   </div>)
                })
            }
        </div>
    );
}