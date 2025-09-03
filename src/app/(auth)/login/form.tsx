"use client";
import React, { useState, useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LoginActionResponse } from "@/lib/definition";
import { login } from "@/app/actions/auth";

const initialState: LoginActionResponse = {
  success: false,
  message: "",
};
const LoginForm = () => {
  const [state, action, pending] = useActionState(login, initialState);
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword(!showPassword);

  return (
    <form action={action} className="mt-8 ">
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="capitalize text-[#696868] text-xs font-bold"
          >
            email
          </label>
          <input
            id="email"
            name="email"
            defaultValue={state.inputs?.email}
            className="border-[#98908B] border rounded-lg h-[2.8125rem] px-5"
            type="email"
          />
        </div>
        {state.errors?.email && (
          <p className="text-red-500">{state.errors.email}</p>
        )}
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
              defaultValue={state.inputs?.password}
              className="border-[#98908B] border rounded-lg h-[2.8125rem] w-full px-5"
            />
            <Image
              onClick={toggleVisibility}
              src="/assets/images/icon-show-password.svg"
              alt="eye-icon"
              width={16}
              height={16}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            />
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
        {state.errors?.password && (
          <p className="text-red-500">{state.errors.password}</p>
        )}
      </div>
      <button
        disabled={pending}
        type="submit"
        className="mt-8 bg-[#201F24] text-white w-full h-[3.3125rem] rounded-lg text-sm font-bold capitalize cursor-pointer"
      >
        {pending ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⚪</span>
            logging in...
          </span>
        ) : (
          "login"
        )}
      </button>
      {state.message && <p className="text-red-500 mt-4">{state.message}</p>}
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
