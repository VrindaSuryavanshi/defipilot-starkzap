import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Pools from "./pages/Pools";
import Simulator from "./pages/Simulator";
import Recommendation from "./pages/Recommendation";
import Portfolio from "./pages/Portfolio";

function App() {

  return (

    <Router>

      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Pools Page */}
        <Route path="/pools" element={<Pools />} />

        {/* Simulator */}
        <Route path="/simulator" element={<Simulator />} />

        {/* AI Recommendation */}
        <Route path="/recommendation" element={<Recommendation />} />

        {/* Portfolio */}
        <Route path="/portfolio" element={<Portfolio />} />

      </Routes>

    </Router>

  );

}

export default App;