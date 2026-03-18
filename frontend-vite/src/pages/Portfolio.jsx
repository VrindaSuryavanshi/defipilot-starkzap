import React,{useState,useEffect} from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer} from "recharts";
import {getCryptoPrices} from "../services/cryptoService";

function Portfolio(){

const [isOpen,setIsOpen] = useState(false);
const [wallet,setWallet] = useState("");
const [investments,setInvestments] = useState([]);
const [pools,setPools] = useState([]);
const [prices,setPrices] = useState({});

const API_URL = import.meta.env.VITE_API_URL;

useEffect(()=>{

const savedWallet = localStorage.getItem("walletAddress");

if(savedWallet){
setWallet(savedWallet);
}

fetchInvestments();
fetchPools();
fetchPrices();

},[]);

const fetchInvestments = async ()=>{

const res = await axios.get(`${API_URL}/investments`);
setInvestments(res.data);

};

const fetchPools = async ()=>{

const res = await axios.get(`${API_URL}/pools`);
setPools(res.data);

};

const fetchPrices = async ()=>{

const data = await getCryptoPrices();
setPrices(data);

};

const getPool = (poolId)=>{
return pools.find(p=>p.id === poolId);
};

const totalInvested = investments.reduce((sum,i)=>sum+Number(i.amount),0);

const yearlyYield = investments.reduce((sum,i)=>{

const pool = getPool(i.poolId);

if(!pool) return sum;

return sum + (i.amount*(pool.apr/100));

},0);

const chartData = investments.map(inv=>{

const pool = getPool(inv.poolId);

if(!pool) return null;

return{
name:pool.token,
value:inv.amount
}

}).filter(Boolean);

const withdraw = async (id)=>{

await axios.delete(`${API_URL}/investments/${id}`);

setInvestments(investments.filter(i=>i.id!==id));

alert("Investment withdrawn successfully!");

};

return(

<div className="flex min-h-screen">

<Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>

<div className="flex-1 bg-gray-100">

<Navbar setIsOpen={setIsOpen} setWallet={setWallet}/>

<div className="p-8">

<div className="bg-white p-6 rounded-xl shadow mb-6">

<h2 className="font-bold mb-2">
Connected Wallet
</h2>

<p>{wallet}</p>

</div>

<div className="grid md:grid-cols-4 gap-6 mb-6">

<div className="bg-white p-6 rounded-xl shadow">

<p>Total Invested</p>

<h3 className="text-2xl font-bold text-blue-600">
${totalInvested}
</h3>

</div>

<div className="bg-white p-6 rounded-xl shadow">

<p>Estimated Yield</p>

<h3 className="text-2xl font-bold text-green-600">
${yearlyYield.toFixed(2)}
</h3>

</div>

<div className="bg-white p-6 rounded-xl shadow">

<p>Bitcoin Price</p>

<h3 className="text-xl font-bold">
${prices.bitcoin?.usd || "..."}
</h3>

</div>

<div className="bg-white p-6 rounded-xl shadow">

<p>Ethereum Price</p>

<h3 className="text-xl font-bold">
${prices.ethereum?.usd || "..."}
</h3>

</div>

</div>

<div className="bg-white p-6 rounded-xl shadow mb-6">

<h2 className="font-bold mb-4">
Portfolio Distribution
</h2>

<ResponsiveContainer width="100%" height={300}>

<LineChart data={chartData}>

<XAxis dataKey="name"/>
<YAxis/>
<Tooltip/>

<Line
type="monotone"
dataKey="value"
stroke="#6366f1"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>

<div className="bg-white p-6 rounded-xl shadow">

<h2 className="font-bold mb-4">
My Investments
</h2>

<table className="w-full text-left">

<thead>

<tr className="border-b">

<th>Token</th>
<th>Amount</th>
<th>APR</th>
<th>Yearly Yield</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{investments.map(inv=>{

const pool = getPool(inv.poolId);

if(!pool) return null;

return(

<tr key={inv.id} className="border-b hover:bg-gray-50">

<td className="py-2">{pool.token}</td>

<td>${inv.amount}</td>

<td className="text-green-600">
{pool.apr}%
</td>

<td>
${(inv.amount*(pool.apr/100)).toFixed(2)}
</td>

<td>

<button
onClick={()=>withdraw(inv.id)}
className="bg-red-500 text-white px-3 py-1 rounded"
>
Withdraw
</button>

</td>

</tr>

)

})}

</tbody>

</table>

</div>

</div>

</div>

</div>

)

}

export default Portfolio;