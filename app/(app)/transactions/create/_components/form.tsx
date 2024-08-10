"use client";

import { useFormState } from "react-dom";
import { createTransactionAction } from "../actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PoundSterlingIcon } from "lucide-react";
import SelectCategory from "./categories";
import { Textarea } from "@/components/ui/textarea";
import UploadFiles from "./upload";
import { FormButton } from "@/components/form-button";
import { ErrorMessage } from "@/components/ui/typography";

const CreateForm = ({
  searchParams,
  categories,
}: {
  searchParams: { [key: string]: string };
  categories: {
    id: string;
    name: string;
    account: "charity" | "club";
    subCategories: { id: string; name: string }[];
  }[];
}) => {
  const [state, formAction] = useFormState(createTransactionAction, {
    errors: {
    name: [],
    date: [],
    receiptBookNumber: [],
    income: [],
    expense: [],
    category: [],
    account: [],
    subCategory: [],
    notes: [],
    fileId: [],
    }
  });

  return (
    <form action={formAction} className="max-w-2xl">
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
      <Input
        id="date"
        name="date"
        type="date"
        autoComplete="off"
        required
        className="mt-1 w-full min-w-[20rem] mb-6"
      />
      {state.errors.date?.length || 0 > 0 ? (
        <ErrorMessage className="-mt-4 mb-b">
          {state.errors.date?.join(", ")}
        </ErrorMessage>
      ) : (
        ""
      )}

      <Label htmlFor="receiptBookNumber">Receipt book number</Label>
      <Input
        id="number"
        name="receiptBookNumber"
        type="receiptBookNumber"
        autoComplete="off"
        step={1}
        className="mt-1 w-full mb-6"
      />
      {state.errors.receiptBookNumber?.length || 0 > 0 ? (
        <ErrorMessage className="-mt-4 mb-6">
          {state.errors.receiptBookNumber?.join(", ")}
        </ErrorMessage>
      ) : (
        ""
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
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
              className="mt-1 w-full pl-7"
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
              className="mt-1 w-full pl-7"
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
      </div>

      <SelectCategory defaultValues={searchParams} categories={categories} />
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

      <FormButton type="submit">Add transaction</FormButton>
    </form>
  );
};

export default CreateForm;