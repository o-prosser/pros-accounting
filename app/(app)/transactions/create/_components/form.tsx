"use client";

import { createTransactionAction } from "../actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CalendarIcon, PoundSterlingIcon } from "lucide-react";
import SelectCategory from "./categories";
import { Textarea } from "@/components/ui/textarea";
import UploadFiles from "./upload";
import { FormButton } from "@/components/form-button";
import { ErrorMessage } from "@/components/ui/typography";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const CreateForm = ({
  searchParams,
  categories,
}: {
  searchParams: { [key: string]: string };
  categories: {
    id: string;
    name: string;
    subCategories: { id: string; name: string }[];
  }[];
}) => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const [state, formAction] = useActionState(createTransactionAction, {
    errors: {
      name: [],
      date: [],
      account: [],
      receiptBookNumber: [],
      income: [],
      expense: [],
      category: [],
      subCategory: [],
      notes: [],
      fileId: [],
    },
  });

  return (
    <form action={formAction}>
      <div className="flex gap-6">
        <div className="w-full max-w-sm">
          <h4 className="font-semibold">Key information</h4>
          <p className="text-sm text-muted-foreground">
            The summary details of this transaction.
          </p>
        </div>
        <Card className="p-6 bg-secondary flex-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            required
            autoFocus
            defaultValue={searchParams.name || ""}
            className="mt-1 w-full max-w-lg mb-6"
          />
          {state.errors.name?.length || 0 > 0 ? (
            <ErrorMessage className="-mt-4 mb-6">
              {state.errors.name?.join(", ")}
            </ErrorMessage>
          ) : (
            ""
          )}

          <Label htmlFor="date">Date</Label>
          <div className="mt-1 mb-6">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full max-w-lg justify-start text-left font-normal",
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
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <input
            type="hidden"
            name="date"
            value={date ? format(date, "yyyy-MM-dd") : ""}
          />
          {state.errors.date?.length || 0 > 0 ? (
            <ErrorMessage className="-mt-4 mb-b">
              {state.errors.date?.join(", ")}
            </ErrorMessage>
          ) : (
            ""
          )}

          <div>
            <Label htmlFor="income">Income</Label>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 pl-2 flex items-center">
                <PoundSterlingIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                id="income"
                name="income"
                type="income"
                autoComplete="off"
                className="mt-1 w-40 mb-6 pl-7"
                defaultValue={searchParams.income || ""}
                step="0.01"
              />
            </div>
            {state.errors.income?.length || 0 > 0 ? (
              <ErrorMessage className="mt-2">
                {state.errors.income?.join(", ")}
              </ErrorMessage>
            ) : (
              ""
            )}
          </div>
          <div>
            <Label htmlFor="expense">Expense</Label>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 pl-2 flex items-center">
                <PoundSterlingIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                id="expense"
                name="expense"
                type="income"
                autoComplete="off"
                defaultValue={searchParams.expense || ""}
                className="mt-1 w-40 pl-7"
                step="0.01"
              />
            </div>
            {state.errors.expense?.length || 0 > 0 ? (
              <ErrorMessage className="mt-2">
                {state.errors.expense?.join(", ")}
              </ErrorMessage>
            ) : (
              ""
            )}
          </div>
        </Card>
      </div>

      <div className="h-px bg-border my-6" />

      <div className="flex gap-6">
        <div className="w-full max-w-sm">
          <h4 className="font-semibold">Categories</h4>
          <p className="text-sm text-muted-foreground">
            Select the account the transaction belongs to, and give it a
            category.
          </p>
        </div>
        <Card className="p-6 bg-secondary flex-1">
          <Label className="">Account</Label>
          <RadioGroup
            name="account"
            className="mt-1 mb-6"
            required
            defaultValue={searchParams.account}
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem
                value="charity"
                id="charity"
                className="text-orange-600"
              />
              <Label htmlFor="charity" className="font-normal">
                Charity
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem
                value="club"
                id="club"
                className="text-cyan-600"
              />
              <Label htmlFor="club" className="font-normal">
                Club
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem
                value="Dutch"
                id="Dutch"
                className="text-green-600"
              />
              <Label htmlFor="Dutch" className="font-normal">
                Dutch Visit
              </Label>
            </div>
          </RadioGroup>

          <SelectCategory
            defaultValues={searchParams}
            categories={categories}
          />
          {state.errors.category?.length || 0 > 0 ? (
            <ErrorMessage className="-mt-4 mb-4">
              {state.errors.category?.join(", ")}
            </ErrorMessage>
          ) : (
            ""
          )}
          {state.errors.subCategory?.length || 0 > 0 ? (
            <ErrorMessage className="-mt-4 mb-4">
              {state.errors.subCategory?.join(", ")}
            </ErrorMessage>
          ) : (
            ""
          )}
        </Card>
      </div>

      <div className="h-px bg-border my-6" />

      <div className="flex gap-6">
        <div className="w-full max-w-sm">
          <h4 className="font-semibold">Other details</h4>
          <p className="text-sm text-muted-foreground">
            Add any extra information required for the transaction.
          </p>
        </div>
        <Card className="p-6 bg-secondary flex-1">
          <Label htmlFor="receiptBookNumber">Receipt book number</Label>
          <Input
            id="number"
            name="receiptBookNumber"
            type="receiptBookNumber"
            autoComplete="off"
            step={1}
            className="mt-1 w-40 mb-6"
          />
          {state.errors.receiptBookNumber?.length || 0 > 0 ? (
            <ErrorMessage className="-mt-4 mb-6">
              {state.errors.receiptBookNumber?.join(", ")}
            </ErrorMessage>
          ) : (
            ""
          )}

          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" className="mt-1 w-full mb-6" />
          {state.errors.notes?.length || 0 > 0 ? (
            <ErrorMessage className="-mt-4 mb-4">
              {state.errors.notes?.join(", ")}
            </ErrorMessage>
          ) : (
            ""
          )}

          <Label htmlFor="fileId">File</Label>
          <UploadFiles />
          {state.errors.fileId?.length || 0 > 0 ? (
            <ErrorMessage className="-mt-4 mb-4">
              {state.errors.fileId?.join(", ")}
            </ErrorMessage>
          ) : (
            ""
          )}
        </Card>
      </div>

      <div className="mt-6 justify-end flex">
        <FormButton type="submit">Add transaction</FormButton>
      </div>
    </form>
  );
};

export default CreateForm;
