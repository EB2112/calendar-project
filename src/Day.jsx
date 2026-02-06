
import "./Month.css"
export default function Day({date, selectedDay}){
    
    const currDate = new Date();
    var border = ""
    
    if (date.toDateString() === currDate.toDateString()){
        border = "red 1px solid"
        
    }
    return(
        <div className="calendar-cell" style={{aspectRatio: "1 / 1", border: border}} onClick={() => selectedDay(date.toDateString())}>
        {date.getDate()}
    </div>
    )
}