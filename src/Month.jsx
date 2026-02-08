import {  useEffect, useState } from "react";
import Day from "./Day";
import"./Month.css"
import ReactModal from "react-modal";
export default function Month({date}){
const [days, setDays] = useState([])
const [selectedDay, setSelectedDay] = useState(null)
const [event, setEvent]= useState("")
const [eventInput, setEventInput] = useState(false)
const [habit, setHabit]= useState("")
const [habitInput, setHabitInput] = useState(false)
const [habitColor, setHabitColor] = useState("")
useEffect(()=>{
    

var numDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const year = date.getFullYear()
const month = date.getMonth()
console.log(numDays)
const newDays = Array.from({length: numDays}, (_, i) => {
    const dayDate = new Date(year, month, i + 1)
    return <Day key={formatKey(dayDate)} date={dayDate} selectedDay={setSelectedDay} events={grabEvents(dayDate)} habits={grabHabits(dayDate)}/>
})

setDays(newDays)
}, [date])


function addEvent(date){
    if(!eventInput){
        return
    }

const key = formatKey(date)

const storedEvents = JSON.parse(localStorage.getItem("events")) || {}

if(!storedEvents[key]){
    storedEvents[key] = []
}
storedEvents[key].push(event)

localStorage.setItem("events", JSON.stringify(storedEvents))
setEvent("")
} 
function addHabit(date){
    if(!habitInput){
        return
    }

const key = formatKey(date)

const storedHabits = JSON.parse(localStorage.getItem("habits")) || {}

if(!storedHabits[key]){
    storedHabits[key] = []
}
storedHabits[key].push({"habit": habit, "color": habitColor})
console.log(storedHabits[key])
localStorage.setItem("habits", JSON.stringify(storedHabits))
setHabit("")
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
    const habits = JSON.parse(localStorage.getItem("habits")) || {}
    if(!habits[key]){
        return null
    }
    
    return(habits[key])
}
return(
    <div>
        <div className="calendar-grid">
        {days.map((obj) =>{
            return obj
        })}
        </div>
        <ReactModal className= "Modal" isOpen={selectedDay !== null} onRequestClose={() => {setSelectedDay(null); setEventInput(false)}}  ariaHideApp={false}>
        
        <div className="h-100">
            <div className="border border-danger h-100 ">
            <div className="d-flex justify-content-center"><h2 >{selectedDay}</h2></div>
            <div className="border mt-5">
                <h1>Events:</h1>
                {selectedDay && grabEvents(selectedDay)?.map((event, i) => (
                    <div key={i}>
                    {event}
                    </div>
                ))}
                {eventInput && <div><input type="text" id="event" value={event} onChange={e => {setEvent(e.target.value)}}/></div>}
                <button className="btn btn-primary" onClick={() => {setEventInput(!eventInput); addEvent(selectedDay)}}>{eventInput ? "Submit" : "Add Event"}</button>
            </div>
            <div className="border mt-5">
                <h1>Habits:</h1>
                {selectedDay && grabHabits(selectedDay)?.map((habit, i) => (
                    <div key={i}>
                    <h4><span className="dot" style={{backgroundColor: habit.color}}></span>{habit.habit}</h4>
                    </div>
                ))}
                {habitInput && <div>
                    <input type="text" id="habit" value={habit} onChange={e => {setHabit(e.target.value)}}/>
                    <label htmlFor="colorPicker">Choose color: </label>
                    <select name="colorPicker" id="colorPicker" value={habitColor} onChange={e =>{setHabitColor(e.target.value)}}>
                        <option value="gray" selected>Gray</option>
                        <option value="red">Red</option>
                        <option value="orange">Orange</option>
                        <option value="yellow">Yellow</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                        <option value="indigo">Indigo</option>
                        <option value="violet">Violet</option>
                    </select>
                    </div>}
                <button className="btn btn-primary" onClick={() => {setHabitInput(!habitInput); addHabit(selectedDay)}}>{habitInput ? "Submit" : "Add Habit"}</button>
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