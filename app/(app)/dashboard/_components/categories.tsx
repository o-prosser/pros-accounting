import { Button } from "@/components/ui/button";
import { WidgetCard, WidgetCardTitle } from "@/components/widget-card";
import { selectCategories } from "@/models/category";
import { currency } from "@/utils/currency";
import {
  BanknoteArrowUpIcon,
  LoaderCircleIcon,
  PlusIcon,
  ShoppingBagIcon,
} from "lucide-react";
import Link from "next/link";

const DashboardCategoriesWidget = async ({
  financialYear,
}: {
  financialYear?: { id: string };
}) => {
  const categories = await selectCategories({
    financialYear,
  });

  return (
    <WidgetCard className="md:col-span-3">
      <div className="flex items-start">
        <WidgetCardTitle className="font-medium text-xl flex-1">
          Categories
        </WidgetCardTitle>
        <Button size="sm" variant="outline" asChild>
          <Link href="/categories/create">
            <PlusIcon />
            Add category
          </Link>
        </Button>
      </div>

      {categories
        .sort((a, b) =>
          (a?.lastUpdated || 0) < (b?.lastUpdated || 0) ? 1 : -1,
        )
        .slice(0, 3)
        .map((category, idx) => (
          <Button
            className="bg-background p-3 mt-2 text-sm border whitespace-normal grid grid-cols-2 hover:underline hover:bg-background/50 w-full relative overflow-hidden"
            asChild
            variant={null}
            size={null}
            key={idx}
          >
            <Link href={`/categories/category/${category.id}`}>
              <div>
                <h3 className="font-medium text-base">{category.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {category.totals.paymentNumber} payment
                  {category.totals.paymentNumber === 1 ? "" : "s"}
                </p>
              </div>
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
            </Link>
          </Button>
        ))}
    </WidgetCard>
  );
};

const DashboardCategoriesWidgetLoading = () => {
  return (
    <WidgetCard className="md:col-span-3">
      <WidgetCardTitle className="font-medium text-xl flex-1">
        Categories
      </WidgetCardTitle>

      <div className="grid place-items-center h-full">
        <div className="flex gap-2 items-center text-sm">
          <LoaderCircleIcon className="text-muted-foreground size-4 animate-spin" />
          <span>Loading categories...</span>
        </div>
      </div>
    </WidgetCard>
  );
};

export default DashboardCategoriesWidget;
export { DashboardCategoriesWidgetLoading };
