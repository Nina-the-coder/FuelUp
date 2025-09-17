import React from "react";
import Icon from "../components/Icon";
import googleicon from "../assets/googleicon.png";

const Login = () => {
  return (
    <div className="h-vh flex flex-col justify-center items-center p-16">
      <div className="text-[2rem] font-semibold mb-8">Fuel Up</div>

      {/* main form */}
      <div className="flex flex-col border p-16 rounded-2xl bg-white">
        <div className="flex flex-col items-center">
          <div className="text-[1.5rem] font-semibold ">Create an account</div>
          <div className="text-[1rem] mb-4 ">Enter your email to signup for this app</div>
        </div>

        <div className="flex flex-col gap-4">
          <input
            className="border h-[40px] rounded-xl px-4 py-0.5 border-card-bg/80"
            placeholder="email@domail.com"
          />
          <button className="w-full h-[40px] bg-text text-bg rounded-xl px-2 py-0.5 hover:bg-text/90 hover:cursor-pointer">Sign up with email</button>
          <div className="flex items-center text-text/60 my-0.5">
            <div className="flex-grow h-0 border"></div>
            <div className="mx-2">or continue with</div>
            <div className="flex-grow h-0 border"></div>
          </div>
          <button className="w-full h-[40px] py-0.5 flex items-center justify-between bg-bg/90 rounded-xl hover:border hover:cursor-pointer ">
            <img className="w-[40px] h-[24px] flex-shrink-0" src={googleicon} alt="G" />
            <div className="">Google</div>
            <div className="w-[40px]"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
