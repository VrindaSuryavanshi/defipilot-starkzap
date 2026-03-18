import React, { useEffect, useState } from "react";
import { getRecommendation } from "../services/api";

function Recommendation() {

const [pool,setPool] = useState(null);

useEffect(()=>{
getRecommendation().then(res=>{
setPool(res.data);
});
},[])

if(!pool) return(
<div className="bg-white shadow rounded-lg p-4">
Loading AI recommendation...
</div>
)

const yearlyProfit = (1000 * pool.apr) / 100;
const monthlyProfit = yearlyProfit / 12;

const riskColor = ()=>{
if(pool.risk <= 3) return "bg-green-500";
if(pool.risk <= 6) return "bg-yellow-400";
return "bg-red-500";
};

const riskLabel = ()=>{
if(pool.risk <= 3) return "Low Risk";
if(pool.risk <= 6) return "Medium Risk";
return "High Risk";
};

return(

<div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-lg shadow">

<h2 className="text-lg font-bold mb-2">
🤖 AI Investment Advisor
</h2>

<div className="flex justify-between mb-2">

<div>
<p className="text-xs opacity-80">Pool</p>
<h3 className="text-lg font-semibold">
{pool.token}
</h3>
</div>

<div className="text-right">
<p className="text-xs opacity-80">APR</p>
<h3 className="text-lg font-semibold text-green-300">
{pool.apr}%
</h3>
</div>

</div>

<div className="mb-2">

<p className="text-xs mb-1">Yield Strength</p>

<div className="w-full bg-white/30 rounded-full h-2">

<div
className="bg-green-400 h-2 rounded-full"
style={{width:`${pool.apr}%`}}
></div>

</div>

</div>

<div className="mb-2">

<div className="flex justify-between text-xs mb-1">
<span>Risk Level</span>
<span>{riskLabel()}</span>
</div>

<div className="w-full bg-white/30 rounded-full h-2">

<div
className={`${riskColor()} h-2 rounded-full`}
style={{width:`${pool.risk * 10}%`}}
></div>

</div>

</div>

<div className="grid grid-cols-2 gap-2 mb-2">

<div className="bg-white/10 p-2 rounded">

<p className="text-xs opacity-80">
30 Day Profit
</p>

<p className="text-sm font-semibold text-yellow-300">
${monthlyProfit.toFixed(2)}
</p>

</div>

<div className="bg-white/10 p-2 rounded">

<p className="text-xs opacity-80">
Year Profit
</p>

<p className="text-sm font-semibold text-yellow-300">
${yearlyProfit.toFixed(2)}
</p>

</div>

</div>

<p className="text-xs text-blue-100 mb-2">
Balanced yield and moderate risk makes this pool suitable for stable DeFi returns.
</p>

<button className="w-full bg-white text-indigo-700 text-sm font-semibold py-1.5 rounded hover:bg-gray-100 transition">
Invest in {pool.token}
</button>

</div>

)

}

export default Recommendation;