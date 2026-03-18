import React from "react";
import {
 LineChart,
 Line,
 XAxis,
 YAxis,
 Tooltip,
 CartesianGrid,
 ResponsiveContainer
} from "recharts";

function PortfolioChart({ investments, pools }) {

 if(investments.length === 0){
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold">Portfolio Distribution</h2>
      <p>No investments yet</p>
    </div>
  );
 }

 const getPoolToken = (poolId) => {
   const pool = pools.find(p => p.id === poolId);
   return pool ? pool.token : `Pool ${poolId}`;
 };

 const data = investments.map(i => ({
   name: getPoolToken(i.poolId),
   amount: Number(i.amount)
 }));

 return(

   <div className="bg-white p-4 rounded shadow">

    <h2 className="font-bold mb-2">Portfolio Distribution</h2>

    <ResponsiveContainer width="100%" height={250}>

      <LineChart data={data}>

        <CartesianGrid strokeDasharray="3 3"/>

        <XAxis dataKey="name"/>

        <YAxis/>

        <Tooltip/>

        <Line
          type="monotone"
          dataKey="amount"
          stroke="#22c55e"
          strokeWidth={3}
        />

      </LineChart>

    </ResponsiveContainer>

   </div>

 );

}

export default PortfolioChart;