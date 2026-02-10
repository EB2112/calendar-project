import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import HeatMap from "./Heatmap";
export default function CalendarNav({date, setDate}){
const [isOpen, setIsOpen] = useState(false)
const [habitList, setHabitList] = useState([])
const [chosenHabit, setChosenHabit] = useState('')
function nextMonth(){
    setDate(prev => new Date(prev.getFullYear(), prev.getMonth() +1))
} 

function prevMonth(){
    setDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
}

function grabHabitList(){
  const habitList = []
  const storedhabitList = JSON.parse(localStorage.getItem('habit-list')) || []

  storedhabitList.map((h) => {
    habitList.push(h.charAt(0).toUpperCase() + h.slice(1))
  })
  
return habitList
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

function hasHabit(habitObj, date, habitName){
  return habitObj[date]?.some(
    h => h.habit.toLowerCase() === habitName.toLowerCase()
  ) || false
}

function createHeatMap(habit){
  console.log(habit)
  const heatmap= {}
  
  let dateIterator = new Date("January 1 2026")
  console.log(dateIterator.toISOString())
  const storedHabits = JSON.parse(localStorage.getItem('habits')) || {}
  

  for(let i = 0; i < 365; i++){
    const formattedDate = dateIterator.toISOString().split("T")[0]
    
    heatmap[formattedDate] =hasHabit(storedHabits, formattedDate, habit)
    dateIterator = new Date(dateIterator.getFullYear(), dateIterator.getMonth(), dateIterator.getDate() + 1)
   
  }

  return heatmap

}

return(
<nav className="navbar fixed-top bg-body-tertiary">
  <div className="container-fluid d-flex justify-content-center m-2 gap-5">
    <button className="btn btn-primary" onClick={prevMonth}>←</button>
    {`  ${date.toLocaleString("en-US", { month: "long" })} ${date.getFullYear()}  `}
    <button className="btn btn-primary" onClick={nextMonth}>→</button>
    <div>
      <button className="btn btn-primary" onClick={() => setIsOpen(!isOpen)}>Stats</button>
    </div>
  </div>

  <ReactModal className= "Modal" isOpen={isOpen !== false} onAfterOpen={() => setHabitList(grabHabitList)} onRequestClose={() => {setIsOpen(false);}}  ariaHideApp={false}>
  <div className="d-flex flex-column h-100 w-100 align-items-center">
    <div className="border">
    <h1>Habit Stats</h1>
    </div>
    <div className="border w-100">
      <h1>Habit Totals:</h1>
    <div className="border">
    {Object.entries(grabHabits()).map(([habit, count]) => (
      
      <h1>{habit}: {count}</h1>
    ))}
    </div>
    </div>
    <h1>Days completed for: <select name="habitSelect" id="habitSelect" onChange={(e) => {setChosenHabit(e.target.value)}} >
      <option value="" selected>Select Habit</option>
      {habitList.map((h) => {
        return <option value={h}>{h}</option>
      })}
      </select> </h1>
    <HeatMap heatmap={createHeatMap(chosenHabit)}/>
  </div>

  </ReactModal>
</nav>





)

} 