import Logo from "@/components/ui/logo";
import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import { getColour } from "@/utils/colours";
import clsx from "clsx";
import { format } from "date-fns";
import { HashIcon } from "lucide-react";

const TransactionLogReport = async ({searchParams}: {searchParams: {[key: string]: string|null}}) => {
  const organisation = await selectCurrentOrganisation();

  const transactions = await db.query.transactionsTable.findMany({
    where: (fields, {and, eq, lt, gt}) => and(
      eq(fields.organisationId, organisation.id),
      gt(fields.date, searchParams.from ? new Date(searchParams.from) : organisation.endOfFinancialYear),
      searchParams.to ? lt(fields.date, new Date(searchParams.to)) : undefined,
      searchParams.categoryId ? eq(fields.categoryId, searchParams.categoryId) : undefined,
      searchParams.subCategoryId ? eq(fields.subCategoryId, searchParams.subCategoryId) : undefined,
    ),
    orderBy: (fields, {asc}) => asc(fields.date),
    with: {
      category: true,
      subCategory: true,
    }
  });

  return (
    <div className="text-[12pt]">
      <h1 className="text-[20pt]">{organisation.name}</h1>
      <h2 className="font-[590] text-[16pt]">Transaction log</h2>

      <p className="pt-4">
        Period{" "}
        {format(
          searchParams.from
            ? new Date(searchParams.from)
            : organisation.endOfFinancialYear,
          "dd/MM/yyyy",
        )}{" "}
        to{" "}
        {format(
          searchParams.to ? new Date(searchParams.to) : new Date(),
          "dd/MM/yyyy",
        )}
      </p>

      <div className="flex font-medium text-[10pt] pb-2 border-b mt-8">
        <p className="w-[5cm]">Transaction</p>
        <p className="w-[3cm]">Date</p>
        <p className="w-[1.5cm]">Receipt</p>
        <p className="w-[2cm]">Account</p>
        <p className="w-[4cm]">Category</p>
        <p className="w-[1.7cm] text-right">Amount</p>
      </div>

      {[transactions[0], transactions[1], transactions[0], transactions[1],transactions[0],transactions[1],transactions[0],transactions[1],transactions[0],transactions[1],transactions[0],transactions[1],transactions[0],transactions[1],transactions[0],transactions[1],transactions[0],transactions[1],transactions[0],transactions[1],transactions[0],transactions[1],transactions[0],transactions[1],transactions[0],transactions[1],transactions[0],transactions[1],transactions[0],transactions[1],transactions[0],transactions[1],transactions[0],transactions[1],transactions[0],transactions[1],transactions[0],transactions[1],transactions[0],transactions[1],transactions[0],transactions[1],].map(
        (transaction, idx) => {
          const amount =
            transaction.income !== null
              ? parseFloat(transaction.income)
              : transaction.expense !== null
              ? parseFloat(transaction.expense)
              : 0;
          const formatted = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(amount);

          return (
            <div key={idx} style={(idx === 11 || (idx - 11) % 15 === 0) ? {pageBreakAfter: "always"} : undefined}>
              <div
                className="flex items-center h-[1.5cm] text-[10pt] border-b"
              >
                <p className="font-medium w-[5cm] line-clamp-1">
                  {transaction.name}
                </p>
                <p className="w-[3cm]">
                  {format(transaction.date, "E, dd MMM yyyy")}
                </p>
                <p className="flex items-center w-[1.5cm]">
                  {transaction.receiptBookNumber ? (
                    <HashIcon className="h-3 w-3 text-muted-foreground" />
                  ) : (
                    ""
                  )}
                  {transaction.receiptBookNumber}
                </p>
                <div className="flex items-center gap-1 w-[2cm]">
                  <div
                    className={clsx(
                      "h-2 w-2 rounded-full flex-shrink-0",
                      transaction.category.account === "club"
                        ? "bg-cyan-600"
                        : "bg-orange-600",
                    )}
                  />
                  <span className="capitalize">
                    {transaction.category.account}
                  </span>
                </div>
                <div className="flex items-center gap-1 w-[4cm]">
                  <div
                    className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: getColour(transaction.category.colour)
                        .foreground,
                    }}
                  />
                  <span
                    className="capitalize"
                    style={{
                      color: getColour(transaction.category.colour).foreground,
                    }}
                  >
                    {transaction.category.name}
                  </span>
                </div>
                <p
                  className={clsx(
                    "text-right font-medium w-[1.7cm]",
                    transaction.income !== null
                      ? "text-green-600"
                      : "text-red-600",
                  )}
                >
                  {transaction.income !== null ? "+" : "-"}
                  {formatted}
                </p>
              </div>

              {(idx === 11 || (idx - 11) % 15 === 0) ? (
                <div className="flex justify-between items-end mt-2">
                  <Logo className="h-[0.5cm] w-[4cm]" />
                  <p className="text-[10pt]">Page {idx === 11 ? '1' : ((idx-11)/15) + 1}</p>
                </div>
              ) : ""}
            </div>
          );
        },
      )}
    </div>
  );
}

export default TransactionLogReport;