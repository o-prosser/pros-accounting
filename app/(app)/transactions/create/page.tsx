import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Title } from "@/components/ui/typography";
import { selectCategoriesMin } from "@/models/category";
import SelectCategory from "./_components/categories";
import { Textarea } from "@/components/ui/textarea";
import { createTransactionAction } from "./actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PoundSterlingIcon } from "lucide-react";

const TransactionsCreatePage = async () => {
  const categories = await selectCategoriesMin();

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Transactions</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Add transaction</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Title>Add a transaction</Title>

      <form action={createTransactionAction} className="max-w-2xl">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="off"
          required
          autoFocus
          className="mt-1 w-full max-w-lg mb-6"
        />

        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          name="date"
          type="date"
          autoComplete="off"
          required
          className="mt-1 w-full min-w-[20rem] mb-6"
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
                className="mt-1 w-full pl-7"
                step="0.01"
              />
            </div>
          </div>
        </div>

        <SelectCategory categories={categories} />

        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" className="mt-1 w-full mb-6" />

        <Button type="submit">Add transaction</Button>
      </form>
    </>
  );
};

export default TransactionsCreatePage;