import React, { Suspense, useActionState } from "react";
import { Budget } from "../EditBudget";
import { deleteBudget } from "../../db/budget";
import { DeleteBudgetActionResponse } from "@/app/lib/definition";
import Loading from "@/components/loading";

type DeleteBudgetFormProps = {
  selected: Budget;
  handleModal: () => void;
};

const initialState: DeleteBudgetActionResponse = {
  success: false,
  message: "",
};
const DeleteBudgetForm = ({ selected, handleModal }: DeleteBudgetFormProps) => {
  const [state, action, pending] = useActionState(deleteBudget, initialState);
  return (
    <Suspense fallback={<Loading />}>
      {state?.success ? (
        <p className="text-green-500">{state?.message}</p>
      ) : (
        <>
          <p className="mt-5 text-sm text-[#696868]">
            Are you sure you want to delete this budget? This action cannot be
            reversed, and all the data inside it will be removed forever.
          </p>
          <form action={action} className="mt-4 space-y-4">
            <input type="hidden" name="id" defaultValue={selected.id} />
            <button
              disabled={pending}
              type="submit"
              className=" text-white bg-[#C94736] h-[3.3125rem] w-full rounded-lg capitalize font-bold"
            >
              {pending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⚪</span>
                  deleting...
                </span>
              ) : (
                "yes, confirm deletion"
              )}
            </button>
          </form>

          <button
            onClick={handleModal}
            className=" text-[#696868] mt-3 w-full rounded-lg capitalize"
          >
            no, go back
          </button>
        </>
      )}
    </Suspense>
  );
};

export default DeleteBudgetForm;
