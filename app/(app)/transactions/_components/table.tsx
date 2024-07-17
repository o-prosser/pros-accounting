"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export type Transaction = {
  id: string;
  name: string;
  date: string;
  income: string | null;
  expense: string | null;
  notes: string | null;
  category: {
    id: string;
    name: string;
    account: "club" | "charity"
  };
  subCategory: {
    id: string;
    name: string;
  } | null;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({row}) => format(row.getValue("date"), "dd MMM yyyy")
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;
      const subCategory = row.original.subCategory;

      return (
        <div>
          <Badge className="mr-2" variant={`outline-accent${category.account === 'charity' ? "1":"2"}`}>{category.account}</Badge>
          <Button size={null} variant="link" asChild>
            <Link href={`/categories/${category.id}`}>{category.name}</Link>
          </Button>
          {subCategory && subCategory !== null ? (
            <>
              <span className="text-muted-foreground px-1">/</span>
              <Button size={null} variant="link" asChild>
                <Link href={`/categories/${subCategory.id}`}>
                  {subCategory.name}
                </Link>
              </Button>
            </>
          ) : (
            ""
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "income",
    header: () => <div className="text-right">Income</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("income"));
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      })
        .format(amount)
        .replace("£", "");

      return (
        <div className="text-right">
          {row.getValue("income") !== null ? (
            <>
              £<span className="w-16 inline-block text-right">{formatted}</span>
            </>
          ) : (
            ""
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "expense",
    header: () => <div className="text-right">Expense</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("expense"));
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      })
        .format(amount)
        .replace("£", "");

      return (
        <div className="text-right">
          {row.getValue("expense") !== null ? (
            <>
              £<span className="w-16 inline-block text-right">{formatted}</span>
            </>
          ) : (
            ""
          )}
        </div>
      );
    },
  },  {
    id: "actions",
    cell: ({ row }) => {

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(row.original.name)}
            >
              Copy name
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/transactions/${row.original.id}`}>
                View transaction</Link>
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
];
