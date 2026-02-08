import { useState, useEffect } from "react";
import ReactModal from "react-modal";
export default function CalendarNav({date, setDate}){
const [isOpen, setIsOpen] = useState(false)
function nextMonth(){
    setDate(prev => new Date(prev.getFullYear(), prev.getMonth() +1))
} 

function prevMonth(){
    setDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
}

function grabHabits(){
  const habits = {}
  const storedHabits = JSON.parse(localStorage.getItem("habits")) || {}
  if(storedHabits == {}){
    return
  }
  for(let date in storedHabits){
    storedHabits[date].forEach(e => {
      const uppercasedHabit = e.habit.charAt(0).toUpperCase() + e.habit.slice(1)
      if (habits[uppercasedHabit]){
        
        habits[uppercasedHabit] = habits[uppercasedHabit] + 1
      }
      else{
        habits[uppercasedHabit] = 1
      }
    })
  }
  return habits
}
return(
<nav className="navbar fixed-top bg-body-tertiary">
  <div className="container-fluid d-flex justify-content-center m-2 gap-5">
    <button className="btn btn-primary" onClick={prevMonth}>←</button>
    {`  ${date.toLocaleString("en-US", { month: "long" })} ${date.getFullYear()}  `}
    <button className="btn btn-primary" onClick={nextMonth}>→</button>
    <div>
      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>Stats</button>
    </div>
  </div>

  <ReactModal className= "Modal" isOpen={isOpen !== false} onRequestClose={() => {setIsOpen(false);}}  ariaHideApp={false}>
  <div className="d-flex  flex-column h-100 w-100 align-items-center">
    <div className="border">
    <h1>Habit Stats</h1>
    </div>
    <div className="border">
    {Object.entries(grabHabits()).map(([habit, count]) => (
      
      <h1>{habit}: {count}</h1>
    ))}
    </div>
  </div>

  </ReactModal>
</nav>





)

} 