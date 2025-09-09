"use client";
import React, { useActionState } from "react";
import Link from "next/link";
import { SignupActionResponse } from "@/lib/definition";
import { signup } from "@/app/actions/auth";
import InputField from "@/components/forms/inputField";
import SignupPasswordField from "@/components/forms/signupPasswordField";

const initialState: SignupActionResponse = {
  success: false,
  message: "",
  inputs: {
    name: "",
    email: "",
    password: "",
  },
};

const SignupForm = () => {
  const [state, action, pending] = useActionState(signup, initialState);
  const safeState = state || initialState;

  return (
    <form action={action} className="mt-8">
      <div className="space-y-4">
        <InputField
          id="name"
          name="name"
          value={safeState.inputs?.name || ""}
          label="name"
          error={safeState.errors?.name?.[0]}
        />
        <InputField
          id="email"
          label="email"
          name="email"
          type="email"
          value={safeState.inputs?.email || ""}
        />

        <SignupPasswordField
          value={safeState.inputs?.password as string}
          error={state.errors?.password}
        />
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
