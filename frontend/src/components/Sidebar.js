import React from "react";
import { Link } from "react-router-dom";

function Sidebar({isOpen,setIsOpen}){

return(

<>

{isOpen && (
<div
className="fixed inset-0 bg-black bg-opacity-40 md:hidden"
onClick={()=>setIsOpen(false)}
></div>
)}

<div
className={`fixed md:relative top-0 left-0 min-h-screen w-64 bg-gray-900 text-white p-6 
transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
md:translate-x-0 transition-transform duration-300`}
>

<div className="flex items-center gap-3 mb-10">

  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg shadow">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  </div>

  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
    DeFiPilot
  </h2>

</div>

<ul className="space-y-6">

<li>
<Link
to="/dashboard"
onClick={()=>setIsOpen(false)}
className="block hover:text-blue-400"
>
Dashboard
</Link>
</li>

<li>
<Link
to="/pools"
onClick={()=>setIsOpen(false)}
className="block hover:text-blue-400"
>
Pools
</Link>
</li>

<li>
<Link
to="/simulator"
onClick={()=>setIsOpen(false)}
className="block hover:text-blue-400"
>
Simulator
</Link>
</li>

<li>
<Link
to="/portfolio"
onClick={()=>setIsOpen(false)}
className="block hover:text-blue-400"
>
Portfolio
</Link>
</li>

</ul>

</div>
</>

)

}

export default Sidebar