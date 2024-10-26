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
import {
  addDays,
  addMonths,
  getMonth,
  isSameMonth,
  startOfMonth,
} from "date-fns";

import { type ChartConfig } from "@/components/ui/chart";
import MonthlyChart from "./_components/monthly-chart";
import { DataTable } from "@/components/data-table";
import { columns } from "./_components/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRightIcon,
  ClipboardListIcon,
  LoaderCircleIcon,
  PlusIcon,
} from "lucide-react";
import { Metadata } from "next";
import clsx from "clsx";
import { selectCurrentOrganisation } from "@/models/organisation";
import CreateSubCategory from "./_components/sub-categories/create";
import dynamic from "next/dynamic";

const EditCategory = dynamic(() => import("./_components/edit"));

export const generateMetadata = async(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> => {
  const params = await props.params

  const category = await selectCategory(params.id);

  return { title: category?.name };
};

export const runtime = "edge";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CategoryPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;

  const category = await selectCategory(params.id);
  if (!category) notFound();

  const organisation = await selectCurrentOrganisation();

  const monthlyTotal = (
    month: number | null,
    type: "income" | "expense",
    subCategory?: string,
  ) => {
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
      0,
    );

    return total;
  };

  const calcMonth = (add: number) => {
    const startDate = startOfMonth(addDays(organisation.endOfFinancialYear, 1));

    return getMonth(addMonths(startDate, add));
  };

  const totals = [
    {
      month: monthNames[calcMonth(0)],
      income: monthlyTotal(calcMonth(0), "income"),
      expense: monthlyTotal(calcMonth(0), "expense"),
    },
    {
      month: monthNames[calcMonth(1)],
      income: monthlyTotal(calcMonth(1), "income"),
      expense: monthlyTotal(calcMonth(1), "expense"),
    },
    {
      month: monthNames[calcMonth(2)],
      income: monthlyTotal(calcMonth(2), "income"),
      expense: monthlyTotal(calcMonth(2), "expense"),
    },
    {
      month: monthNames[calcMonth(3)],
      income: monthlyTotal(calcMonth(3), "income"),
      expense: monthlyTotal(calcMonth(3), "expense"),
    },
    {
      month: monthNames[calcMonth(4)],
      income: monthlyTotal(calcMonth(4), "income"),
      expense: monthlyTotal(calcMonth(4), "expense"),
    },
    {
      month: monthNames[calcMonth(5)],
      income: monthlyTotal(calcMonth(5), "income"),
      expense: monthlyTotal(calcMonth(5), "expense"),
    },
    {
      month: monthNames[calcMonth(6)],
      income: monthlyTotal(calcMonth(6), "income"),
      expense: monthlyTotal(calcMonth(6), "expense"),
    },
    {
      month: monthNames[calcMonth(7)],
      income: monthlyTotal(calcMonth(7), "income"),
      expense: monthlyTotal(calcMonth(7), "expense"),
    },
    {
      month: monthNames[calcMonth(8)],
      income: monthlyTotal(calcMonth(8), "income"),
      expense: monthlyTotal(calcMonth(8), "expense"),
    },
    {
      month: monthNames[calcMonth(9)],
      income: monthlyTotal(calcMonth(9), "income"),
      expense: monthlyTotal(calcMonth(9), "expense"),
    },
    {
      month: monthNames[calcMonth(10)],
      income: monthlyTotal(calcMonth(10), "income"),
      expense: monthlyTotal(calcMonth(10), "expense"),
    },
    {
      month: monthNames[calcMonth(11)],
      income: monthlyTotal(calcMonth(11), "income"),
      expense: monthlyTotal(calcMonth(11), "expense"),
    },
  ];

  const income = monthlyTotal(null, "income");
  const expense = monthlyTotal(null, "expense");

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

      <div className="flex items-start justify-between">
        <div>
          {/* <div className="flex items-center gap-1">
            <div
              className={clsx(
                "h-3 w-3 rounded-full flex-shrink-0",
                category.account === "club" ? "bg-cyan-600" : "bg-orange-600",
              )}
            />
            <span
              className={clsx(
                "font-medium",
                category.account === "club"
                  ? "text-cyan-600"
                  : "text-orange-600",
              )}
            >
              <span className="capitalize">{category.account}</span> account
            </span>
          </div> */}
          <Title>{category.name}</Title>
        </div>
        <EditCategory category={category} />
      </div>

      <div className="divide-x flex">
        <div
          style={{
            width:
              income == 0 && expense == 0
                ? "50%"
                : `${(income * 100) / (income + expense)}%`,
          }}
        >
          {income > expense ? (
            <div className="pr-2 pb-3">
              <Caption>
                Balance <span className="italic text-sm">(to date)</span>
              </Caption>
              <p className="text-3xl font-mono font-semibold tracking-tight text-green-600">
                {new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(income - expense)}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          style={{
            width:
              income == 0 && expense == 0
                ? "50%"
                : `${(expense * 100) / (income + expense)}%`,
          }}
        >
          {expense >= income ? (
            <div className="pl-2 pb-3">
              <Caption>
                Balance <span className="italic text-sm">(to date)</span>
              </Caption>
              <p className="text-3xl font-mono font-semibold tracking-tight text-red-600">
                {expense == income
                  ? "break even"
                  : new Intl.NumberFormat("en-GB", {
                      style: "currency",
                      currency: "GBP",
                    }).format(income - expense)}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="mb-6 flex rounded-md overflow-hidden">
        <div
          style={{
            width:
              income == 0 && expense == 0
                ? "50%"
                : `${(income * 100) / (income + expense)}%`,
          }}
          className="bg-green-600 py-1 rounded-l-md flex flex-col items-start"
        >
          <p className="text-sm text-white leading-none pb-1 pl-2">Income</p>

          <p className="text-lg text-white font-mono font-semibold tracking-tight pl-2 leading-none">
            {new Intl.NumberFormat("en-GB", {
              style: "currency",
              currency: "GBP",
            }).format(income)}
          </p>
        </div>
        <div
          style={{
            width:
              income == 0 && expense == 0
                ? "50%"
                : `${(expense * 100) / (income + expense)}%`,
          }}
          className="bg-red-600 py-1 rounded-r-md flex flex-col items-start"
        >
          <p className="text-sm text-white leading-none pb-1 pl-2">Expense</p>

          <p className="text-lg text-white font-mono font-semibold tracking-tight pl-2 leading-none">
            {new Intl.NumberFormat("en-GB", {
              style: "currency",
              currency: "GBP",
            }).format(expense)}
          </p>
        </div>
      </div>

      <MonthlyChart data={totals} />

      <div className="mt-10 mb-4 flex items-end justify-between">
        <Heading className="mb-0 leading-none">Sub categories</Heading>
        <CreateSubCategory category={category} />
      </div>

      {category.subCategories.length == 0 ? (
        <div className="rounded-lg bg-muted flex flex-col items-center justify-center gap-2 h-[212px]">
          <ClipboardListIcon className="h-6 w-6" />
          <span className="font-medium text-sm">
            No sub categories were found.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {category.subCategories.map((subCategory, idx) => {
            const total = (type: "income" | "expense") => {
              const filtered = category.transactions
                .filter((c) => c.subCategoryId === subCategory.id)
                .filter((transaction) => {
                  const transactionType =
                    transaction.income !== null ? "income" : "expense";
                  if (type === transactionType) return true;
                })
                .map((transaction) => transaction[type]);

              const total = filtered.reduce(
                (total, current) => total + parseFloat(current || ""),
                0,
              );

              return total;
            };

            return (
              <Card
                key={idx}
                className="bg-muted/50 border-muted-foreground/50"
              >
                <CardHeader className="p-4">
                  <CardTitle className="text-lg font-medium">
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full flex-shrink-0 bg-muted-foreground" />
                      {subCategory.name}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-end gap-1">
                    <p className="text-3xl font-mono font-semibold tracking-tight pr-1">
                      {
                        category.transactions.filter(
                          (t) => t.subCategoryId == subCategory.id,
                        ).length
                      }
                    </p>
                    <Caption>
                      transaction{category.transactions.length !== 1 ? "s" : ""}
                    </Caption>
                  </div>

                  {total("income") == total("expense") ? (
                    ""
                  ) : (
                    <div className="flex items-end gap-1 mt-2">
                      <p className="text-3xl font-mono font-semibold tracking-tight pr-1">
                        {total("income") > total("expense") ? "+" : ""}
                        {new Intl.NumberFormat("en-GB", {
                          style: "currency",
                          currency: "GBP",
                        }).format(total("income") - total("expense"))}
                      </p>
                      <Caption>
                        {total("income") > total("expense") ? "profit" : "loss"}
                      </Caption>
                    </div>
                  )}

                  <div className="flex justify-end -mr-3 -mb-2">
                    <Button asChild variant={null} size="sm" className="group">
                      <Link href={`/categories/${category.id}`}>
                        View transactions{" "}
                        <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition duration-100 text-muted-foreground" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <div className="mt-10 mb-4 flex items-end justify-between">
        <Heading className="mb-0 leading-none">Transactions</Heading>
        <Button variant="outline" asChild>
          <Link
            href={`/transactions/create?category=${encodeURIComponent(
              category.id,
            )}`}
          >
            <PlusIcon />
            Add transaction
          </Link>
        </Button>
      </div>

      {category.transactions.length == 0 ? (
        <div className="rounded-lg bg-muted flex flex-col items-center justify-center gap-2 h-[212px]">
          <ClipboardListIcon className="h-6 w-6" />
          <span className="font-medium text-sm">
            No transactions were found.
          </span>
        </div>
      ) : (
        <DataTable columns={columns} data={category.transactions} />
      )}
    </>
  );
};

export default CategoryPage;
