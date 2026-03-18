import React from "react";
import {useState} from "react"

function PoolTable() {

const pools = [
{
name:"ETH / USDC",
apy:"12%",
tvl:"$120M",
risk:"Medium",
icon:"🟣"
},
{
name:"BTC / ETH",
apy:"9%",
tvl:"$95M",
risk:"Low",
icon:"🟡"
},
{
name:"MATIC / USDT",
apy:"15%",
tvl:"$60M",
risk:"High",
icon:"🔵"
},
{
name:"SOL / USDC",
apy:"11%",
tvl:"$80M",
risk:"Medium",
icon:"🟢"
}
];

const filteredPools = pools.filter(pool =>
pool.name.toLowerCase()
);

const riskColor = (risk)=>{
if(risk==="Low") return "bg-green-100 text-green-700";
if(risk==="Medium") return "bg-yellow-100 text-yellow-700";
return "bg-red-100 text-red-700";
};

  return (

    <div className="bg-white p-4 rounded shadow">

<div className="bg-white rounded-xl shadow-lg p-6">

<div className="flex justify-between items-center mb-4">

<h2 className="text-xl font-bold text-gray-800">
Top DeFi Pools
</h2>

</div>

<div className="grid md:grid-cols-2 gap-4">

{filteredPools.map((pool,index)=>(
  
<div
key={index}
className="bg-gray-50 border rounded-xl p-5 hover:shadow-lg transition cursor-pointer"
>

<div className="flex justify-between items-center">

<div className="flex items-center gap-3">

<span className="text-2xl">
{pool.icon}
</span>

<div>

<h3 className="font-semibold text-gray-700">
{pool.name}
</h3>

<p className="text-sm text-gray-500">
TVL: {pool.tvl}
</p>

</div>

</div>

<div className="text-right">

<p className="text-green-600 font-bold text-lg">
{pool.apy}
</p>

<span className={`text-xs px-2 py-1 rounded ${riskColor(pool.risk)}`}>
{pool.risk}
</span>

</div>

</div>


<div className="mt-4">

</div>

</div>

))}

</div>

</div>

    </div>

  );
}

export default PoolTable;