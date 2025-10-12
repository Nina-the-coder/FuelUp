import React from "react";
import Icon from "../components/Icon";
import googleicon from "../assets/googleicon.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const navigateto = (path) => { 
        navigate(path);
    }
  return (
    <div className="h-vh flex m-0 flex-col justify-center items-center p-4 md:p-8 ">
      <div className="text-[2rem] font-semibold mb-8">Fuel Up</div>

      {/* main form */}
      <div className="flex flex-col sm:w-[30rem] bg-card-bg p-8 md:p-16 rounded-2xl shadow-lg">
        <div className="flex flex-col items-center mb-4">
          <div className="text-[1.5rem] font-semibold ">Login</div>
          <div className="text-[1rem] mb-4 ">
            Enter your email to Login to this app
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <input
            className="border h-[40px] w-full rounded-xl px-4 py-0.5 border-card-bg/80 bg-white"
            placeholder="email@domail.com"
          />
          <input
            className="border h-[40px] w-full rounded-xl px-4 py-0.5 border-card-bg/80 bg-white"
            type="password"
            placeholder="password"
          />
          <div className="">
            Don't have an account?{" "}
            <button
              onClick={() => navigateto("/signup")}
              className="text-blue hover:underline hover:cursor-pointer"
            >
              SignUp
            </button>
          </div>
          <button className="w-full h-[40px] bg-text text-bg rounded-xl px-2 py-0.5 hover:bg-text/90 hover:cursor-pointer">
            Login
          </button>
          <div className="flex items-center w-full text-text/60 my-0.5">
            <div className="flex-grow h-0 border"></div>
            <div className="mx-2">or continue with</div>
            <div className="flex-grow h-0 border"></div>
          </div>
          <button className="w-full h-[40px] py-0.5 flex items-center justify-between bg-bg/90 rounded-xl hover:border hover:cursor-pointer ">
            <img
              className="w-[40px] h-[24px] flex-shrink-0"
              src={googleicon}
              alt="G"
            />
            <div className="">Google</div>
            <div className="w-[40px]"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
