"use client";
import React, { useState, useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignupActionResponse } from "@/lib/definition";
import { signup } from "@/app/actions/auth";
import InputField from "@/components/forms/inputField";

const initialState: SignupActionResponse = {
  success: false,
  message: "",
};

const SignupForm = () => {
  const [state, action, pending] = useActionState(signup, initialState);
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword(!showPassword);
  return (
    <form action={action} className="mt-8">
      <div className="space-y-4">
        <InputField
          id="name"
          name="name"
          value={state.inputs?.name}
          label="name"
          error={state.errors?.name?.[0]}
          type="text"
        />
        <InputField
          id="email"
          label="email"
          name="email"
          type="email"
          value={state.inputs?.email}
        />

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
              defaultValue={state.inputs?.password}
              className="border-[#98908B] border rounded-lg h-[2.8125rem] w-full px-5"
            />
            <button
              type="button"
              onClick={toggleVisibility}
              aria-label="Close modal"
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
          {state?.errors?.password && (
            <div className="text-sm text-red-500">
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-right text-xs text-[#696868]">
            Password must be at least 8 characters
          </p>
        </div>
      </div>
      <button
        type="submit"
        disabled={pending}
        data-testid="signup-button"
        className="mt-8 bg-[#201F24] text-white w-full h-[3.3125rem] rounded-lg text-sm font-bold capitalize cursor-pointer"
      >
        {pending ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⚪</span>
            Signing up...
          </span>
        ) : (
          "create account"
        )}
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
