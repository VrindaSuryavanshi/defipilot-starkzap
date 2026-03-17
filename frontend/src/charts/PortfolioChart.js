import {LineChart,Line,XAxis,YAxis} from "recharts"

const data=[
{month:"Jan",value:200},
{month:"Feb",value:450},
{month:"Mar",value:700},
{month:"Apr",value:900}
]

function PortfolioChart(){

return(

<LineChart width={500} height={250} data={data}>

<XAxis dataKey="month"/>
<YAxis/>

<Line type="monotone" dataKey="value" stroke="#2563eb"/>

</LineChart>

)

}

export default PortfolioChart