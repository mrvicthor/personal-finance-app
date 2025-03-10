import React from "react";
import LoginForm from "./form";

const Page = () => {
  return (
    <div className="flex items-center justify-center md:h-screen">
      <div className="bg-white rounded-lg w-[21.4375rem] sm:min-w-[35rem]  py-8 px-8">
        <h1 className="text-[2rem] font-bold capitalize text-[#201F24]">
          login
        </h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
