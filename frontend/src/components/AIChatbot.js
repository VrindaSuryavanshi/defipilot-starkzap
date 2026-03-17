import React, {useEffect,useState} from "react";
import axios from "axios";

function AIChatbot(){
    const [pool,setPool]=useState(null);

    useEffect(()=>{
        axios.get("http://localhost:8080/pools/recommendation")
             .then(res=>setPool(res.data))
             .catch(err=>console.log(err));
    },[]);

    if(!pool) return <p>Loading AI recommendation...</p>

    return(
        <div className="bg-green-100 p-4 rounded shadow">
            <h2 className="font-bold">AI Investment Advisor</h2>
            <p>Best Pool: {pool.token}</p>
            <p>APR: {pool.apr}%</p>
            <p>Risk: {pool.risk}</p>
        </div>
    )
}

export default AIChatbot;