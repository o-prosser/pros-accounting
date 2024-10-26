"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PoundSterlingIcon } from "lucide-react";
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
import { useActionState } from "react";
import { SelectTransfer } from "@/drizzle/schema";
import { updateTransferAction } from "../../../actions";
import { format } from "date-fns";

const EditForm = ({
  categories,
  transfer
}: {
  categories: {
    id: string;
    name: string;
  }[];
  transfer: SelectTransfer;
}) => {
  const [state, formAction] = useActionState(updateTransferAction, {
    errors: {
      id: [],
      date: [],
      from: [],
      to: [],
      amount: [],
      category: [],
      notes: [],
    },
  });

  return (
    <form action={formAction} className="max-w-2xl">
      <input type="hidden" name="id" defaultValue={transfer.id} />

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
          defaultValue={transfer.amount}
          autoFocus
          className="mt-1 w-full pl-7 mb-6"
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
      <Input
        id="date"
        name="date"
        type="date"
        autoComplete="off"
        defaultValue={format(transfer.date, "yyyy-MM-dd")}
        required
        className="mt-1 w-full min-w-[calc(100%-1rem)] mb-6"
      />
      {state.errors.date?.length || 0 > 0 ? (
        <ErrorMessage className="-mt-4 mb-b">
          {state.errors.date?.join(", ")}
        </ErrorMessage>
      ) : (
        ""
      )}

      <Label htmlFor="from">Moving from</Label>
      <Select name="from" defaultValue={transfer.from}>
        <SelectTrigger className="mt-1 w-full mb-6">
          <SelectValue placeholder="Select account" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              value="charity"
              defaultChecked={transfer.from === "charity"}
            >
              Charity
            </SelectItem>
            <SelectItem value="club" defaultChecked={transfer.from === "club"}>
              Club
            </SelectItem>
            <SelectItem
              value="dutch"
              defaultChecked={transfer.from === "dutch"}
            >
              Dutch visit
            </SelectItem>
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

      <Label htmlFor="to">Moving to</Label>
      <Select name="to" defaultValue={transfer.to}>
        <SelectTrigger className="mt-1 w-full mb-6">
          <SelectValue placeholder="Select account" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              value="charity"
              defaultChecked={transfer.to === "charity"}
            >
              Charity
            </SelectItem>
            <SelectItem value="club" defaultChecked={transfer.to === "club"}>
              Club
            </SelectItem>
            <SelectItem
              value="dutch"
              defaultChecked={transfer.to === "dutch"}
            >
              Dutch visit
            </SelectItem>
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

      <Label htmlFor="category">Category</Label>
      <Select name="category" defaultValue={transfer.categoryId || undefined}>
        <SelectTrigger className="mt-1 w-full max-w-lg mb-6">
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

      <Label htmlFor="notes">Notes</Label>
      <Textarea id="notes" name="notes" className="mt-1 w-full mb-6" defaultValue={transfer.notes || ""} />
      {state.errors.notes?.length || 0 > 0 ? (
        <ErrorMessage className="-mt-4 mb-b">
          {state.errors.notes?.join(", ")}
        </ErrorMessage>
      ) : (
        ""
      )}

      <FormButton type="submit">Update transfer</FormButton>
    </form>
  );
};

export default EditForm;
