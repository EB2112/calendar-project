import "./Heatmap.css"

export default function HeatMap({heatmap}){
function heatmapToArray(heatmap){
    return Object.entries(heatmap).map(([date, completed]) =>({
        date, completed
    }))

}
const heatCells = heatmapToArray(heatmap)

return(
    <div className="heatmap-grid">
        {heatCells.map(({date, completed}) =>(
            <div key={date} className={`heatmap-cell ${completed ? "active" : ""}`} title={date}></div>
        ))}

    </div>
)
}