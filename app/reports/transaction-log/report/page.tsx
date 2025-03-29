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
      ),
    orderBy: (fields, { asc }) => asc(fields.date),
    with: {
      category: true,
      subCategory: true,
    },
  });

  const transfersData = await selectTransfers();
  const transfers = searchParams.account
    ? transfersData.filter(
        (t) => t.from === searchParams.account || t.to === searchParams.account,
      )
    : transfersData;

  const includedAccounts = [
    searchParams.charity === "on" ? "charity" : undefined,
    searchParams.club === "on" ? "club" : undefined,
    searchParams.dutch === "on" ? "dutch" : undefined,
  ].filter((a) => a !== undefined);

  const transactions = transactionsData.filter((t) => t.account ? includedAccounts.includes(t.account) : true)

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
      <h1 className="font-semibold" style={{ fontSize: "22pt" }}>
        Transaction Log
      </h1>
      <h2 className="font-medium" style={{ fontSize: "14pt" }}>
        {organisation.name}
      </h2>

      <p className="font-[8pt] mt-2">
        Transactions and transfers of account
        {includedAccounts.length === 1 ? "" : "s"} {includedAccounts[0]}
        {includedAccounts.length === 2
          ? " and "
          : includedAccounts.length === 3
          ? ", "
          : ""}
        {includedAccounts[1]}
        {includedAccounts.length === 3 ? " and " : ""}
        {includedAccounts[2]}. Period from{" "}
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
        .
      </p>

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
              idx === 18 || (idx - 18) % 25 === 0
                ? { pageBreakAfter: "always" }
                : undefined
            }
          >
            {idx === 0 || idx === 19 || (idx - 19) % 25 === 0 ? (
              <div className="flex font-semibold text-[10pt] border-b border-t mt-8 divide-x border-x bg-muted">
                {searchParams.name === "on" ? (
                  <p style={{ width: "32%", padding: "8px 6px" }}>
                    Transaction
                  </p>
                ) : (
                  ""
                )}
                {searchParams.date === "on" ? (
                  <p style={{ width: "16.5%", padding: "8px 6px" }}>Date</p>
                ) : (
                  ""
                )}
                {searchParams.account === "on" ? (
                  <p style={{ width: "12%", padding: "8px 6px" }}>Account</p>
                ) : (
                  ""
                )}
                {searchParams.category === "on" ? (
                  <p style={{ width: "26.5%", padding: "8px 6px" }}>Category</p>
                ) : (
                  ""
                )}
                {searchParams.amount === "on" ? (
                  <p
                    style={{ width: "14%", padding: "8px 6px" }}
                    className="text-right"
                  >
                    Amount
                  </p>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}

            <div className="flex items-center text-[10pt] border-b divide-x border-x">
              {searchParams.name === "on" ? (
                <div
                  style={{ width: "32%", padding: "8px 6px" }}
                  className="font-medium"
                >
                  {payment.name ? (
                    <p className="line-clamp-1">{payment.name}</p>
                  ) : (
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
              ) : (
                ""
              )}
              {searchParams.date === "on" ? (
                <p className="py-2 px-1" style={{ width: "16.5%" }}>
                  {format(payment.date, "dd MMM yyyy")}
                </p>
              ) : (
                ""
              )}
              {/* <p className="flex items-center w-[1.5cm]">
                  {transaction.receiptBookNumber ? (
                    <HashIcon className="h-3 w-3 text-muted-foreground" />
                  ) : (
                    ""
                  )}
                  {transaction.receiptBookNumber}
                </p> */}
              {searchParams.account === "on" ? (
                <div
                  className="flex items-center gap-1 py-2 px-1.5"
                  style={{ width: "12%", padding: "8px 6px" }}
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
              ) : (
                ""
              )}
              {searchParams.category === "on" ? (
                <div
                  className="flex items-center gap-1"
                  style={{ width: "26.5%", padding: "8px 6px" }}
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
              ) : (
                ""
              )}
              {searchParams.amount === "on" ? (
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
                  style={{ width: "14%", padding: "8px 6px" }}
                >
                  {payment.income !== null && payment.income !== undefined
                    ? "+"
                    : ""}
                  {payment.expense !== null && payment.expense !== undefined
                    ? "-"
                    : ""}
                  {payment.amount && searchParams.account === payment.to
                    ? "+"
                    : ""}
                  {payment.amount && searchParams.account === payment.from
                    ? "-"
                    : ""}
                  {formatted}
                </p>
              ) : (
                ""
              )}
            </div>

            {idx === 18 || (idx - 18) % 25 === 0 ? (
              <div className="flex justify-between items-end mt-2">
                <Logo className="h-[0.5cm] w-[4cm]" />
                <p className="text-[10pt]">
                  Page {idx === 18 ? "1" : (idx - 18) / 25 + 1}
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
