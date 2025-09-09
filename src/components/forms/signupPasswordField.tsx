"use client";
import Image from "next/image";
import { useState } from "react";

type SignupPasswordProps = {
  value: string;
  error?: string[];
};

const SignupPasswordField = ({ value, error }: SignupPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleVisibility = () => setShowPassword(!showPassword);
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="password"
        className="capitalize text-[#696868] text-xs font-bold"
      >
        create password
      </label>
      <div className="relative w-full">
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          defaultValue={value}
          className="border-[#98908B] border rounded-lg h-[2.8125rem] w-full px-5"
        />
        <button
          type="button"
          onClick={toggleVisibility}
          aria-label="toggle password visibility"
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          <Image
            src="/assets/images/icon-show-password.svg"
            alt="eye-icon"
            width={16}
            height={16}
          />
        </button>
      </div>
      {error && (
        <div className="text-sm text-red-500">
          <p>Password must:</p>
          <ul>
            {error.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      <p className="text-right text-xs text-[#696868]">
        Password must be at least 8 characters
      </p>
    </div>
  );
};

export default SignupPasswordField;
