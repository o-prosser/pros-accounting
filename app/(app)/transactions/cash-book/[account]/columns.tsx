"use client";

import SortIcon from "@/components/sort-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getColour } from "@/utils/colours";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { format } from "date-fns";
import {
  ArrowUpDown,
  FilterIcon,
  HashIcon,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";

export type Transaction = {
  id: string;
  name: string;
  date: string | Date;
  receiptBookNumber: number | null;
  income: string | null;
  expense: string | null;
  notes: string | null;
  category: {
    id: string;
    name: string;
    account: "club" | "charity";
    colour: string | null;
  };
  subCategory: {
    id: string;
    name: string;
  } | null;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Transaction",
    cell: ({ row }) => (
      <Button asChild variant="link" size={null}>
        <Link href={`/transactions/${row.original.id}`}>
          {row.getValue("name")}
        </Link>
      </Button>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <span>Date</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <SortIcon sort={column.getIsSorted()} />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => format(row.getValue("date"), "E, dd MMM yyyy"),
  },
  {
    header: "Receipt no.",
    accessorKey: "receiptBookNumber",
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.original.receiptBookNumber ? (
          <HashIcon className="h-3 w-3 text-muted-foreground" />
        ) : (
          ""
        )}
        {row.original.receiptBookNumber}
      </div>
    ),
  },
  {
    header: "Account",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <div
          className={clsx(
            "h-2 w-2 rounded-full flex-shrink-0",
            row.original.category.account === "club"
              ? "bg-cyan-600"
              : "bg-orange-600",
          )}
        />
        <span className="capitalize">{row.original.category.account}</span>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;
      const subCategory = row.original.subCategory;

      return (
        <div className="flex gap-2">
          <div
            className="rounded-full flex border py-0.5 px-2 items-center gap-1 w-auto"
            style={{
              backgroundColor: getColour(category.colour).background,
              borderColor: getColour(category.colour).foreground,
            }}
          >
            <div
              className="h-2 w-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: getColour(category.colour).foreground }}
            />
            <span
              className="font-medium flex-shrink-0"
              style={{ color: getColour(category.colour).foreground }}
            >
              {category.name}
            </span>
          </div>
          {subCategory !== null ? (
            <div className="rounded-full flex border py-0.5 px-2 items-center gap-1 w-auto bg-muted/50 border-muted-forergound">
              <span className="font-medium flex-shrink-0 text-muted-foreground">
                {subCategory.name}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount =
        row.original.income !== null
          ? parseFloat(row.original.income)
          : row.original.expense !== null
          ? parseFloat(row.original.expense)
          : 0;
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(amount);

      return (
        <div
          className={clsx(
            "text-right font-medium",
            row.original.income !== null ? "text-green-600" : "text-red-600",
          )}
        >
          {row.original.income !== null ? "+" : "-"}
          {formatted}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 text-muted-foreground"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link
                  href={`/transactions/create?name=${encodeURIComponent(
                    row.original.name,
                  )}&income=${encodeURIComponent(
                    row.original.income || "",
                  )}&expense=${encodeURIComponent(
                    row.original.expense || "",
                  )}&category=${encodeURIComponent(
                    row.original.category.id,
                  )}&subCategory=${encodeURIComponent(
                    row.original.subCategory?.id || "",
                  )}`}
                >
                  Duplicate
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/transactions/${row.original.id}`}>View</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/transactions/${row.original.id}/edit`}>Edit</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
