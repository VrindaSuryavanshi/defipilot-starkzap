import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">

      <h1 className="text-6xl font-bold text-blue-400">
        DeFiPilot
      </h1>

      <p className="mt-6 text-xl text-gray-300">
        AI Powered DeFi Portfolio Manager
      </p>

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-10 px-8 py-4 bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Launch App
      </button>

    </div>
  );
}

export default LandingPage;