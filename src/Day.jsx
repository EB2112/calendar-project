
import "./Month.css"
import "balloon-css"
export default function Day({date, events, habits, selectedDay, quickAddHabit, quickAddFn}){
    
    const currDate = new Date();
    var border = ""
    
    if (date.toDateString() === currDate.toDateString()){
        border = "red 1px solid"
        
    }

    function eventFiller(events){
        const eventList = []
        if(!events){
            return []
        }
        for(let event of events){
            eventList.push(<li>{event}</li>)
        }
        return eventList
    }
    function habitFiller(habits){
        const habitList = []
        if(!habits){
            return []
        }
        for(let habit of habits){
            habitList.push(habit)
        }
        return habitList
    }
  
  

    return(
        <div className="calendar-cell" style={{aspectRatio: "1 / 1", border: border}} onClick={() => {selectedDay(date.toDateString())}}>
        {date.getDate()}
        <div className="d-flex justify-content-end ">{habitFiller(habits).map((e) => {
            return<span className="dot" aria-label={e.habit} data-balloon-pos="up" style={{backgroundColor: e.color}}></span>
        })}</div>
        <div className="mt-3">
        {events && <h3>Events:</h3>}
        <ul>
            {eventFiller(events).map((e) =>{
                return e
            })}
        </ul>
        </div>
        
    </div>
    )
}