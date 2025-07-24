"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PlusIcon,
  ChevronDownIcon,
  ArrowLeftRightIcon,
  BanknoteIcon,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const AddDropdown = () => {
  const searchParams = useSearchParams();
  const accountParam = searchParams.get("account");
  const account =
    accountParam === "club" || accountParam === "charity" ? accountParam : null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="dark">
          <PlusIcon />
          Add new
          <ChevronDownIcon className="!h-3 !w-3 !text-muted-foreground !-ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link
            href={`/transactions/create${account ? `?account=${account}` : ""}`}
          >
            <BanknoteIcon className="h-4 w-4 text-muted-foreground mr-2" />
            Add transaction
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`/transfers/create${account ? `?account=${account}` : ""}`}
          >
            <ArrowLeftRightIcon className="h-4 w-4 text-muted-foreground mr-2" />
            Add transfer
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddDropdown;
