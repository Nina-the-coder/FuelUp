import React, { useState } from "react"; // ⬅️ IMPORT useState
import Icon from "../components/Icon";
import googleicon from "../assets/googleicon.png";
import { useNavigate } from "react-router-dom";

// ⬅️ Define your Spring Boot server URL
const BASE_URL = "http://localhost:8080";

const Login = () => {
  const navigate = useNavigate();
  const navigateto = (path) => {
    navigate(path);
  };

  // ⬅️ 1. Define State for Inputs and Error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ⬅️ 2. Define the API Submission Handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission/page reload
    setError(""); // Clear previous errors

    const LOGIN_URL = `${BASE_URL}/api/auth/login`;

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Send data matching your LoginRequest DTO
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // SUCCESS: Save token and redirect
        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("username", data.username);
        console.log("Login Successful! Token stored.");
        navigateto("/"); // ⬅️ Change to your main app path
        window.location.reload();
      } else {
        // FAILURE: Display error from backend
        setError(data.error || "Login failed. Check your credentials.");
      }
    } catch (err) {
      // NETWORK ERROR
      console.error("Network Error:", err);
      setError("Could not connect to the server. Is the backend running?");
    }
  };

  // ⬅️ 3. Attach handleSubmit to the form/button
  return (
    <div className="h-vh flex m-0 flex-col justify-center items-center p-4 md:p-8 ">
      <div className="text-[2rem] font-semibold mb-8">Fuel Up</div>

      {/* main form */}
      {/* ⬅️ ATTACH onSubmit HANDLER HERE */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:w-[30rem] bg-card-bg p-8 md:p-16 rounded-2xl shadow-lg"
      >
        <div className="flex flex-col items-center mb-4">
          <div className="text-[1.5rem] font-semibold ">Login</div>
          <div className="text-[1rem] mb-4 ">
            Enter your email to Login to this app
          </div>
        </div>

        {/* ⬅️ Display Error Message */}
        {error && (
          <p className="text-red-500 mb-4 font-semibold text-center">{error}</p>
        )}

        <div className="flex flex-col items-center gap-4">
          <input
            className="border h-[40px] w-full rounded-xl px-4 py-0.5 border-card-bg/80 bg-white"
            placeholder="email@domail.com"
            type="email" // ⬅️ Use appropriate type
            value={email} // ⬅️ Link to state
            onChange={(e) => setEmail(e.target.value)} // ⬅️ Update state on change
          />
          <input
            className="border h-[40px] w-full rounded-xl px-4 py-0.5 border-card-bg/80 bg-white"
            type="password"
            placeholder="password"
            value={password} // ⬅️ Link to state
            onChange={(e) => setPassword(e.target.value)} // ⬅️ Update state on change
          />
          <div className="">
            Don't have an account?{" "}
            <button
              onClick={() => navigateto("/signup")}
              type="button" // ⬅️ Prevent this button from submitting the form
              className="text-blue hover:underline hover:cursor-pointer"
            >
              Forgot?
            </button>
          </div>
          {/* ⬅️ Use type="submit" to trigger form submission */}
          <button
            type="submit"
            className="w-full h-[40px] bg-text text-bg rounded-xl px-2 py-0.5 hover:bg-text/90 hover:cursor-pointer"
          >
            Login
          </button>

          <div className="flex items-center text-sm text-gray-400">
            <div className="flex-1 border-t" />
            <div className="px-3">or continue with</div>
            <div className="flex-1 border-t" />
          </div>
          <button
            type="button"
            className="w-full h-[40px] py-0.5 flex items-center justify-between bg-bg/90 rounded-xl hover:border hover:cursor-pointer "
          >
            <img
              className="w-[40px] h-[24px] flex-shrink-0"
              src={googleicon}
              alt="G"
            />
            <div className="">Google</div>
            <div className="w-[40px]"></div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
