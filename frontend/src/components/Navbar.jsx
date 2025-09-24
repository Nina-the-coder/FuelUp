import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VariantButton from "./VariantButton";
import Icon from "./Icon.jsx";
import logo from "../assets/Logo.jpg";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();
  const navigateto = (path) => {
    navigate(path);
  };

  const handleNavToggle = () => {
    setNavOpen((prev) => !prev);
    console.log("Nav state:", !navOpen);
  };

  const handleLogin = () => {
    navigate("/signup");
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

        {/* Right Side: Button */}
        <VariantButton
          onClick={handleLogin}
          variant="red"
          size="large"
          text="Sign Up"
        />
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
