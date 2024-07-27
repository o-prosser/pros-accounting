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

const TransactionPage = async ({ params }: { params: { id: string } }) => {
  const organisation =  await selectCurrentOrganisation();

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
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Transactions</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{transaction.name}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Title>{transaction.name}</Title>

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
                <dt className="text-sm font-medium leading-6">Category</dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                  <div>
                    <Badge
                      className="mr-2"
                      variant={`outline-accent${
                        transaction.category.account === "charity" ? "1" : "2"
                      }`}
                    >
                      {transaction.category.account}
                    </Badge>
                    <Button size={null} variant="link" asChild>
                      <Link href={`/categories/${transaction.category.id}`}>
                        {transaction.category.name}
                      </Link>
                    </Button>
                    {transaction.subCategory &&
                    transaction.subCategory !== null ? (
                      <>
                        <span className="text-muted-foreground px-1">/</span>
                        <Button size={null} variant="link" asChild>
                          <Link
                            href={`/categories/${transaction.category.id}/${transaction.subCategory.id}`}
                          >
                            {transaction.subCategory.name}
                          </Link>
                        </Button>
                      </>
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
                              {formatSize(parseInt(transaction.file.size || ""))}
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
            <Button asChild variant="outline">
              <Link href={`/transactions/${transaction.id}/edit`}>
                <PencilIcon /> Edit transaction
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/transactions/create?name=${encodeURIComponent(transaction.name)}&income=${encodeURIComponent(transaction.income || "")}&expense=${encodeURIComponent(transaction.expense || "")}&category=${encodeURIComponent(transaction.categoryId)}&subCategory=${encodeURIComponent(transaction.subCategoryId || "")}`}>
                <CopyPlusIcon /> Duplicate transaction
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/transactions/${transaction.id}/transaction.pdf`}>
                <DownloadIcon /> Export PDF
              </Link>
            </Button>
            <Button asChild variant="destructive">
              <Link href={`/transactions/create`}>
                <TrashIcon /> Delete transaction
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionPage;
