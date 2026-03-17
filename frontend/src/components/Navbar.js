import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Navbar({ setIsOpen, setWallet }) {

  const [account, setAccount] = useState("");
  const location = useLocation();

  useEffect(() => {
    const savedWallet = localStorage.getItem("walletAddress");

    if (savedWallet) {
      setAccount(savedWallet);
      setWallet(savedWallet);
    }
  }, [setWallet]);

  const connectWallet = async () => {

    if (window.ethereum) {

      try {

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });

        const walletAddress = accounts[0];

        setAccount(walletAddress);
        setWallet(walletAddress);

        localStorage.setItem("walletAddress", walletAddress);

      } catch (err) {
        console.log(err);
      }

    } else {

      const install = window.confirm(
        "MetaMask is not installed. Click OK to download MetaMask."
      );

      if (install) {
        window.open("https://metamask.io/download/", "_blank");
      }

    }

  };

  const pageTitles = {
    "/": "Dashboard",
    "/pools": "Pools",
    "/portfolio": "Portfolio",
    "/simulator": "Simulator",
    "/settings": "Settings"
  };

  const pageTitle = pageTitles[location.pathname] || "Dashboard";

  return (

    <div className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow">

      <div className="flex items-center gap-4">

        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>

        <h2 className="text-xl font-semibold text-gray-200">
          {pageTitle}
        </h2>

      </div>

      <div>

        {account ? (

          <div className="bg-green-600 px-4 py-2 rounded text-sm">
            {account.slice(0,6)}...{account.slice(-4)}
          </div>

        ) : (

          <button
            onClick={connectWallet}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
          >
            Connect Wallet
          </button>

        )}

      </div>

    </div>

  );

}

export default Navbar;