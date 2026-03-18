import React,{useState,useEffect} from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CryptoTicker from "../components/CryptoTicker";

function Pools() {

const [isOpen,setIsOpen] = useState(false);
const [search,setSearch] = useState("");
const [wallet,setWallet] = useState("");
const [pools,setPools] = useState([]);

useEffect(()=>{

const fetchPools = async () =>{

try{

const res = await axios.get("https://yields.llama.fi/pools");

const data = res.data.data.slice(0,20).map(pool=>({

name: pool.symbol,
apy: pool.apy?.toFixed(2) + "%",
tvl: "$" + Math.round(pool.tvlUsd/1000000) + "M",
risk: pool.ilRisk === "no" ? "Low" : "Medium",
icon: "💰"

}));

setPools(data);

}catch(err){
console.log(err);
}

};

fetchPools();

},[]);

const filteredPools = pools.filter(pool =>
pool.name.toLowerCase().includes(search.toLowerCase())
);

const riskColor = (risk)=>{
if(risk==="Low") return "bg-green-100 text-green-700";
if(risk==="Medium") return "bg-yellow-100 text-yellow-700";
return "bg-red-100 text-red-700";
};

return(

<div className="flex min-h-screen">

<Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>

<div className="flex-1 bg-gray-100">

<Navbar setIsOpen={setIsOpen} setWallet={setWallet} />

<CryptoTicker/>

<div className="p-8">

<div className="bg-white rounded-xl shadow-lg p-6">

<div className="flex justify-between items-center mb-6">

<h2 className="text-2xl font-bold text-gray-800">
Top DeFi Pools
</h2>

<input
type="text"
placeholder="Search pool..."
value={search}
onChange={e=>setSearch(e.target.value)}
className="border px-3 py-2 rounded-lg text-sm"
/>

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

<button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
Invest
</button>

</div>

</div>

))}

</div>

</div>

</div>

</div>

</div>

)

}

export default Pools;