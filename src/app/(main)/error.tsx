"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-[20.9375rem] sm:max-w-[35rem] py-8 px-5 sm:px-8 z-50">
      <div className="flex flex-col gap-4 items-center justify-between">
        <h2>Something went wrong</h2>
        <button
          className="text-white bg-[#201F24] h-[3.3125rem] w-full rounded-lg capitalize font-bold"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
