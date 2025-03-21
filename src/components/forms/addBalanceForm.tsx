import React from "react";

const AddBalanceForm = () => {
  return (
    <form className="mt-5">
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="balance"
            className="capitalize text-[#696868] text-xs font-bold"
          >
            balance
          </label>
          <input
            id="balance"
            name="balance"
            className="border-[#98908B] border rounded-lg h-[2.8125rem] px-5"
            type="text"
            placeholder="$ e.g 2000"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="income"
            className="capitalize text-[#696868] text-xs font-bold"
          >
            income
          </label>
          <input
            id="income"
            name="income"
            className="border-[#98908B] border rounded-lg h-[2.8125rem] px-5"
            type="text"
            placeholder="$ e.g 2000"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="expenses"
            className="capitalize text-[#696868] text-xs font-bold"
          >
            expenses
          </label>
          <input
            id="expenses"
            name="expenses"
            className="border-[#98908B] border rounded-lg h-[2.8125rem] px-5"
            type="text"
            placeholder="$ e.g 2000"
          />
        </div>
      </div>
      <button className="mt-8 text-white bg-[#201F24] h-[3.3125rem] w-full rounded-lg capitalize font-bold">
        add balance
      </button>
    </form>
  );
};

export default AddBalanceForm;
