import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import VariantButton from "./VariantButton"; // We are not using this anymore
import Icon from "./Icon.jsx";
import logo from "../assets/Logo.jpg";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

  // Read login state from localStorage
  const isLoggedIn = !!localStorage.getItem("jwtToken");
  const username = localStorage.getItem("username");

  const navigateto = (path) => {
    navigate(path);
  };

  const handleNavToggle = () => {
    setNavOpen((prev) => !prev);
    console.log("Nav state:", !navOpen);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    // Clear the user's session from the frontend
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");

    // Redirect to login and reload
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="h-[50px] lg:h-[64px] w-full px-2 flex justify-between items-center border-b border-card-bg">
      <div className="h-full flex items-center gap-2">
        <button
          className="hover:cursor-pointer hover:bg-gray-200 p-2 rounded-xl block lg:hidden"
          onClick={handleNavToggle}
        >
          <Icon name="menu" />
        </button>
        <button
          className="h-9/10 w-auto flex justify-center items-center lg:ml-4 hover:cursor-pointer"
          onClick={() => navigateto("/")}
        >
          <img src={logo} alt="FuelUp" className="h-full" />
        </button>
      </div>

      <div className="flex mx-4">
        <div className="hidden lg:flex items-center gap-6 px-8">
          <ul className="flex space-x-6 text-[18px] font-semibold items-center">
            <li>
              <Link to="/" className="hover:underline">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/meal-recommendation" className="hover:underline">
                Meal Recommendation
              </Link>
            </li>
            <li>
              <Link to="/mess-menu" className="hover:underline">
                Mess Menu
              </Link>
            </li>
          </ul>
        </div>

        {/* ✅ STYLING CHANGED HERE */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            // --- USER IS LOGGED IN ---
            <>
              <span className="hidden sm:block font-semibold">
                Hello, {username}
              </span>
              {/* Replaced VariantButton with a standard button */}
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg text-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            // --- USER IS LOGGED OUT ---
            // Replaced VariantButton with a standard button
            <button
              onClick={handleLogin}
              className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg text-lg hover:bg-red-700 transition-colors"
            >
              Login / Sign Up
            </button>
          )}
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {navOpen && (
        <div className="absolute top-[50px] left-0 w-full bg-card-bg p-4 lg:hidden shadow-lg">
          <ul className="flex flex-col gap-4 text-[16px]">
            <li>
              <Link to="/" onClick={() => setNavOpen(false)}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/meal-recommendation" onClick={() => setNavOpen(false)}>
                Meal Recommendation
              </Link>
            </li>
            <li>
              <Link to="/mess-menu" onClick={() => setNavOpen(false)}>
                Mess Menu
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
