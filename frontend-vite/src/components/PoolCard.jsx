import React from "react";

function PoolCard({pool}){

return(

<div className="bg-white p-6 rounded-lg shadow">

<h3 className="text-xl font-bold">{pool.token}</h3>

<p className="mt-2">APR: {pool.apr}%</p>

<p>Risk: {pool.riskScore}</p>

<button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">

Invest

</button>

</div>

)

}

export default PoolCard