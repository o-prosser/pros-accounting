import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Title } from "@/components/ui/typography";
import { selectCategoriesMin } from "@/models/category";
import SelectCategory from "./_components/categories";
import { Textarea } from "@/components/ui/textarea";
import { updateTransactionAction } from "./actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PoundSterlingIcon } from "lucide-react";
import { FormButton } from "@/components/form-button";
import UploadFiles from "./_components/upload";
import { selectCurrentOrganisation } from "@/models/organisation";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { format } from "date-fns";

const TransactionsEditPage = async ({params}: {params: {id: string}}) => {
  const categories = await selectCategoriesMin();
  const organisation = await selectCurrentOrganisation();

  const transaction = await db.query.transactionsTable.findFirst({
    where: (fields, {and, eq}) => and(eq(fields.id, params.id), eq(fields.organisationId, organisation.id)),
    with: {
      file: true,
    }
  });
  if (!transaction) notFound();

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Transactions</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Edit transaction</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Title>Edit transaction</Title>

      <form action={updateTransactionAction} className="max-w-2xl">
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

        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          name="date"
          type="date"
          autoComplete="off"
          required
          defaultValue={format(transaction.date, "yyyy-MM-dd")}
          className="mt-1 w-full min-w-[20rem] mb-6"
        />

        <Label htmlFor="receiptBookNumber">Receipt book number</Label>
        <Input
          id="number"
          name="receiptBookNumber"
          type="receiptBookNumber"
          autoComplete="off"
          defaultValue={transaction.receiptBookNumber?.toString()}
          step={1}
          className="mt-1 w-full mb-6"
        />

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
          </div>
        </div>

        <SelectCategory categoryId={transaction.categoryId} subCategoryId={transaction.subCategoryId} categories={categories} />

        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" defaultValue={transaction.notes || ""} className="mt-1 w-full mb-6" />

        <Label htmlFor="fileId">File</Label>
        <UploadFiles defaultValue={transaction.file || undefined} />

        <FormButton type="submit">Update transaction</FormButton>
      </form>
    </>
  );
};

export default TransactionsEditPage;
