"use client";

import { useFormState } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRight, CalendarIcon, PoundSterlingIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
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
import { createTransferAction } from "../../actions";
import { useActionState, useState } from "react";
import { Card } from "@/components/ui/card";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const CreateForm = ({
  categories,
}: {
  categories: {
    id: string;
    name: string;
    subCategories: { id: string; name: string }[];
  }[];
}) => {
  const [state, formAction] = useActionState(createTransferAction, {
    errors: {
      id: [],
      date: [],
      from: [],
      to: [],
      category: [],
      amount: [],
      notes: [],
    },
  })

  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <form action={formAction}>
      <div className="flex gap-6">
        <div className="w-full max-w-sm">
          <h4 className="font-semibold">Key information</h4>
          <p className="text-sm text-muted-foreground">
            The summary details of this transfer.
          </p>
        </div>
        <Card className="p-6 bg-secondary flex-1">
          <Label htmlFor="amount">Amount</Label>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 pl-2 flex items-center">
              <PoundSterlingIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              id="amount"
              name="amount"
              type="number"
              autoComplete="off"
              autoFocus
              className="mt-1 w-full max-w-xs pl-7 mb-6"
              step="0.01"
            />
          </div>
          {state.errors.amount?.length || 0 > 0 ? (
            <ErrorMessage className="-mt-4 mb-b">
              {state.errors.amount?.join(", ")}
            </ErrorMessage>
          ) : (
            ""
          )}

          <Label htmlFor="date">Date</Label>
          <div className="mt-1">
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
        </Card>
      </div>

      <div className="h-px bg-border my-6" />

      <div className="flex gap-6">
        <div className="w-full max-w-sm">
          <h4 className="font-semibold">Categories</h4>
          <p className="text-sm text-muted-foreground">
            Select where the transfer has occurred, and give it a category.
          </p>
        </div>
        <Card className="p-6 bg-secondary flex-1">
          <div className="flex">
            <div>
              <Label htmlFor="from">Moving from</Label>
              <Select name="from">
                <SelectTrigger className="mt-1 w-full mb-6">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="charity">Charity</SelectItem>
                    <SelectItem value="club">Club</SelectItem>
                    <SelectItem value="dutch">Dutch visit</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {state.errors.from?.length || 0 > 0 ? (
                <ErrorMessage className="-mt-4 mb-b">
                  {state.errors.from?.join(", ")}
                </ErrorMessage>
              ) : (
                ""
              )}
            </div>
              <div className="mt-10 px-3">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            <div>
              <Label htmlFor="to">Moving to</Label>
              <Select name="to">
                <SelectTrigger className="mt-1 w-full max-w-md mb-6">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="charity">Charity</SelectItem>
                    <SelectItem value="club">Club</SelectItem>
                    <SelectItem value="dutch">Dutch visit</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {state.errors.to?.length || 0 > 0 ? (
                <ErrorMessage className="-mt-4 mb-b">
                  {state.errors.to?.join(", ")}
                </ErrorMessage>
              ) : (
                ""
              )}
            </div>
          </div>


          <Label htmlFor="category">Category</Label>
          <Select name="category">
            <SelectTrigger className="mt-1 w-full max-w-lg">
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
          {state.errors.category?.length || 0 > 0 ? (
            <ErrorMessage className="-mt-4 mb-b">
              {state.errors.category?.join(", ")}
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
            Add any extra information required for the transfer.
          </p>
        </div>
        <Card className="p-6 bg-secondary flex-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" className="mt-1 w-full" />
          {state.errors.notes?.length || 0 > 0 ? (
            <ErrorMessage className="-mt-4 mb-b">
              {state.errors.notes?.join(", ")}
            </ErrorMessage>
          ) : (
            ""
          )}
        </Card>
      </div>

      <div className="mt-6 justify-end flex">

      <FormButton type="submit">Add transfer</FormButton>
      </div>
    </form>
  );
};

export default CreateForm;
