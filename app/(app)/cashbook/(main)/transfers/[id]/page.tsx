import BackButton from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { Caption } from "@/components/ui/typography";
import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import { getColour } from "@/utils/colours";
import clsx from "clsx";
import { format } from "date-fns";
import {
  ArrowRightIcon,
  CopyPlusIcon,
  HashIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteTransfer from "../../_components/delete-transfer";

const TransfersPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const awaitedParams = await params;

  const organisation = await selectCurrentOrganisation();

  const transfer = await db.query.transfersTable.findFirst({
    where: (fields, { eq, and }) =>
      and(
        eq(fields.id, awaitedParams.id),
        eq(fields.organisationId, organisation.id),
      ),
    with: {
      category: true,
    },
  });
  if (!transfer) notFound();

  // const type =
  //   transaction.income || 0 > 0
  //     ? "income"
  //     : transaction.expense || 0 > 0
  //     ? "expense"
  //     : "income";

  return (
    <>
      <BackButton />
      <div className="border bg-muted/50 rounded-2xl p-3">
        <Caption className="capitalize">Transfer</Caption>

        <p className="text-3xl font-mono font-semibold tracking-tight">
          {new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(parseFloat(transfer.amount))}
        </p>

        <div className="divide-y divide-background/50">
          <div className="py-3">
            <p className="text-sm font-medium text-muted-foreground pb-px">
              Transfer
            </p>
            <p>{transfer.name || "Untitled transfer"}</p>
          </div>
          <div className="py-3">
            <p className="text-sm font-medium text-muted-foreground pb-px">
              Date
            </p>
            <p> {format(transfer.date, "EEEE, dd MMMM yyyy")}</p>
          </div>
          <div className="py-3 flex flex-col items-start">
            <p className="text-sm font-medium text-muted-foreground pb-1">
              Category
            </p>
            {transfer.category ? (
              <div
                className="rounded-full flex border py-0.5 px-2 items-center gap-1 w-auto text-sm"
                style={{
                  backgroundColor: getColour(transfer.category.colour)
                    .background,
                  borderColor: getColour(transfer.category.colour).foreground,
                }}
              >
                <div
                  className="h-2 w-2 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: getColour(transfer.category.colour)
                      .foreground,
                  }}
                />
                <span
                  className="font-medium flex-shrink-0"
                  style={{
                    color: getColour(transfer.category.colour).foreground,
                  }}
                >
                  {transfer.category.name}
                </span>
              </div>
            ) : (
              "No category"
            )}
          </div>
          <div className="py-3">
            <p className="text-sm font-medium text-muted-foreground pb-px">
              Account
            </p>
            <div className="flex gap-1 items-center">
              <div className="flex items-center gap-1.5 pl-1.5">
                <div
                  className={clsx(
                    "h-2 w-2 rounded-full flex-shrink-0",
                    transfer.from === "club"
                      ? "bg-cyan-600"
                      : transfer.from === "dutch"
                      ? "bg-green-600"
                      : "bg-orange-600",
                  )}
                />
                <span className="capitalize">{transfer.from}</span>
              </div>
              <ArrowRightIcon className="h-4 w-4 text-muted-foreground" />

              <div className="flex items-center gap-1">
                <div
                  className={clsx(
                    "h-2 w-2 rounded-full flex-shrink-0",
                    transfer.to === "club"
                      ? "bg-cyan-600"
                      : transfer.to === "charity"
                      ? "bg-orange-600"
                      : "bg-green-600",
                  )}
                />
                <span className="capitalize">{transfer.to}</span>
              </div>
            </div>
          </div>
          <div className="py-3">
            <p className="text-sm font-medium text-muted-foreground pb-px">
              Receipt book number
            </p>
            <p className="flex items-center gap-1">
              {transfer.receiptBookNumber ? (
                <HashIcon className="h-3 w-3" />
              ) : (
                "No receipt book number."
              )}
              {transfer.receiptBookNumber}
            </p>
          </div>
          <div className="py-3">
            <p className="text-sm font-medium text-muted-foreground pb-px">
              Date added
            </p>
            <p>
              {transfer.createdAt
                ? format(transfer.createdAt, "HH:mm dd-MM-yy")
                : ""}
            </p>
          </div>
          <div className="py-3">
            <p className="text-sm font-medium text-muted-foreground pb-px">
              Notes
            </p>
            <p>{transfer.notes || "No notes provided."}</p>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={`/cashbook/transfers/${transfer.id}/edit`}>
                <PencilIcon />
                Edit
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link
                href={`/transactions/create?name=${encodeURIComponent(
                  transfer.name || "",
                )}&income=${encodeURIComponent(
                  transfer.amount,
                )}&category=${encodeURIComponent(transfer.categoryId || "")}`}
              >
                <CopyPlusIcon />
                Duplicate
              </Link>
            </Button>
            <DeleteTransfer transfer={transfer} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TransfersPage;
