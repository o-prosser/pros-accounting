import Logo from "@/components/ui/logo";
import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import { selectTransfers } from "@/models/transfer";
import { getColour } from "@/utils/colours";
import clsx from "clsx";
import { format, isAfter } from "date-fns";
import { ArrowRightIcon, HashIcon } from "lucide-react";

const TransactionLogReport = async (routeData: {
  searchParams: Promise<{ [key: string]: string | null }>;
}) => {
  const searchParams = await routeData.searchParams;

  const organisation = await selectCurrentOrganisation();

  const transactionsData = await db.query.transactionsTable.findMany({
    where: (fields, { and, eq, lte, gt, gte }) =>
      and(
        eq(fields.organisationId, organisation.id),
        searchParams.from
          ? gte(fields.date, new Date(searchParams.from))
          : gt(fields.date, organisation.endOfFinancialYear),
        searchParams.to
          ? lte(fields.date, new Date(searchParams.to))
          : undefined,
        searchParams.categoryId
          ? eq(fields.categoryId, searchParams.categoryId)
          : undefined,
        searchParams.subCategoryId
          ? eq(fields.subCategoryId, searchParams.subCategoryId)
          : undefined,
      ),
    orderBy: (fields, { asc }) => asc(fields.date),
    with: {
      category: true,
      subCategory: true,
    },
  });

  const transfersData = await selectTransfers();
  const transfers = searchParams.account ? transfersData.filter(t => t.from === searchParams.account || t.to === searchParams.account) : transfersData;

  const transactions = searchParams.account
    ? transactionsData.filter((t) => t.account === searchParams.account)
    : transactionsData;

  const payments: {
    id: string;
    name?: string;
    date: string | Date;
    account?: "club" | "charity" | "dutch" | null;
    receiptBookNumber?: number | null;
    income?: string | null;
    expense?: string | null;
    balance?: number;
    amount?: string;
    from?: "club" | "charity" | "dutch";
    to?: "club" | "charity" | "dutch";
    notes: string | null;
    category?: {
      id: string;
      name: string;
      colour: string | null;
    } | null;
    subCategory?: {
      id: string;
      name: string;
    } | null;
    activeAccount?: string;
  }[] = [...transactions, ...transfers]
    .sort((a, b) => (isAfter(a.date, b.date) ? -1 : 1))
    .reverse();

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

      <div className="flex font-semibold text-[10pt] border-b border-t mt-8 divide-x border-x bg-muted">
        <p style={{ width: "5.5cm", padding: "8px 6px" }} className="w-[5.5cm]">
          Transaction
        </p>
        <p style={{ width: "2.8cm", padding: "8px 6px" }} className="w-[3.2cm]">
          Date
        </p>
        {/* <p className="w-[1.5cm] pb-1 pt-1 px-1">Receipt</p> */}
        <p style={{ width: "2cm", padding: "8px 6px" }} className="w-[2cm]">
          Account
        </p>
        <p style={{ width: "4.5cm", padding: "8px 6px" }} className="w-[4.5cm]">
          Category
        </p>
        <p
          style={{ width: "2.4cm", padding: "8px 6px" }}
          className="w-[2cm] text-right"
        >
          Amount
        </p>
      </div>

      {payments.map((payment, idx) => {
        const amount =
          payment.income !== null && payment.income !== undefined
            ? parseFloat(payment.income)
            : payment.expense !== null && payment.expense !== undefined
            ? parseFloat(payment.expense)
            : parseFloat(payment.amount || "0");
        const formatted = new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
        }).format(amount);

        return (
          <div
            key={idx}
            style={
              idx === 19 || (idx - 19) % 22 === 0
                ? { pageBreakAfter: "always" }
                : undefined
            }
          >
            <div className="flex items-center text-[10pt] border-b divide-x border-x">
              <div
                style={{ width: "5.5cm", padding: "8px 6px" }}
                className="font-medium line-clamp-1 py-2 px-1.5"
              >
                {payment.name || (
                  <div className="flex">
                    <div className="flex items-center gap-1">
                      <div
                        className={clsx(
                          "h-2 w-2 rounded-full flex-shrink-0",
                          payment.from === "club"
                            ? "bg-cyan-600"
                            : payment.from === "charity"
                            ? "bg-orange-600"
                            : "bg-green-600",
                        )}
                      />
                      <span className="capitalize">{payment.from}</span>
                    </div>

                    <div className="flex items-center ml-1 gap-1">
                      <ArrowRightIcon className="h-4 w-4 text-muted-foreground" />

                      <div
                        className={clsx(
                          "h-2 w-2 rounded-full flex-shrink-0",
                          payment.to === "club"
                            ? "bg-cyan-600"
                            : payment.to === "charity"
                            ? "bg-orange-600"
                            : "bg-green-600",
                        )}
                      />
                      <span className="capitalize">{payment.to}</span>
                    </div>
                  </div>
                )}
              </div>
              <p className="py-2 px-1" style={{ width: "2.8cm" }}>
                {format(payment.date, "dd MMM yyyy")}
              </p>
              {/* <p className="flex items-center w-[1.5cm]">
                  {transaction.receiptBookNumber ? (
                    <HashIcon className="h-3 w-3 text-muted-foreground" />
                  ) : (
                    ""
                  )}
                  {transaction.receiptBookNumber}
                </p> */}
              <div
                className="flex items-center gap-1 py-2 px-1.5"
                style={{ width: "2cm", padding: "8px 6px" }}
              >
                {payment.account ? (
                  <>
                    <div
                      className={clsx(
                        "h-2 w-2 rounded-full flex-shrink-0",
                        payment.account === "club"
                          ? "bg-cyan-600"
                          : payment.account === "charity"
                          ? "bg-orange-600"
                          : "bg-green-600",
                      )}
                    />
                    <span className="capitalize">{payment.account}</span>
                  </>
                ) : (
                  <p className="h-5"></p>
                )}
              </div>
              <div
                className="flex items-center gap-1"
                style={{ width: "4.5cm", padding: "8px 6px" }}
              >
                {payment.category ? (
                  <>
                    <div
                      className="h-2 w-2 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: getColour(payment.category.colour)
                          .foreground,
                      }}
                    />
                    <span
                      className="capitalize"
                      // style={{
                      //   color: getColour(transaction.category.colour).foreground,
                      // }}
                    >
                      {payment.category?.name}
                    </span>
                  </>
                ) : (
                  <p className="h-5"></p>
                )}
              </div>
              <p
                className={clsx(
                  "text-right font-medium py-2 px-1.5",
                  payment.income !== null &&
                    payment.income !== undefined &&
                    "text-green-600",
                  payment.expense !== null &&
                    payment.expense !== undefined &&
                    "text-red-600",
                  payment.amount &&
                    searchParams.account === payment.to &&
                    "text-green-600",
                  payment.amount &&
                    searchParams.account === payment.from &&
                    "text-red-600",
                )}
                style={{ width: "2.4cm", padding: "8px 6px" }}
              >
                {payment.income !== null && payment.income !== undefined ? "+" : ""}
                {payment.expense !== null && payment.expense !== undefined ? "-" : ""}
                {payment.amount && searchParams.account === payment.to
                  ? "+"
                  : ""}
                {payment.amount && searchParams.account === payment.from
                  ? "-"
                  : ""}
                {formatted}
              </p>
            </div>

            {idx === 19 || (idx - 19) % 22 === 0 ? (
              <div className="flex justify-between items-end mt-2">
                <Logo className="h-[0.5cm] w-[4cm]" />
                <p className="text-[10pt]">
                  Page {idx === 19 ? "1" : (idx - 19) / 22 + 1}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TransactionLogReport;
