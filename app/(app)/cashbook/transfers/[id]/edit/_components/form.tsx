"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Popover as PopoverPrimitive } from "radix-ui";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, PoundSterlingIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { FormButton } from "@/components/form-button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { SelectTransfer } from "@/drizzle/schema";
import { updateTransferAction } from "../actions";

const EditTransferForm = ({
  transfer,
  categories,
}: {
  transfer: SelectTransfer;
  categories: {
    id: string;
    name: string;
    // subCategories: { id: string; name: string }[];
  }[];
}) => {
  const [from, setFrom] = useState<string | undefined>(transfer.from);
  const [date, setDate] = useState<Date | undefined>(transfer.date);

  const router = useRouter();

  const [state, formAction] = useActionState(updateTransferAction, {
    success: false,
    errors: null,
  });

  useEffect(() => {
    if (state.success === true) {
      toast({
        title: "Payment updated successfully",
        description: "The payment has been updated in the cashbook.",
        variant: "success",
      });
      router.push(`/cashbook`);
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="w-full">
      <input type="hidden" name="id" defaultValue={transfer.id} />

      {state.errors ? (
        <div className="rounded-lg border border-red-500 p-3 bg-red-500/10 text-sm text-red-500 mt-3">
          {state.errors}
        </div>
      ) : (
        ""
      )}

      <div className="mt-4">
        <Label htmlFor="name">Description</Label>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="off"
          required
          defaultValue={transfer.name || ""}
          className="mt-0.5 w-full"
        />
        {/* {state.errors.name?.length || 0 > 0 ? (
          <ErrorMessage className="-mt-4 mb-6">
            {state.errors.name?.join(", ")}
          </ErrorMessage>
        ) : (
          ""
        )} */}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <div>
          <Label htmlFor="account">From</Label>
          <Select name="account" value={from} onValueChange={setFrom}>
            <SelectTrigger className="mt-0.5 w-full">
              <SelectValue placeholder="Select an account" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="charity">Charity</SelectItem>
                <SelectItem value="club">Club</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="toAccount">To</Label>
          <Select
            name="toAccount"
            disabled
            value={from === "charity" ? "club" : "charity"}
          >
            <SelectTrigger className="mt-0.5 w-full">
              <SelectValue placeholder="Select an account" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="charity">Charity</SelectItem>
                <SelectItem value="club">Club</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-3">
        <Label htmlFor="amount">Amount</Label>
        <div className="relative">
          <Input
            id="amount"
            name="amount"
            type="number"
            autoComplete="off"
            defaultValue={transfer.amount}
            className="mt-0.5 w-full pl-7"
            step="0.01"
          />
          <div className="absolute left-0 top-0 inset-y-0 pl-2 flex items-center">
            <PoundSterlingIcon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        {/* {state.errors.amount?.length || 0 > 0 ? (
          <ErrorMessage className="-mt-4 mb-6">
            {state.errors.amount?.join(", ")}
          </ErrorMessage>
        ) : (
          ""
        )} */}
      </div>

      <div className="mt-3">
        <Label htmlFor="category">Category</Label>
        <Select name="category" defaultValue={transfer.categoryId || ""}>
          <SelectTrigger className="mt-0.5 w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.map((category, idx) => (
                <SelectItem value={category.id} key={idx}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-3 flex flex-col">
        <Label htmlFor="date">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon />
              {date ? (
                format(date, "PPP")
              ) : (
                <span className="font-medium">Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={4}
            className="z-50 rounded-md border bg-popover-foreground text-popover shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-64 overflow-hidden p-0 h-84"
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              captionLayout="dropdown"
              className="w-full"
            />
          </PopoverPrimitive.Content>
        </Popover>
        <input
          type="hidden"
          name="date"
          value={date ? format(date, "yyyy-MM-dd") : ""}
        />
        {/* {state.errors.date?.length || 0 > 0 ? (
          <ErrorMessage className="-mt-4 mb-6">
            {state.errors.date?.join(", ")}
          </ErrorMessage>
        ) : (
          ""
        )} */}
      </div>

      <div className="mt-4 flex justify-end">
        <FormButton>Update payment</FormButton>
      </div>
    </form>
  );
};

export default EditTransferForm;
