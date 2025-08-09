"use client";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export function DateRangePicker({
  className,
  defaultFrom,
  defaultTo,
}: React.HTMLAttributes<HTMLDivElement> & {
  defaultFrom?: Date;
  defaultTo?: Date;
}) {
  const [date, setDate] = useState<DateRange | undefined>({
    from:
      defaultFrom ||
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to:
      defaultTo ||
      addDays(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 28),
  });

  return (
    <div className={cn("", className)}>
      <input
        type="hidden"
        name="from"
        value={date?.from && format(date.from, "yyyy-MM-dd")}
      />
      <input
        type="hidden"
        name="to"
        value={date?.to && format(date.to, "yyyy-MM-dd")}
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 -ml-1.5 h-4 w-4 text-muted-foreground" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-64 h-84 p-0 overflow-hidden bg-popover-foreground text-popover rounded-md z-50 border shadow-md outlien-none"
          align="start"
        >
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            className="w-full"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
