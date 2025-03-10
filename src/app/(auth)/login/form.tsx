import React from "react";
import Image from "next/image";
import eyeIcon from "../../../../public/assets/images/icon-show-password.svg";
import Link from "next/link";

const LoginForm = () => {
  return (
    <form className="mt-8 ">
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <label className="capitalize text-[#696868] text-xs font-bold">
            email
          </label>
          <input
            className="border-[#98908B] border rounded-lg h-[2.8125rem]"
            type="email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="capitalize text-[#696868] text-xs font-bold">
            password
          </label>
          <div className="relative w-full">
            <input
              className="border-[#98908B] border rounded-lg h-[2.8125rem] w-full"
              type="password"
            />
            <Image
              src={eyeIcon}
              alt="eye-icon"
              width={16}
              height={16}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="mt-8 bg-[#201F24] text-white w-full h-[3.3125rem] rounded-lg text-sm font-bold capitalize cursor-pointer"
      >
        login
      </button>
      <p className="text-[#696868] text-xs mt-4 text-center">
        Need to create an account?{" "}
        <Link href="/signup" className="text-[#201F24] font-bold">
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
