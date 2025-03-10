import React from "react";
import Image from "next/image";
import eyeIcon from "../../../../public/assets/images/icon-show-password.svg";
import Link from "next/link";

const SignupForm = () => {
  return (
    <form className="mt-8 space-y-4">
      <div className="flex flex-col gap-1">
        <label className="capitalize text-[#696868] text-xs font-bold">
          name
        </label>
        <input
          className="border-[#98908B] border rounded-lg h-[2.8125rem]"
          type="text"
        />
      </div>
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
          create password
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
        <p className="text-right text-xs text-[#696868]">
          Password must be at least 8 characters
        </p>
      </div>
      <button
        type="submit"
        className="mt-4 bg-[#201F24] text-white w-full h-[3.3125rem] rounded-lg text-sm font-bold capitalize cursor-pointer"
      >
        create account
      </button>
      <p className="text-[#696868] text-xs mt-4 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-[#201F24] font-bold">
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
