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
import EditTransfer from "./edit";
import DeleteTransfer from "./delete";

export type Transfer = {
  id: string;
  date: string | Date;
  from: "charity" | "club" | "dutch";
  to: "charity" | "club" | "dutch";
  amount: string;
  notes: string | null;
};

export const columns: ColumnDef<Transfer>[] = [
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
    header: "From",
    cell: ({ row }) => (
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
    ),
  },
  {
    header: "To",
    cell: ({ row }) => (
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
    ),
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => (
      <p className="max-w-xs text-xs leading-4 whitespace-normal">
        {row.original.notes}
      </p>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(parseFloat(row.original.amount));

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <EditTransfer transfer={row.original} />
          <DeleteTransfer transfer={row.original} />
        </div>
      );
    },
  },
];
