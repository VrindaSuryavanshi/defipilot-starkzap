import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function CryptoChart({ symbol = "bitcoin" }) {

  const [data, setData] = useState([]);

  useEffect(() => {

    async function fetchData() {

      try {

        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${symbol}/market_chart?vs_currency=usd&days=7`
        );

        const formatted = res.data.prices.map(item => ({
          time: new Date(item[0]).toLocaleDateString(),
          price: item[1]
        }));

        setData(formatted);

      } catch (err) {
        console.error("Chart API error:", err);
      }
    }

    fetchData();

  }, [symbol]);

  if (data.length === 0) {
    return (
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold">Crypto Chart</h2>
        <p>Loading chart data...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow">

      <h2 className="font-bold mb-2">
        {symbol.toUpperCase()} Price (7 Days)
      </h2>

      <ResponsiveContainer width="100%" height={250}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="price"
            stroke="#2563eb"
            dot={false}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default CryptoChart;