import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Caption, Heading, Title } from "@/components/ui/typography";
import { selectCategory } from "@/models/category";
import { notFound } from "next/navigation";
import { getMonth } from "date-fns";

import { DataTable } from "@/components/data-table";
import { columns } from "./_components/table";

const CategoryPage = async ({ params }: { params: { id: string, subId: string } }) => {
  const category = await selectCategory(params.id);
  if (!category) notFound();

  const subCategory = category.subCategories.find(subCategory => subCategory.id === params.subId);
  if (!subCategory) notFound();

  const monthlyTotal = (month: number | null, type: "income" | "expense", subCategory?: string) => {
    const transactions = category.transactions
      .filter((transaction) => {
        const transactionType =
          transaction.income !== null ? "income" : "expense";
        if (
          (month !== null ? getMonth(transaction.date) === month : true) &&
          (subCategory ? transaction.subCategoryId === subCategory : true) &&
          type === transactionType
        )
          return true;
      })
      .map((transaction) => transaction[type]);

    const total = transactions.reduce(
      (total, current) => total + parseFloat(current || ""),
      0
    );

    return total;
  };

  const income = monthlyTotal(null, "income", subCategory.id)
  const expense = monthlyTotal(null, "expense", subCategory.id)

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Categories</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{category.name}</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{subCategory.name}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Badge
        variant={`outline-accent${category.account === "charity" ? "1" : "2"}`}
      >
        {category.account}
      </Badge>

      <div className="flex items-baseline justify-between">
        <Title>{category.name} <span className="text-muted-foreground px-1">/</span> {subCategory.name}</Title>
      </div>

      <div className="flex gap-6">
        <div>
          <Caption>Income</Caption>
          <p className="text-3xl font-mono font-semibold tracking-tight">
            {new Intl.NumberFormat("en-GB", {
              style: "currency",
              currency: "GBP",
            }).format(income)}
          </p>
        </div>
        <div>
          <Caption>Expense</Caption>
          <p className="text-3xl font-mono font-semibold tracking-tight">
            {new Intl.NumberFormat("en-GB", {
              style: "currency",
              currency: "GBP",
            }).format(expense)}
          </p>
        </div>
        <div>
          <Caption>Balance <span className="italic text-sm">(to date)</span></Caption>
          <p className="text-3xl font-mono font-semibold tracking-tight">
            {new Intl.NumberFormat("en-GB", {
              style: "currency",
              currency: "GBP",
            }).format(income - expense)}
          </p>
        </div>
      </div>

      <div className="my-6 flex">
        <div style={{width: `${(income*100)/(income + expense)}%`}} className="bg-[#2563eb] h-8 rounded-l-md" />
        <div style={{width: `${(expense*100)/(income + expense)}%`}} className="bg-[#60a5fa] h-8 rounded-r-md" />
      </div>

      <Heading className="mt-6">Transactions</Heading>
      <DataTable columns={columns} data={category.transactions.filter(transaction => transaction.subCategoryId === subCategory.id)} />
    </>
  );
};

export default CategoryPage;
