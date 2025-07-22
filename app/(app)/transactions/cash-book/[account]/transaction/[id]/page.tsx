import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Caption, Title } from "@/components/ui/typography";
import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import { formatSize, getFileUrl } from "@/utils/files";
import { format } from "date-fns";
import {
  BanknoteIcon,
  CopyIcon,
  CopyPlusIcon,
  DownloadIcon,
  HashIcon,
  PaperclipIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteTransaction } from "../../../../[id]/actions";
import { FormButton } from "@/components/form-button";
import clsx from "clsx";
import { getColour } from "@/utils/colours";

export const runtime = "edge";

const TransactionPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;

  const organisation = await selectCurrentOrganisation();

  const transaction = await db.query.transactionsTable.findFirst({
    where: (fields, { eq, and }) =>
      and(eq(fields.id, params.id), eq(fields.organisationId, organisation.id)),
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
      <Title icon={BanknoteIcon}>{transaction.name}</Title>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div>
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
          </div>

          <div className="mt-6 border-t">
            <dl className="divide-y">
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">Date</dt>
                <dd className="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
                  {format(transaction.date, "dd-MM-yyyy")}
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">
                  Receipt book number
                </dt>
                <dd className="mt-1 text-sm items-center text-muted-foreground sm:col-span-2 sm:mt-0 flex">
                  {transaction.receiptBookNumber ? (
                    <HashIcon className="h-3 w-3" />
                  ) : (
                    ""
                  )}
                  {transaction.receiptBookNumber}
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">Account</dt>
                <dd className="mt-1 text-sm items-center text-muted-foreground sm:col-span-2 sm:mt-0 flex">
                  <div className="flex items-center gap-1">
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
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">Category</dt>
                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                  <div className="flex gap-2">
                    <div
                      className="rounded-full flex border py-0.5 px-2 items-center gap-1 w-auto"
                      style={{
                        backgroundColor: getColour(transaction.category.colour)
                          .background,
                        borderColor: getColour(transaction.category.colour)
                          .foreground,
                      }}
                    >
                      <div
                        className="h-2 w-2 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: getColour(
                            transaction.category.colour,
                          ).foreground,
                        }}
                      />
                      <span
                        className="font-medium flex-shrink-0"
                        style={{
                          color: getColour(transaction.category.colour)
                            .foreground,
                        }}
                      >
                        {transaction.category.name}
                      </span>
                    </div>
                    {transaction.subCategory !== null ? (
                      <div className="rounded-full flex border py-0.5 px-2 items-center gap-1 w-auto bg-muted/50 border-muted-forergound">
                        <span className="font-medium flex-shrink-0 text-muted-foreground">
                          {transaction.subCategory.name}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">Date added</dt>
                <dd className="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
                  {transaction.createdAt
                    ? format(transaction.createdAt, "HH:mm dd-MM-yy")
                    : ""}
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">Notes</dt>
                <dd className="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
                  {transaction.notes}
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">Files</dt>
                <dd className="mt-2 text-sm sm:col-span-2 sm:mt-0">
                  {transaction.file ? (
                    <ul role="list" className="divide-y rounded-md border">
                      <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                        <div className="flex w-0 flex-1 items-center">
                          <PaperclipIcon
                            aria-hidden="true"
                            className="h-5 w-5 flex-shrink-0 text-muted-foreground"
                          />
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">
                              {transaction.file.name}
                            </span>
                            <span className="flex-shrink-0 text-gray-400">
                              {formatSize(
                                parseInt(transaction.file.size || ""),
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <Button asChild variant="link" size={null}>
                            <Link
                              href={getFileUrl(transaction.file.key)}
                              download
                            >
                              Download
                            </Link>
                          </Button>
                        </div>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div>
          <div className="grid gap-4 [&>a]:justify-start">
            <Button asChild variant="outline" className="justify-start">
              <Link href={`/transactions/${transaction.id}/edit`}>
                <PencilIcon /> Edit transaction
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
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
                <CopyPlusIcon /> Duplicate transaction
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href={`/transactions/${transaction.id}/transaction.pdf`}>
                <DownloadIcon /> Export PDF
              </Link>
            </Button>
            <form action={deleteTransaction}>
              <input type="hidden" name="id" defaultValue={transaction.id} />

              <FormButton
                variant="destructive"
                className="[&>.animate-spin]:absolute w-full justify-start [&>.animate-spin]:mt-2.5 [&>.animate-spin]:right-2.5 [&>.animate-spin]:top-0 relative"
              >
                <TrashIcon /> Delete transaction
              </FormButton>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionPage;
