import React, { useActionState, useState } from "react";
import { AddMoneyActionResponse } from "@/lib/definition";
import { addMoney } from "../../actions/pots";
import { SelectedPot } from "@/types/pot";
import { formatCurrency } from "@/helpers/currencyFormatter";
import PotStats from "../PotStats";
import FormRange from "../FormRange";

const initialState: AddMoneyActionResponse = {
  success: false,
  message: "",
};
type AddMoneyFormProps = {
  selectedPot: SelectedPot;
};
const AddMoneyForm = ({ selectedPot }: AddMoneyFormProps) => {
  const [state, action, pending] = useActionState(addMoney, initialState);
  const [newAmount, setNewAmount] = useState(selectedPot.total);

  return (
    <>
      {state?.success ? (
        <p className="text-green-500">{state?.message}</p>
      ) : (
        <>
          <p className="mt-5 text-sm text-[#696868]">
            Add money to your pot to keep it separate from your main balance. As
            soon as you add this money, it will be deducted from your current
            balance.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#696868] capitalize">
              new amount
            </span>
            <span className="text-[2rem] font-bold text-[#201F24]">
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
                Amount to Add
              </label>
              <input
                id="total"
                name="total"
                className="border-[#98908B] border rounded-lg h-[2.8125rem] px-5"
                defaultValue={state?.inputs?.total}
                onChange={(e) =>
                  setNewAmount(
                    Number(e.target.value) + Number(selectedPot.total)
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
                "confirm addition"
              )}
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default AddMoneyForm;
