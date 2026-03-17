import React,{useState,useEffect} from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CryptoChart from "../components/CryptoChart";
import CryptoTicker from "../components/CryptoTicker";
import PoolTable from "../components/PoolTable";
import AIChatbot from "../components/AIChatbot";
import InvestmentSimulator from "../components/InvestmentSimulator";
import Recommendation from ".//Recommendation"
import PortfolioTracker from "../components/PortfolioTracker";
import PortfolioChart from "../components/PortfolioChart";
import WalletConnect from "../components/WalletConnect";
import StarknetBestPool from "../components/StarknetBestPool";
import AIPoolRanking from "../components/AIPoolRanking";
import axios from "axios";

function Dashboard(){

 const [isOpen,setIsOpen] = useState(false);
 const [pools,setPools] = useState([]);
 const [investments,setInvestments] = useState([]);
 const [wallet,setWallet] = useState("");

 useEffect(()=>{

  axios.get("http://localhost:8080/pools")
  .then(res=>{
    setPools(res.data);
  })
  .catch(err=>console.log(err));

 },[]);

 useEffect(()=>{

  axios.get("http://localhost:8080/investments")
  .then(res=>{
    setInvestments(res.data);
  });

  },[]);

  useEffect(()=>{
    const savedWallet = localStorage.getItem("walletAddress");

    if(savedWallet){
      setWallet(savedWallet);
    }
  },[]);

 const addInvestment = (investment)=>{
  setInvestments(prev => [...prev, investment]);
};

 return(

  <div>


    <div className="flex min-h-screen">

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>

      <div className="flex-1 bg-gray-100">

        <Navbar setIsOpen={setIsOpen} setWallet={setWallet} />
       
        <CryptoTicker/> 

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">          
          
          <CryptoChart/>

          <PoolTable pools={pools}/>

          <StarknetBestPool/>
   
          <Recommendation/>

          <AIPoolRanking/>

          <InvestmentSimulator
            pools={pools}
            wallet={wallet}
            addInvestment={addInvestment}
          />  
          <PortfolioTracker investments={investments} pools={pools}/>

          <PortfolioChart investments={investments} pools={pools}/>

        </div>

      </div>

    </div>   


  </div>

 );

}

export default Dashboard;