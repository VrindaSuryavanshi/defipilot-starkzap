import React,{useEffect,useState} from "react";
import axios from "axios";

function AIPoolRanking(){

const [pools,setPools] = useState([]);
const API_URL = import.meta.env.VITE_API_URL;
useEffect(()=>{

axios.get(`${API_URL}/pools/ai-pools`)
.then(res=>{

const sorted = res.data.sort((a,b)=>b.score-a.score);

setPools(sorted);

})
.catch(err=>console.log(err));

},[])

const rankIcon = (index)=>{
if(index===0) return "🥇";
if(index===1) return "🥈";
if(index===2) return "🥉";
return "⭐";
}

if(pools.length===0){

return(
<div className="bg-white rounded-lg shadow p-4">
Loading AI pool ranking...
</div>
)

}

return(

<div className="bg-white rounded-xl shadow p-4">

<h2 className="font-bold text-lg mb-3">
🧠 AI Pool Ranking
</h2>

<div className="space-y-2">

{pools.map((pool,index)=>(

<div
key={pool.id}
className={`p-3 rounded-lg border flex justify-between items-center
${index===0 ? "bg-blue-50 border-blue-300" : "bg-gray-50"}
`}
>

<div>

<div className="flex items-center gap-2">

<span className="text-lg">
{rankIcon(index)}
</span>

<span className="font-semibold text-gray-800">
{pool.token}
</span>

{index===0 && (
<span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">
AI BEST
</span>
)}

</div>

<div className="flex gap-3 text-xs text-gray-500 mt-1">

<span>
APR <b className="text-green-600">{pool.apr}%</b>
</span>

<span>
Risk {pool.risk}
</span>

</div>


<div className="w-40 bg-gray-200 rounded-full h-1.5 mt-1">

<div
className="bg-green-500 h-1.5 rounded-full"
style={{width:`${pool.apr}%`}}
></div>

</div>

</div>


<div className="text-right">

<p className="text-xs text-gray-500">
AI Score
</p>

<p className="font-bold text-blue-600">
{pool.score}
</p>

</div>

</div>

))}

</div>

</div>

)

}

export default AIPoolRanking;