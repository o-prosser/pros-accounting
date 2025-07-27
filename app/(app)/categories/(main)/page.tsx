import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { selectCategories } from "@/models/category";
import { selectCurrentOrganisation } from "@/models/organisation";
import { currency } from "@/utils/currency";
import { formatDistance } from "date-fns";
import {
  BanknoteArrowUpIcon,
  MoreHorizontal,
  ShoppingBagIcon,
} from "lucide-react";
import Link from "next/link";

const CategoriesPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;

  const organisation = await selectCurrentOrganisation();
  const financialYearId = searchParams.fy as string | undefined;
  const financialYear = financialYearId
    ? organisation.financialYears.find((fy) => fy.id === financialYearId)
    : organisation.financialYears.find((fy) => fy.isCurrent === true);

  const categories = await selectCategories({ financialYear });

  return (
    <>
      <div className="rounded-2xl border overflow-hidden divide-y">
        {categories.map((category, idx) => (
          <div
            className="hover:bg-muted/50 grid grid-cols-3 p-3 align-middle"
            key={idx}
          >
            {/* Left */}
            <div>
              <Button variant="link" size={null} asChild>
                <Link href={`/categories/category/${category.id}`}>
                  <h3 className="font-medium text-base">{category.name}</h3>
                </Link>
              </Button>
              <p className="text-muted-foreground text-sm">
                {category.totals.paymentNumber} payment
                {category.totals.paymentNumber === 1 ? "" : "s"}
              </p>
            </div>

            {/* Middle */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BanknoteArrowUpIcon className="size-4 text-muted-foreground" />
                <div className="flex items-end gap-1">
                  <p className="font-mono font-medium tracking-tight text-sm">
                    {category.totals.income == 0
                      ? "---"
                      : currency(category.totals.income)}
                  </p>
                  <p className="text-sm pb-[0.5px] text-muted-foreground">
                    income
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingBagIcon className="size-4 text-muted-foreground" />
                <div className="flex items-end gap-1">
                  <p className="font-mono font-medium tracking-tight text-sm">
                    {category.totals.expense == 0
                      ? "---"
                      : currency(category.totals.expense)}
                  </p>
                  <p className="text-sm pb-[0.5px] text-muted-foreground">
                    expenses
                  </p>
                </div>
              </div>
            </div>

            {/* End */}
            <div className="flex items-center justify-end gap-3">
              <p className="text-muted-foreground text-sm">
                Last updated{" "}
                {formatDistance(
                  category.lastUpdated || category.createdAt || new Date(),
                  new Date(),
                )}{" "}
                ago
              </p>

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
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href={`/categories/category/${category.id}`}>
                      Details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href={`/categories/category/${category.id}/edit`}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoriesPage;
