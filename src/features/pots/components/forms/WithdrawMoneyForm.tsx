import { formatCurrency } from "@/helpers/currencyFormatter";
import { SelectedPot } from "@/types/pot";
import React, { useActionState, useState } from "react";
import FormRange from "../FormRange";
import PotStats from "../PotStats";
import { AddMoneyActionResponse } from "@/lib/definition";
import { withdrawMoney } from "../../actions/pots";

type WithdrawMoneyFormProps = {
  selectedPot: SelectedPot;
};

const initialState: AddMoneyActionResponse = {
  success: false,
  message: "",
};

const WithdrawMoneyForm = ({ selectedPot }: WithdrawMoneyFormProps) => {
  const [state, action, pending] = useActionState(withdrawMoney, initialState);
  const [newAmount, setNewAmount] = useState(selectedPot.total);

  return (
    <>
      {state?.success ? (
        <p className="text-green-500">{state?.message}</p>
      ) : (
        <>
          <p className="mt-5 text-sm text-[#696868]">
            Withdraw from your pot to put money back in your main balance. This
            will reduce the amount you have in this pot.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#696868] capitalize">
              new amount
            </span>
            <span
              style={{ color: selectedPot.theme }}
              className="text-[2rem] font-bold"
            >
              {formatCurrency(Number(newAmount))}
            </span>
          </div>
          <div>
            <div className="h-2 bg-[#F8F4F0] rounded-md overflow-hidden">
              <FormRange
                target={Number(selectedPot.target)}
                total={Number(selectedPot.total)}
                theme={selectedPot.theme}
              />
            </div>

            <PotStats
              target={selectedPot.target as number}
              total={selectedPot.total as number}
            />
          </div>

          <form action={action} className="mt-5 space-y-4">
            <input type="hidden" value={selectedPot.id} name="id" />
            <input
              type="hidden"
              value={selectedPot.target as number}
              name="target"
            />
            <div className="flex flex-col gap-1">
              <label
                htmlFor="total"
                className=" text-[#696868] text-xs font-bold"
              >
                Amount to Withdraw
              </label>
              <input
                id="total"
                name="total"
                className="border-[#98908B] border rounded-lg h-[2.8125rem] px-5"
                defaultValue={state?.inputs?.total}
                onChange={(e) =>
                  setNewAmount(
                    Number(selectedPot.total) - Number(e.target.value)
                  )
                }
                type="text"
                placeholder="$ 1000"
                required
              />
            </div>
            {state?.errors?.total && (
              <p className="text-red-500">{state.errors.total}</p>
            )}

            <button
              disabled={pending}
              type="submit"
              className="mt-8 text-white bg-[#201F24] h-[3.3125rem] w-full rounded-lg capitalize font-bold"
            >
              {pending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⚪</span>
                  adding...
                </span>
              ) : (
                "confirm withdrawal"
              )}
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default WithdrawMoneyForm;
