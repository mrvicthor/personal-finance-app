import React from "react";
import LoginForm from "./form";

const Page = () => {
  return (
    <div className="flex items-center justify-center md:h-screen px-4 sm:px-0">
      <div className="bg-white rounded-lg w-full sm:max-w-[35rem] py-8 px-5 sm:px-8">
        <h1 className="text-[2rem] font-bold capitalize text-[#201F24]">
          login
        </h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
