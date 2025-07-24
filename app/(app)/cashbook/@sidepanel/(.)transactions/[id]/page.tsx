import { Button } from "@/components/ui/button";
import { Caption } from "@/components/ui/typography";
import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import { getColour } from "@/utils/colours";
import clsx from "clsx";
import { format } from "date-fns";
import { CopyPlusIcon, HashIcon, PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteTransaction } from "../../../actions";
import { FormButton } from "@/components/form-button";
import DeleteTransaction from "../../../_components/delete-transaction";

const TransactionsSidePanelPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const awaitedParams = await params;

  const organisation = await selectCurrentOrganisation();

  const transaction = await db.query.transactionsTable.findFirst({
    where: (fields, { eq, and }) =>
      and(
        eq(fields.id, awaitedParams.id),
        eq(fields.organisationId, organisation.id),
      ),
    with: {
      category: true,
      subCategory: true,
      file: true,
    },
  });
  if (!transaction) notFound();

  const type =
    transaction.income || 0 > 0
      ? "income"
      : transaction.expense || 0 > 0
      ? "expense"
      : "income";

  return (
    <>
      <Caption className="capitalize">{type}</Caption>

      <p className="text-3xl font-mono font-semibold tracking-tight">
        {new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
        }).format(
          transaction.income || 0 > 0
            ? parseFloat(transaction.income || "")
            : transaction.expense || 0 > 0
            ? parseFloat(transaction.expense || "")
            : 0,
        )}
      </p>

      <div className="divide-y divide-background/50">
        <div className="py-3">
          <p className="text-sm font-medium text-muted-foreground pb-px">
            Transaction
          </p>
          <p>{transaction.name}</p>
        </div>
        <div className="py-3">
          <p className="text-sm font-medium text-muted-foreground pb-px">
            Date
          </p>
          <p> {format(transaction.date, "EEEE, dd MMMM yyyy")}</p>
        </div>
        <div className="py-3 flex flex-col items-start">
          <p className="text-sm font-medium text-muted-foreground pb-1">
            Category
          </p>
          <div
            className="rounded-full flex border py-0.5 px-2 items-center gap-1 w-auto text-sm"
            style={{
              backgroundColor: getColour(transaction.category.colour)
                .background,
              borderColor: getColour(transaction.category.colour).foreground,
            }}
          >
            <div
              className="h-2 w-2 rounded-full flex-shrink-0"
              style={{
                backgroundColor: getColour(transaction.category.colour)
                  .foreground,
              }}
            />
            <span
              className="font-medium flex-shrink-0"
              style={{
                color: getColour(transaction.category.colour).foreground,
              }}
            >
              {transaction.category.name}
            </span>
          </div>
        </div>
        <div className="py-3">
          <p className="text-sm font-medium text-muted-foreground pb-px">
            Account
          </p>
          <div className="flex items-center gap-1.5 pl-1.5">
            <div
              className={clsx(
                "h-2 w-2 rounded-full flex-shrink-0",
                transaction.account === "club"
                  ? "bg-cyan-600"
                  : transaction.account === "dutch"
                  ? "bg-green-600"
                  : "bg-orange-600",
              )}
            />
            <span className="capitalize">{transaction.account}</span>
          </div>
        </div>
        <div className="py-3">
          <p className="text-sm font-medium text-muted-foreground pb-px">
            Receipt book number
          </p>
          <p className="flex items-center gap-1">
            {transaction.receiptBookNumber ? (
              <HashIcon className="h-3 w-3" />
            ) : (
              "No receipt book number."
            )}
            {transaction.receiptBookNumber}
          </p>
        </div>
        <div className="py-3">
          <p className="text-sm font-medium text-muted-foreground pb-px">
            Date added
          </p>
          <p>
            {transaction.createdAt
              ? format(transaction.createdAt, "HH:mm dd-MM-yy")
              : ""}
          </p>
        </div>
        <div className="py-3">
          <p className="text-sm font-medium text-muted-foreground pb-px">
            Notes
          </p>
          <p>{transaction.notes || "No notes provided."}</p>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/cashbook/transactions/${transaction.id}/edit`}>
              <PencilIcon />
              Edit
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link
              href={`/transactions/create?name=${encodeURIComponent(
                transaction.name,
              )}&income=${encodeURIComponent(
                transaction.income || "",
              )}&expense=${encodeURIComponent(
                transaction.expense || "",
              )}&category=${encodeURIComponent(
                transaction.categoryId,
              )}&subCategory=${encodeURIComponent(
                transaction.subCategoryId || "",
              )}`}
            >
              <CopyPlusIcon />
              Duplicate
            </Link>
          </Button>
          <DeleteTransaction transaction={transaction} />
        </div>
      </div>
    </>
  );
};

export default TransactionsSidePanelPage;
