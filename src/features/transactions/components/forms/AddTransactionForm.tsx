"use client";
import React, { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";

const AddTransactionForm = () => {
  const [date, setDate] = useState<Date | undefined>();
  console.log(date);
  return (
    <form className="mt-5 space-y-4">
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
      </div>
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
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Is it <em>Recurring?</em>
        </label>
      </div>
      <button
        type="submit"
        className="mt-8 text-white bg-[#201F24] h-[3.3125rem] w-full rounded-lg capitalize font-bold"
      >
        {/*       
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⚪</span>
            processing...
          </span>
        ) : ( */}
        add transaction
        {/* )} */}
      </button>
    </form>
  );
};

export default AddTransactionForm;
