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
import EditCategory from "./_components/edit";
import { getMonth, isSameMonth } from "date-fns";

import { type ChartConfig } from "@/components/ui/chart";
import MonthlyChart from "./_components/monthly-chart";
import { DataTable } from "@/components/data-table";
import { columns } from "./_components/table";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

const CategoryPage = async ({ params }: { params: { id: string } }) => {
  const category = await selectCategory(params.id);
  if (!category) notFound();

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

  const totals = [
    {
      month: "January",
      income: monthlyTotal(0, "income"),
      expense: monthlyTotal(0, "expense"),
    },
    {
      month: "February",
      income: monthlyTotal(1, "income"),
      expense: monthlyTotal(1, "expense"),
    },
    {
      month: "March",
      income: monthlyTotal(2, "income"),
      expense: monthlyTotal(2, "expense"),
    },
    {
      month: "April",
      income: monthlyTotal(3, "income"),
      expense: monthlyTotal(3, "expense"),
    },
    {
      month: "May",
      income: monthlyTotal(4, "income"),
      expense: monthlyTotal(4, "expense"),
    },
    {
      month: "June",
      income: monthlyTotal(5, "income"),
      expense: monthlyTotal(5, "expense"),
    },
    {
      month: "July",
      income: monthlyTotal(6, "income"),
      expense: monthlyTotal(6, "expense"),
    },
    {
      month: "August",
      income: monthlyTotal(7, "income"),
      expense: monthlyTotal(7, "expense"),
    },
    {
      month: "September",
      income: monthlyTotal(8, "income"),
      expense: monthlyTotal(8, "expense"),
    },
    {
      month: "October",
      income: monthlyTotal(9, "income"),
      expense: monthlyTotal(9, "expense"),
    },
    {
      month: "November",
      income: monthlyTotal(10, "income"),
      expense: monthlyTotal(10, "expense"),
    },
    {
      month: "December",
      income: monthlyTotal(11, "income"),
      expense: monthlyTotal(11, "expense"),
    },
  ];

  const income = monthlyTotal(null, "income")
  const expense = monthlyTotal(null, "expense")

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Categories</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{category.name}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Badge
        variant={`outline-accent${category.account === "charity" ? "1" : "2"}`}
      >
        {category.account}
      </Badge>

      <div className="flex items-baseline justify-between">
        <Title>{category.name}</Title>
        <EditCategory category={category} />
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

      <MonthlyChart data={totals} />

      <Heading className="mt-6">Sub categories</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.subCategories.map((subCategory, idx) => (
          <Card key={idx}>
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-medium">{subCategory.name}</CardTitle>
              <CardDescription>{category.transactions.filter((transaction) => transaction.subCategoryId === subCategory.id).length} payments</CardDescription>
              <div className="flex items-end gap-2">
          <Caption className="text-sm">Income</Caption>
          <p className="text-xl font-mono font-semibold tracking-tight">
            {new Intl.NumberFormat("en-GB", {
              style: "currency",
              currency: "GBP",
            }).format(income)}
          </p>
        </div>
        <div className="flex items-end gap-2">
          <Caption className="text-sm">Expense</Caption>
          <p className="text-xl font-mono font-semibold tracking-tight">
            {new Intl.NumberFormat("en-GB", {
              style: "currency",
              currency: "GBP",
            }).format(expense)}
          </p>
        </div>
            </CardHeader>
            <CardFooter className="p-4 pt-0">
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/categories/${category.id}/${subCategory.id}`}>View transactions<ArrowRightIcon /></Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Heading className="mt-6">Transactions</Heading>
      <DataTable columns={columns} data={category.transactions} />
    </>
  );
};

export default CategoryPage;
