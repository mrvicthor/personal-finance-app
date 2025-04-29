"use client";
import React, { useActionState } from "react";
import { forgotPassword } from "@/app/actions/auth";
import { ForgotPasswordActionResponse } from "@/lib/definition";
const initialState: ForgotPasswordActionResponse = {
  success: false,
  message: "",
};
const ForgotPasswordForm = () => {
  const [state, action, pending] = useActionState(forgotPassword, initialState);
  return (
    <>
      {state.success ? (
        <p className="text-green-500">{state?.message}</p>
      ) : (
        <form action={action} className="space-y-4">
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
          <button
            disabled={pending}
            type="submit"
            className="mt-8 bg-[#201F24] text-white w-full h-[3.3125rem] rounded-lg text-sm font-bold capitalize cursor-pointer"
          >
            {pending ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⚪</span>
                sending...
              </span>
            ) : (
              "send reset link"
            )}
          </button>
        </form>
      )}
    </>
  );
};

export default ForgotPasswordForm;
