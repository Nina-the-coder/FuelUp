import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MealRecommendation from "./pages/MealRecommendation";
import MessMenu from "./pages/MessMenu";
import Signup from "./pages/Signup";


function App() {
  return (
    <div className="App h-vh bg-bg text-text">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/meal-recommendation" element={<MealRecommendation />} />
          <Route path="/mess-menu" element={<MessMenu />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
