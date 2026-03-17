import React, { useEffect, useState } from "react";
import axios from "axios";

function StarknetBestPool(){

const [pool,setPool] = useState(null);

useEffect(()=>{

axios.get("https://yields.llama.fi/pools")
.then(res=>{

const starkPools = res.data.data.filter(
p => p.chain === "Starknet"
);

if(starkPools.length===0) return;

let best = starkPools[0];

starkPools.forEach(p=>{
if(p.apy > best.apy){
best = p;
}
});

setPool(best);

})
.catch(err=>console.log(err));

},[]);

if(!pool) return(
<div className="bg-white p-4 rounded-xl shadow">
Loading Starknet pool...
</div>
)

return(

<div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow p-4">

<div className="flex justify-between items-center mb-4">

<h2 className="font-semibold text-sm">
⭐ Best Starknet Pool
</h2>

<span className="text-xs bg-white/20 px-2 py-4 rounded">
AI Pick
</span>

</div>

<div className="space-y-2 text-sm">

<div className="flex justify-between">

<span>Pool</span>

<span className="font-semibold">
{pool.symbol}
</span>

</div>

<div className="flex justify-between">

<span>Protocol</span>

<span className="font-semibold">
{pool.project}
</span>

</div>

<div className="flex justify-between">

<span>APR</span>

<span className="font-bold text-green-300">
{pool.apy.toFixed(2)}%
</span>

</div>

<div className="flex justify-between">

<span>TVL</span>

<span className="font-semibold">
${Math.round(pool.tvlUsd/1000000)}M
</span>

</div>

</div>

<button className="mt-4 w-full bg-white text-indigo-600 text-sm py-1.5 rounded hover:bg-gray-100">
View Pool
</button>

</div>

)

}

export default StarknetBestPool;