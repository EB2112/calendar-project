import { useState, useEffect } from "react";
export default function CalendarNav({date, setDate}){

function nextMonth(){
    setDate(prev => new Date(prev.getFullYear(), prev.getMonth() +1))
} 

function prevMonth(){
    setDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
}
return(
<nav className="navbar fixed-top bg-body-tertiary">
  <div className="container-fluid d-flex justify-content-center m-3 gap-5">
    <button className="btn btn-primary" onClick={prevMonth}>←</button>
    {`  ${date.toLocaleString("en-US", { month: "long" })} ${date.getFullYear()}  `}
    <button className="btn btn-primary" onClick={nextMonth}>→</button>
    
  </div>
</nav>





)

} 