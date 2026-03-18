import React from "react";

function PortfolioTracker({ investments, pools }) {

 const total = investments.reduce((acc, i) => acc + Number(i.amount), 0);

  const getPoolToken = (poolId) => {
    const pool = pools.find(p => p.id === poolId);
    return pool ? pool.token : `Pool ${poolId}`;
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Portfolio Tracker</h2>

      <p className="text-gray-500 mb-4">
        Total Invested: <span className="font-semibold text-gray-900">${total}</span>
      </p>

      <ul className="space-y-2">
        {investments.map(i => (
          <li
            key={i.id}
            className="flex justify-between bg-gray-50 p-3 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <span className="font-medium text-gray-700 truncate block max-w-full">{i.wallet}</span>
            <span className="text-gray-600">
              ${i.amount} in {getPoolToken(i.poolId)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PortfolioTracker;