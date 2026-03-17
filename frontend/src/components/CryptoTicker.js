import React, { useEffect, useState } from "react";
import axios from "axios";

function CryptoTicker() {

  const [coins,setCoins] = useState([]);

  useEffect(()=>{

    axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana&order=market_cap_desc"
    )
    .then(res=>{
      setCoins(res.data);
    })
    .catch(err=>console.log(err));

  },[]);

  return (

    <div className="bg-black text-white p-3 flex gap-8 justify-center">

      {coins.map(c=>(
        <div key={c.id}>
          {c.name} 💰 ${c.current_price}
        </div>
      ))}

    </div>

  );
}

export default CryptoTicker;