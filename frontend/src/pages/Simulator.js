import React,{useState} from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Simulator(){

const [isOpen,setIsOpen] = useState(false);
const [amount,setAmount] = useState(1000);
const [apr,setApr] = useState(10);
const [years,setYears] = useState(1);
const [compound,setCompound] = useState(true);
const [wallet,setWallet] = useState("");

let profit = 0;
let total = 0;

if(compound){
  total = amount * Math.pow((1 + apr/100), years);
  profit = total - amount;
}else{
  profit = amount * (apr/100) * years;
  total = Number(amount) + profit;
}

return(

<div className="flex">

<Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>

<div className="flex-1 bg-gray-100 min-h-screen">

<Navbar setIsOpen={setIsOpen} setWallet={setWallet} />

<div className="p-10">

<div className="flex items-center justify-center min-h-[80vh]">

  <div className="bg-white shadow rounded-lg p-8 max-w-xl w-full">

<h2 className="text-2xl font-bold mb-6 text-blue-600">
DeFi Yield Simulator
</h2>

<div className="mb-4">
<label className="block mb-1 font-semibold">
Investment Amount ($)
</label>

<input
type="number"
value={amount}
onChange={e=>setAmount(Number(e.target.value))}
className="border p-2 w-full rounded"
/>
</div>

<div className="mb-4">
<label className="block mb-1 font-semibold">
APR (%)
</label>

<input
type="number"
value={apr}
onChange={e=>setApr(Number(e.target.value))}
className="border p-2 w-full rounded"
/>
</div>

<div className="mb-4">
<label className="block mb-1 font-semibold">
Duration (Years)
</label>

<input
type="number"
value={years}
onChange={e=>setYears(Number(e.target.value))}
className="border p-2 w-full rounded"
/>
</div>

<div className="flex items-center mb-6">

<input
type="checkbox"
checked={compound}
onChange={()=>setCompound(!compound)}
className="mr-2"
/>

<label>
Enable Compound Interest
</label>

</div>

<div className="bg-gray-100 p-5 rounded">

<p className="text-lg mb-2">
Principal: <span className="font-semibold">${amount}</span>
</p>

<p className="text-lg mb-2">
Profit: <span className="text-green-600 font-semibold">
${profit.toFixed(2)}
</span>
</p>

<p className="text-xl font-bold">
Total Value: ${total.toFixed(2)}
</p>

</div>

</div>

</div>

</div>

</div>
</div>

)

}

export default Simulator;