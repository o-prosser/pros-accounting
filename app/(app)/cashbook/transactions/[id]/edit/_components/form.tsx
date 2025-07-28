"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ErrorMessage } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  ArrowLeftRightIcon,
  CalendarIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  PoundSterlingIcon,
} from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { FormButton } from "@/components/form-button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { SelectFile, SelectTransaction } from "@/drizzle/schema";
import { updateTransactionAction } from "../actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import UploadFiles from "./file-upload";

const EditTransactionForm = ({
  transaction,
  categories,
}: {
  transaction: SelectTransaction & { file: SelectFile | null };
  categories: {
    id: string;
    name: string;
    // subCategories: { id: string; name: string }[];
  }[];
}) => {
  const [type, setType] = useState(
    transaction.expense !== null ? "expense" : "income",
  );
  const [date, setDate] = useState<Date | undefined>(transaction.date);

  const router = useRouter();

  const [state, formAction] = useActionState(updateTransactionAction, {
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
      router.back();
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="w-full">
      <input type="hidden" name="id" defaultValue={transaction.id} />

      <div className="bg-muted text-muted-foreground grid grid-cols-2 h-9 rounded-lg p-[3px] gap-1">
        <button
          type="button"
          className="data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow,background-color] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer hover:bg-background/50"
          data-state={type === "expense" ? "active" : ""}
          onClick={() => setType("expense")}
        >
          <MinusCircleIcon />
          Expense
        </button>
        <button
          type="button"
          className="data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow,background-color] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer hover:bg-background/50"
          data-state={type === "income" ? "active" : ""}
          onClick={() => setType("income")}
        >
          <PlusCircleIcon />
          Income
        </button>
      </div>

      <input type="hidden" name="type" value={type} />

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
          defaultValue={transaction.name}
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

      <div className="mt-3">
        <Label htmlFor="account">Account</Label>
        <Select
          name="account"
          defaultValue={transaction.account === "charity" ? "charity" : "club"}
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

      <div className="mt-3">
        <Label htmlFor="amount">Amount</Label>
        <div className="relative">
          <Input
            id="amount"
            name="amount"
            type="number"
            autoComplete="off"
            defaultValue={
              transaction.income
                ? transaction.income
                : transaction.expense || ""
            }
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
        <Select name="category" defaultValue={transaction.categoryId}>
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
          <PopoverContent
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
          </PopoverContent>
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

      <Accordion type="single" collapsible>
        <AccordionItem value="1">
          <AccordionTrigger className="bg-muted px-3 py-2 cursor-pointer mt-3">
            More details
          </AccordionTrigger>
          <AccordionContent>
            <div className="mt-2">
              <Label htmlFor="name">Receipt book number</Label>
              <Input
                id="receiptBookNumber"
                name="receiptBookNumber"
                type="number"
                autoComplete="off"
                defaultValue={transaction.receiptBookNumber || ""}
                className="mt-0.5 w-full"
              />
            </div>

            {type === "transfer" ? (
              ""
            ) : (
              <>
                <div className="mt-3">
                  <Label htmlFor="name">Notes</Label>
                  <Input
                    id="notes"
                    name="notes"
                    type="text"
                    autoComplete="off"
                    defaultValue={transaction.notes || ""}
                    className="mt-0.5 w-full"
                  />
                </div>

                <div className="mt-3">
                  <Label htmlFor="fileId">File</Label>
                  <UploadFiles file={transaction.file} />
                </div>
              </>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-4 flex justify-end">
        <FormButton>Update payment</FormButton>
      </div>
    </form>
  );
};

export default EditTransactionForm;
