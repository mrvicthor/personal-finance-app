import { useState } from "react";
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

type DateFieldProps = {
  name: string;
  error?: string[];
};
const DateField = ({ name, error }: DateFieldProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <>
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
        <input type="hidden" name={name} value={date?.toISOString()} />
      </div>
      {error && (
        <p className="text-red-500">
          {error} here {date?.toISOString()}
        </p>
      )}
    </>
  );
};

export default DateField;
