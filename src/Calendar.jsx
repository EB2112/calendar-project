import { useEffect, useState } from "react";
import CalendarNav from "./CalendarNav";
import Month from "./Month";
export default function Calendar(){
const [date, setDate] = useState(() => new Date())
const [quickAddHabit, setQuickAddHabit] = useState(null)
return(
    <>
        <CalendarNav date={date} setDate={setDate} setQuickAddHabit={setQuickAddHabit}/>
         <div className="mt-5 pt-5">
            <Month date={date} quickAddHabit={quickAddHabit}/>
            </div>
        
    </>
)

}