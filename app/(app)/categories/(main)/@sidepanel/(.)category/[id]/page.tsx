import { Caption } from "@/components/ui/typography";
import { notFound } from "next/navigation";
import { selectCategory } from "@/models/category";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BanknoteIcon, ExpandIcon, PencilIcon } from "lucide-react";
import { currency } from "@/utils/currency";

const CategorySidePanelPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const awaitedParams = await params;

  const category = await selectCategory(awaitedParams.id);
  if (!category) notFound();

  return (
    <>
      <Caption className="capitalize">Details</Caption>

      <h3 className="text-2xl font-semibold tracking-tight">{category.name}</h3>

      <div className="divide-y divide-background/50">
        <div className="py-3">
          <p className="text-sm font-medium text-muted-foreground pb-px">
            Transactions
          </p>
          <p>{category.transactions.length}</p>
        </div>
        <div className="py-3">
          <p className="text-sm font-medium text-muted-foreground pb-px">
            Transfers
          </p>
          <p> {category.transfers.length}</p>
        </div>
        <div className="py-3">
          <p className="text-sm font-medium text-muted-foreground pb-px">
            Income
          </p>
          <p className="flex items-center gap-1">
            {currency(category.totals.income)}
          </p>
        </div>
        <div className="py-3">
          <p className="text-sm font-medium text-muted-foreground pb-px">
            Expense
          </p>
          <p>{currency(category.totals.expense)}</p>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/cashbook?category=${category.id}`}>
              <BanknoteIcon />
              View payments
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href={`/categories/category/${category.id}/edit`}>
              <PencilIcon />
              Edit
            </Link>
          </Button>
          {/* <DeleteTransaction transaction={transaction} /> */}
        </div>
      </div>
    </>
  );
};

export default CategorySidePanelPage;
