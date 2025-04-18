"use client";
import React, { useState, useActionState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/helpers";
import { AddTransactionActionResponse } from "@/lib/definition";
import { addTransaction } from "../../db/transactions";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const initialState: AddTransactionActionResponse = {
  success: false,
  message: "",
};
const AddTransactionForm = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [state, action, pending] = useActionState(addTransaction, initialState);

  return (
    <>
      {state?.success === true ? (
        <p className="text-green-500">{state?.message}</p>
      ) : (
        <form action={action} className="mt-5 space-y-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="sender"
              className="capitalize text-[#696868] text-xs font-bold"
            >
              recipient / sender
            </label>
            <input
              id="sender"
              name="sender"
              className="border-[#98908B] border rounded-lg h-[2.8125rem] px-5"
              type="text"
              placeholder="e.g John Doe"
              required
            />
          </div>
          {state?.errors?.sender && (
            <p className="text-red-500">{state.errors.sender}</p>
          )}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="category"
              className="capitalize text-[#696868] text-xs font-bold"
            >
              category
            </label>
            <Select name="category">
              <SelectTrigger className="h-[45px] border-[#98908B]">
                <SelectValue placeholder="Entertainment" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => {
                  return (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          {state?.errors?.category && (
            <p className="text-red-500">{state.errors.category}</p>
          )}
          <div className="flex flex-col gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left h-[45px] border-[#98908B] font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>transaction date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <input
              type="hidden"
              name="transactionDate"
              value={date?.toISOString()}
            />
          </div>
          {state?.errors?.transactionDate && (
            <p className="text-red-500">
              {state.errors.transactionDate} here {date?.toISOString()}
            </p>
          )}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="amount"
              className="capitalize text-[#696868] text-xs font-bold"
            >
              amount
            </label>
            <input
              id="amount"
              name="amount"
              className="border-[#98908B] border rounded-lg h-[2.8125rem] px-5"
              type="text"
              placeholder="$ e.g 2000"
              required
            />
          </div>
          {state?.errors?.amount && (
            <p className="text-red-500">{state.errors.amount}</p>
          )}
          <div className="flex flex-col space-x-2">
            <label
              htmlFor="recurring"
              className="capitalize text-[#696868] text-xs font-bold"
            >
              is it Recurring?
            </label>
            <RadioGroup
              name="recurring"
              defaultValue="false"
              className="flex mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="true" />
                <Label htmlFor="true">True</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="false" />
                <Label htmlFor="false">False</Label>
              </div>
            </RadioGroup>
          </div>
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
              "add transaction"
            )}
          </button>
        </form>
      )}
    </>
  );
};

export default AddTransactionForm;
