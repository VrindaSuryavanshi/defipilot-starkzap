import React, { useState } from "react";

function WalletConnect({ setWallet }) {

  const [account, setAccount] = useState("");

  const connectWallet = async () => {

    if(window.ethereum){

    try{

      const accounts = await window.ethereum.request({
        method:"eth_requestAccounts"
      });

      const walletAddress = accounts[0];

      setAccount(walletAddress);
      setWallet(walletAddress);

      localStorage.setItem("walletAddress", walletAddress);

    }catch(err){
      console.log(err);
    }

  }else{

    const install = window.confirm(
      "MetaMask is not installed. Click OK to download MetaMask."
    );

    if(install){
      window.open("https://metamask.io/download/","_blank");
    }

  }

  };

  return (

    <div className="bg-white p-3 rounded shadow flex justify-between">

      {account ? (
        <p>Connected: {account.slice(0,6)}...{account.slice(-4)}</p>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded"
        >
          Connect Wallet
        </button>
      )}

    </div>

  );
}

export default WalletConnect;