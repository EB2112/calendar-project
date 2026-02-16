import {  useEffect, useState } from "react";
import Day from "./Day";
import"./Month.css"
import ReactModal from "react-modal";
export default function Month({date, quickAddHabit}){

const [days, setDays] = useState([])
const [selectedDay, setSelectedDay] = useState(null)
const [event, setEvent]= useState("")
const [eventInput, setEventInput] = useState(false)
const[habitList, setHabitList] = useState(() =>{
    return JSON.parse(localStorage.getItem("habit-list") || "[]")
})
const [habit, setHabit]= useState("")
const [currentHabits, setCurrentHabits] = useState(() =>{
    return JSON.parse(localStorage.getItem('habits') || "{}")
    
})
const [currentEvents, setCurrentEvents] = useState(() =>{
    return JSON.parse(localStorage.getItem('events') || "{}")
    
})
const [habitInput, setHabitInput] = useState(false)
const [habitColor, setHabitColor] = useState("gray")

useEffect(()=>{
    localStorage.setItem("habits", JSON.stringify(currentHabits))
    localStorage.setItem("events", JSON.stringify(currentEvents))
    localStorage.setItem("habit-list", JSON.stringify(habitList))
}, [currentHabits, currentEvents])

useEffect(()=>{
var numDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const year = date.getFullYear()
const month = date.getMonth()
const newDays = Array.from({length: numDays}, (_, i) => {
    const dayDate = new Date(year, month, i + 1)
    return <Day key={formatKey(dayDate)} date={dayDate} selectedDay={setSelectedDay} events={grabEvents(dayDate)} habits={grabHabits(dayDate)}
    />
})

setDays(newDays)
}, [date, currentHabits, currentEvents])

useEffect(() =>{
    
if(selectedDay == null){
    
    return
}
if(quickAddHabit?.habit == "" ||quickAddHabit?.habit == null){
    
    return
}else{
    
    habitQuickAdd(quickAddHabit, selectedDay)
    
}
}, [selectedDay, quickAddHabit])


function addEvent(date){
    if(!eventInput){
        return
    }

const key = formatKey(date)
setCurrentEvents(prev =>{
    const next = {...prev}
    console.log("NEXT",next)
    if(!next[key]){ next[key] = []}

    next[key].push(event)
        
        
    
    return next
})
console.log(currentEvents)
} 
function addhabitToList(habit, color){
    if (!habitList.some(h => h.habit.toLowerCase() == habit.toLowerCase())){
        setHabitList(prev => {
            const newList = [...prev]
            newList.push({habit: habit.toLowerCase(), color: color})

            return newList
        })
        
    }
}
function addHabit(date, habit, color, skip=false){
    if(!skip && !habitInput){
        return
    }
addhabitToList(habit, color)
const key = formatKey(date)
setCurrentHabits(prev =>{
    const next = {...prev}

    if(!next[key]){ next[key] = []}

    next[key] = [
        ...next[key],
        {"habit": habit, "color": color}
    ]
    return next
})
setHabit("")
} 

function habitQuickAdd(quickAddHabit, date){
    const habit = quickAddHabit.habit.charAt(0).toUpperCase() + quickAddHabit.habit.slice(1)
    console.log("habit quick add hit")
    setHabitInput(false)
addHabit(date, habit, quickAddHabit.color, true )
setSelectedDay(null)

}

function deleteHabit(date, habit){
    const key = formatKey(date)
    setCurrentHabits(prev => {
       const next = {...(prev || {})}

        if (!next[key]){return prev}

        next[key] = next[key].filter(h => h.habit !== habit.habit)

        if(next[key].length === 0) {delete next[key]}

        return next
    })
    
}
function deleteEvent(date, event){
    const key = formatKey(date)
    console.log(event)
    setCurrentEvents(prev => {
       const next = {...(prev || {})}

        if (!next[key]){return prev}

        next[key] = next[key].filter(e => e !== event)

        if(next[key].length === 0) {delete next[key]}

        return next
    })
    
}
function formatKey(date){
   const formattedDate = new Date(date)
    return formattedDate.toISOString().split("T")[0]
    
}
function grabEvents(day){
    const key = formatKey(day)
    const events = JSON.parse(localStorage.getItem("events")) || {}
    if(!events[key]){
        return null
    }
   
    return(events[key])
}
function grabHabits(day){
    const key = formatKey(day)
    
    if(!currentHabits[key]){
        return null
    }
    
    return(currentHabits[key])
}
return(
    <div>
        <div className="calendar-grid">
        {days.map((obj) =>{
            return obj
        })}
        </div>
        <ReactModal className= "Modal" isOpen={selectedDay !== null && (quickAddHabit?.habit == "" ||quickAddHabit?.habit == null)} onRequestClose={() => {setSelectedDay(null); setEventInput(false)}}  ariaHideApp={false}>
        
        <div className="h-100">
            <div className="border border-danger h-100 ">
            <div className="d-flex justify-content-center"><h2 >{selectedDay}</h2></div>
            <div className="border mt-5">
                <h1>Events:</h1>
                {selectedDay && grabEvents(selectedDay)?.map((event, i) => (
                    <div key={i}>
                    {event}<span><button className="btn" onClick={()=>deleteEvent(selectedDay, event)}>❌</button></span>
                    </div>
                ))}
                {eventInput && <div><input type="text" id="event" value={event} onChange={e => {setEvent(e.target.value)}}/></div>}
                <button className="btn btn-primary" onClick={() => {setEventInput(!eventInput); addEvent(selectedDay)}}>{eventInput ? "Submit" : "Add Event"}</button>
            </div>
            <div className="border mt-5">
                <h1>Habits:</h1>
                {selectedDay && grabHabits(selectedDay)?.map((habit, i) => (
                    <div key={i}>
                    <h4><span className="dot" style={{backgroundColor: habit.color}}></span>{habit.habit}<button className="btn" onClick={()=>deleteHabit(selectedDay, habit)}>❌</button></h4>
                    
                    </div>
                ))}
                {habitInput && <div>
                    <input type="text" id="habit" value={habit} onChange={e => {setHabit(e.target.value)}}/>
                    <label htmlFor="colorPicker">Choose color: </label>
                    <select name="colorPicker" id="colorPicker" value={habitColor} onChange={e =>{setHabitColor(e.target.value)}}>
                        <option value="gray" >Gray</option>
                        <option value="red">Red</option>
                        <option value="orange">Orange</option>
                        <option value="yellow">Yellow</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                        <option value="indigo">Indigo</option>
                        <option value="violet">Violet</option>
                    </select>
                    </div>}
                <button className="btn btn-primary" onClick={() => {setHabitInput(!habitInput); addHabit(selectedDay, habit, habitColor)}}>{habitInput ? "Submit" : "Add Habit"}</button>
            </div>
            <div className="footer border border-success h-100" >
                <button className="btn btn-primary" onClick={() => setSelectedDay(null)}>CLOSE</button>
            </div>
            </div>
        </div>
        
        </ReactModal>
    </div>
)
}