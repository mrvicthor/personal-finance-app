"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
type PasswordInputFieldProps = {
  value: string;
  error?: string[];
};

const PasswordInputField = ({ value, error }: PasswordInputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword(!showPassword);
  return (
    <>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="password"
          className="capitalize text-[#696868] text-xs font-bold"
        >
          password
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
            aria-label="Close modal"
            className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2"
          >
            <Image
              src="/assets/images/icon-show-password.svg"
              alt="eye-icon"
              width={16}
              height={16}
            />
          </button>
        </div>
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-[#696868] text-xs font-bold"
          >
            Forgot password?
          </Link>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

export default PasswordInputField;
