"use client";

import SortIcon from "@/components/sort-icon";
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getColour } from "@/utils/colours";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { format, sub } from "date-fns";
import { ArrowRightIcon, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type Transaction = {
  id: string;
  name: string | null;
  date: string | Date;
  account?: "club" | "charity" | "dutch" | null;
  receiptBookNumber: string | null;
  income?: string | null;
  expense?: string | null;
  balance?: number;
  amount?: string;
  from?: "club" | "charity" | "dutch";
  to?: "club" | "charity" | "dutch";
  notes: string | null;
  category?: {
    id: string;
    name: string;
    colour: string | null;
  } | null;
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
        <Tooltip>
          <TooltipTrigger>
            <Button asChild variant="link" size={null}>
              <Link href={`/cashbook/transactions/${row.original.id}`}>
                {row.original.name.substring(0, 30)}
                {row.original.name.length > 30 ? "..." : ""}
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent align="start">{row.original.name}</TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger>
            <div className="h-7 flex font-medium">
              <div className={clsx(row.original.to && "relative flex")}>
                <div className="flex items-center gap-1">
                  <div
                    className={clsx(
                      "h-2 w-2 rounded-full flex-shrink-0",
                      row.original.from === "club"
                        ? "bg-cyan-600"
                        : row.original.from === "charity"
                        ? "bg-orange-600"
                        : "bg-green-600",
                    )}
                  />
                  <span className="capitalize">{row.original.from}</span>
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
                            : row.original.to === "charity"
                            ? "bg-orange-600"
                            : "bg-green-600",
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
          </TooltipTrigger>
          <TooltipContent align="start">
            {row.original.notes || (
              <span className="italic">Untitled transfer</span>
            )}
          </TooltipContent>
        </Tooltip>
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
    cell: ({ row }) => {
      const pathname = usePathname();

      if (pathname.includes("transactions")) {
        return format(new Date(row.getValue("date")), "dd MMM");
      } else {
        return format(new Date(row.getValue("date")), "dd MMM yyyy");
      }
    },
  },
  // {
  //   header: "Receipt no.",
  //   accessorKey: "receiptBookNumber",
  //   cell: ({ row }) => (
  //     <div className="flex items-center">
  //       {row.original.receiptBookNumber ? (
  //         <>
  //           <HashIcon className="h-3 w-3 text-muted-foreground" />
  //           {row.original.receiptBookNumber}
  //         </>
  //       ) : row.original.amount ? (
  //         ""
  //       ) : (
  //         ""
  //       )}
  //     </div>
  //   ),
  // },
  {
    header: "Account",

    cell: ({ row }) => {
      return row.original.account ? (
        <div className="flex">
          <div className={clsx(row.original.to && "relative flex")}>
            <div className="flex items-center gap-1">
              <div
                className={clsx(
                  "h-2 w-2 rounded-full flex-shrink-0",
                  row.original.account === "club"
                    ? "bg-cyan-600"
                    : row.original.account === "charity"
                    ? "bg-orange-600"
                    : "bg-green-600",
                )}
              />
              <span className="capitalize">{row.original.account}</span>
            </div>
          </div>
        </div>
      ) : (
        ""
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
          {subCategory !== null && subCategory !== undefined ? (
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
        ""
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-rght">Amount</div>,
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

      const pathname = usePathname();

      return (
        <div className="flex justify-between">
          <span
            className={clsx(
              "text-rght font-medium",
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
          </span>

          {pathname.includes("transactions") ? (
            ""
          ) : (
            <span className="text-muted-foreground">
              {row.original.balance !== undefined
                ? "(" +
                  new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP",
                  }).format(row.original.balance) +
                  ")"
                : ""}
            </span>
          )}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "balance",
  //   header: () => <div className="text-rght">Balance</div>,
  //   cell: ({ row }) => {
  //     const formatted =
  //       row.original.balance !== undefined
  //         ? new Intl.NumberFormat("en-GB", {
  //             style: "currency",
  //             currency: "GBP",
  //           }).format(row.original.balance)
  //         : "";

  //     return (
  //       <div className="text-riht text-muted-foreground">{formatted}</div>
  //     );
  //   },
  // },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex -ml-2 justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 p-0 text-muted-foreground"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href={`/transactions/${row.original.id}`}>View</Link>
              </DropdownMenuItem>
              {row.original.name ? (
                <>
                  <DropdownMenuItem asChild>
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
                    <Link href={`/transactions/${row.original.id}/edit`}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>
                    <Link href={`/transfers/${row.original.id}/edit`}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
