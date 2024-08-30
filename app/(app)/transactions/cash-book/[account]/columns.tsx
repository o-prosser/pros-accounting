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
  ArrowRightIcon,
  ArrowUpDown,
  FilterIcon,
  HashIcon,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type Transaction = {
  id: string;
  name?: string;
  date: string | Date;
  account?: "club" |"charity"|null;
  receiptBookNumber?: number | null;
  income?: string | null;
  expense?: string | null;
  balance?: number;
  amount?: string;
  from?: "club" |"charity";
  to?: "club" |"charity";
  notes: string | null;
  category?: {
    id: string;
    name: string;
    colour: string | null;
  };
  subCategory?: {
    id: string;
    name: string;
  } | null;
  activeAccount?: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Transaction",
    cell: ({ row }) =>
      row.original.name ? (
        <Button asChild variant="link" size={null}>
          <Link href={`/transactions/${row.original.id}`}>
            {row.original.name}
          </Link>
        </Button>
      ) : row.original.notes ? (
        <span className="font-medium">{row.original.notes}</span>
      ) : <span className="italic">Untitled transfer</span>,
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
          <>
            <HashIcon className="h-3 w-3 text-muted-foreground" />
            {row.original.receiptBookNumber}
          </>
        ) : row.original.amount ? (
          ""
        ) : (
          ""
        )}
      </div>
    ),
  },
  {
    header: "Account",
    cell: ({ row }) => {
      const from = row.original.category
        ? row.original.account
        : row.original?.from;

      return (
        <div className="flex">
          <div className={clsx(row.original.to && "relative flex")}>
            <div className="flex items-center gap-1">
              <div
                className={clsx(
                  "h-2 w-2 rounded-full flex-shrink-0",
                  from === "club" ? "bg-cyan-600" : "bg-orange-600",
                )}
              />
              <span className="capitalize">{from}</span>
            </div>

            {row.original.to ? (
              <div className="flex absolute left-full inset-y-0 items-center ml-1 gap-1">
                <ArrowRightIcon className="h-4 w-4 text-muted-foreground" />

                <div className="flex items-center gap-1">
                  <div
                    className={clsx(
                      "h-2 w-2 rounded-full flex-shrink-0",
                      row.original.to === "club"
                        ? "bg-cyan-600"
                        : "bg-orange-600",
                    )}
                  />
                  <span className="capitalize">{row.original.to}</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;
      const subCategory = row.original.subCategory;

      return category ? (
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
                {subCategory?.name}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="h-7" />
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount =
        row.original.income !== null && row.original.income !== undefined
          ? parseFloat(row.original.income)
          : row.original.expense !== null && row.original.expense !== undefined
          ? parseFloat(row.original.expense)
          : parseFloat(row.original.amount || "0");
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(amount);

      return (
        <div
          className={clsx(
            "text-right font-medium",
            row.original.income && "text-green-600",
            row.original.expense && "text-red-600",
            row.original.activeAccount &&
              row.original.activeAccount === row.original.to &&
              "text-green-600",
            row.original.activeAccount &&
              row.original.activeAccount === row.original.from &&
              "text-red-600",
          )}
        >
          {row.original.income ? "+" : ""}
          {row.original.expense ? "-" : ""}
          {row.original.activeAccount &&
          row.original.activeAccount === row.original.to
            ? "+"
            : ""}
          {row.original.activeAccount &&
          row.original.activeAccount === row.original.from
            ? "-"
            : ""}
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "balance",
    header: () => <div className="text-right">Balance</div>,
    cell: ({row}) => {
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(row.original.balance || 0);

      return (
        <div className="text-right text-muted-foreground">
          {formatted}
        </div>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return row.original.name ? (
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
                    row.original.category?.id || "",
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
      ) : (
        ""
      );
    },
  },
];
