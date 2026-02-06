import { useEffect, useState } from "react";
import CalendarNav from "./CalendarNav";
import Month from "./Month";
export default function Calendar(){
const [date, setDate] = useState(() => new Date())

   
return(
    <>
        <CalendarNav date={date} setDate={setDate}/>
         <div className="mt-5 pt-5">
            <Month date={date}/>
            </div>
        
    </>
)

}