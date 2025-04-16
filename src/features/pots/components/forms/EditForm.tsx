import Loading from "@/components/loading";
import React, { Suspense, useState, useActionState } from "react";
import { editPot } from "../../actions/pots";
import { EditPotsActionResponse } from "@/app/lib/definition";
import { Pot } from "../EditPot";
import { themes } from "@/helpers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialState: EditPotsActionResponse = {
  success: false,
  message: "",
};

type EditFormProps = {
  selected: Pot;
  usedThemes: string[];
};

const EditPotForm = ({ selected, usedThemes }: EditFormProps) => {
  const [state, action, pending] = useActionState(editPot, initialState);
  const [nameCount, setNameCount] = useState(selected.name);
  const [selectedTheme, setSelectedTheme] = useState<string>(selected.theme);

  return (
    <Suspense fallback={<Loading />}>
      {state?.success ? (
        <p className="text-green-500">{state?.message}</p>
      ) : (
        <>
          <p className="mt-5 text-sm text-[#696868]">
            As your budget change, feel free to update your spending limit.
          </p>

          <form action={action} className="mt-5 space-y-4">
            <input type="hidden" name="id" defaultValue={selected.id} />
            <input
              type="hidden"
              name="total"
              defaultValue={selected.total as number}
            />
            <input
              type="hidden"
              name="target"
              defaultValue={selected.target as number}
            />
            <input type="hidden" name="potName" value={selected.name} />

            <input type="hidden" name="theme" value={selectedTheme} />

            <input type="hidden" value={0} name="total" />
            <div className="flex flex-col gap-1">
              <label
                htmlFor="potName"
                className="capitalize text-[#696868] text-xs font-bold"
              >
                pot name
              </label>
              <input
                id="potName"
                name="potName"
                className="border-[#98908B] border rounded-lg h-[2.8125rem] px-5"
                defaultValue={state?.inputs?.potName}
                onChange={(e) => setNameCount(e.target.value)}
                type="text"
                placeholder="e.g Rainy Days"
                required
              />
              <p className="text-right text-xs text-[#696868]">
                {nameCount.length ? 30 - nameCount.length : 30}
                <span className="pl-1">characters left</span>
              </p>
            </div>

            {state?.errors?.potName && (
              <p className="text-red-500">{state.errors.potName}</p>
            )}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="target"
                className="capitalize text-[#696868] text-xs font-bold"
              >
                target
              </label>
              <input
                id="target"
                name="target"
                className="border-[#98908B] border rounded-lg h-[2.8125rem] px-5"
                defaultValue={state?.inputs?.target}
                type="text"
                placeholder="$ e.g 2000"
                required
              />
            </div>
            {state?.errors?.target && (
              <p className="text-red-500">{state.errors.target}</p>
            )}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="theme"
                className="capitalize text-[#696868] text-xs font-bold"
              >
                theme
              </label>
              <Select
                name="theme"
                defaultValue={selected.theme}
                onValueChange={(value) => setSelectedTheme(value)}
              >
                <SelectTrigger
                  id="theme"
                  className="h-[45px] w-full border-[#98908B]"
                >
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>

                <SelectContent>
                  {themes.map((theme) => {
                    const isUsed = usedThemes.includes(theme.theme);
                    return (
                      <SelectItem
                        key={theme.theme}
                        value={theme.theme}
                        disabled={isUsed}
                        className="flex justify-between item-center gap-4 text-xs"
                      >
                        <span
                          className="h-4 w-4 rounded-full relative top-[2px] inline-block"
                          style={{ backgroundColor: theme.theme }}
                        />

                        <span className="inline-block pl-2">{theme.label}</span>
                        {isUsed && !selected.theme && (
                          <span className="absolute top-[2px] right-4">
                            Already Used
                          </span>
                        )}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {state?.errors?.theme && (
              <p className="text-red-500">{state.errors.theme}</p>
            )}

            <button
              disabled={pending}
              type="submit"
              className="mt-8 text-white bg-[#201F24] h-[3.3125rem] w-full rounded-lg capitalize font-bold"
            >
              {pending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⚪</span>
                  saving...
                </span>
              ) : (
                "save changes"
              )}
            </button>
          </form>
        </>
      )}
    </Suspense>
  );
};

export default EditPotForm;
