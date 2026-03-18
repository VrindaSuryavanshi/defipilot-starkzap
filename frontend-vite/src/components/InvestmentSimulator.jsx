import React, { useState, useEffect } from "react";
import axios from "axios";

function InvestmentSimulator({ pools, wallet, addInvestment }) {
  const [amount, setAmount] = useState(1);
  const [poolId, setPoolId] = useState("");
  const [result, setResult] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (pools.length > 0) setPoolId(pools[0].id);
  }, [pools]);

  const simulate = async () => {
    if (!wallet) return alert("Please connect wallet first");
    const pool = pools.find(p => p.id === parseInt(poolId));
    const res = await axios.post(`${API_URL}/pools/simulate`, {
      amount,
      apr: pool.apr
    });
    setResult(res.data.yearlyYield);

    await axios.post(`${API_URL}/investments`, {
      wallet,
      poolId: pool.id,
      amount
    });

    addInvestment({ id: Date.now(), wallet, poolId: pool.id, amount: parseFloat(amount) });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Investment Simulator</h2>

      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Amount USD"
        min="1"
        required
        className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <select
        value={poolId}
        onChange={e => setPoolId(e.target.value)}
        className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {pools.map(p => <option key={p.id} value={p.id}>{p.token}</option>)}
      </select>

      <button
        onClick={simulate}
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
      >
        Simulate
      </button>

      {result && <p className="mt-4 text-gray-700 font-medium">Estimated yearly yield: <span className="text-green-600">${result.toFixed(2)}</span></p>}
    </div>
  );
}

export default InvestmentSimulator;