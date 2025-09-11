"use client";
import { useState } from "react";

type PotInputFieldProps = {
  id: string;
  name: string;
  label: string;
  error?: string[];
  value: string;
};

const PotInputField = ({
  id,
  name,
  label,
  error,
  value,
}: PotInputFieldProps) => {
  const [nameCount, setNameCount] = useState("");
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="capitalize text-[#696868] text-xs font-bold"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        className="border-[#98908B] border rounded-lg h-[2.8125rem] px-5"
        defaultValue={value}
        onChange={(e) => setNameCount(e.target.value)}
        type="text"
        placeholder="e.g Rainy Days"
        required
      />
      <p className="text-right text-xs text-[#696868]">
        {nameCount.length ? 30 - nameCount.length : 30}
        <span className="pl-1">characters left</span>
      </p>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default PotInputField;
