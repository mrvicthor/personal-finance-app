"use client";
import { useActionState } from "react";

import { AddPotActionResponse } from "@/lib/definition";
import { addPot } from "../../actions/pots";
import InputField from "@/components/forms/inputField";
import CustomThemeSelect from "@/components/forms/customSelect";
import PotInputField from "@/components/forms/potInputField";

const initialState: AddPotActionResponse = {
  success: false,
  message: "",
};

const CreatePotForm = () => {
  const [state, action, pending] = useActionState(addPot, initialState);

  return (
    <>
      {state?.success === true ? (
        <p className="text-green-500">{state?.message}</p>
      ) : (
        <>
          <p className="mt-5 text-sm text-[#696868]">
            Create a pot to set savings targets. These can help keep you on
            track as you save for special purchases.
          </p>

          <form
            data-testid="add-pot-form"
            action={action}
            className="mt-5 space-y-4"
          >
            <input type="hidden" value={0} name="total" />
            <PotInputField
              id="potName"
              name="potName"
              label="pot name"
              error={state?.errors?.potName}
              value={state?.inputs?.potName as string}
            />

            <InputField
              id="target"
              label="target"
              name="target"
              value={state?.inputs?.target}
              placeholder="$ e.g 2000"
              error={state?.errors?.target?.[0]}
              type="text"
            />

            <CustomThemeSelect
              id="theme"
              label="color tag"
              name="theme"
              error={state?.errors?.theme?.[0]}
            />

            <button
              disabled={pending}
              type="submit"
              className="mt-8 text-white bg-[#201F24] h-[3.3125rem] w-full rounded-lg capitalize font-bold"
            >
              {pending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⚪</span>
                  processing...
                </span>
              ) : (
                "add pot"
              )}
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default CreatePotForm;
