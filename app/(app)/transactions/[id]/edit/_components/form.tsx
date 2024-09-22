"use client";

import { useFormState } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PoundSterlingIcon } from "lucide-react";
import SelectCategory from "./categories";
import { Textarea } from "@/components/ui/textarea";
import UploadFiles from "./upload";
import { FormButton } from "@/components/form-button";
import { ErrorMessage } from "@/components/ui/typography";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { updateTransactionAction } from "../actions";

const EditForm = ({
  transaction,
  categories,
}: {
  transaction: {
    id: string;
    name: string;
    date: Date;
    receiptBookNumber: number | null;
    account: "club" | "charity" | "dutch" | null;
    income: string | null;
    expense: string | null;
    categoryId: string;
    subCategoryId: string | null;
    notes: string|null;
    file: {
      id: string;
      name: string;
      key: string;
      size: string | null;
      type: string | null;
    } | null;
  };
  categories: {
    id: string;
    name: string;
    subCategories: { id: string; name: string }[];
  }[];
}) => {
  const [state, formAction] = useFormState(updateTransactionAction, {
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
    <form action={formAction} className="max-w-2xl">
      <input type="hidden" name="id" defaultValue={transaction.id} />
      
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        name="name"
        type="text"
        autoComplete="off"
        required
        autoFocus
        defaultValue={transaction.name}
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
        defaultValue={format(transaction.date, "yyyy-MM-dd")}
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

      <Label htmlFor="account">Account</Label>
      <Select name="account" defaultValue={transaction.account || undefined}>
        <SelectTrigger className="mt-1 w-full mb-6">
          <SelectValue placeholder="Select account" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              defaultChecked={transaction.account === "charity"}
              value="charity"
            >
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full flex-shrink-0 bg-orange-600" />
                <span className="capitalize">Charity</span>
              </div>
            </SelectItem>
            <SelectItem
              defaultChecked={transaction.account === "club"}
              value="club"
            >
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full flex-shrink-0 bg-cyan-600" />
                <span className="capitalize">Club</span>
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Label htmlFor="receiptBookNumber">Receipt book number</Label>
      <Input
        id="number"
        name="receiptBookNumber"
        type="receiptBookNumber"
        autoComplete="off"
        step={1}
        className="mt-1 w-full mb-6"
        defaultValue={transaction.receiptBookNumber?.toString()}
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
              defaultValue={transaction.income || ""}
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
              defaultValue={transaction.expense || ""}
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

      <SelectCategory
        categoryId={transaction.categoryId}
        subCategoryId={transaction.subCategoryId}
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

      <Label htmlFor="notes">Notes</Label>
      <Textarea
        id="notes"
        name="notes"
        defaultValue={transaction.notes || ""}
        className="mt-1 w-full mb-6"
      />
      {state.errors.notes?.length || 0 > 0 ? (
        <ErrorMessage className="-mt-4 mb-4">
          {state.errors.notes?.join(", ")}
        </ErrorMessage>
      ) : (
        ""
      )}

      <Label htmlFor="fileId">File</Label>
      <UploadFiles defaultValue={transaction.file || undefined} />
      {state.errors.fileId?.length || 0 > 0 ? (
        <ErrorMessage className="-mt-4 mb-4">
          {state.errors.fileId?.join(", ")}
        </ErrorMessage>
      ) : (
        ""
      )}

      <FormButton type="submit">Update transaction</FormButton>
    </form>
  );
};

export default EditForm;