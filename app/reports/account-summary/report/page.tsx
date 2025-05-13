import Logo from "@/components/ui/logo";
import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import { selectTransfers } from "@/models/transfer";
import { getColour } from "@/utils/colours";
import clsx from "clsx";
import { format, isAfter, isWithinInterval } from "date-fns";
import { ArrowRightIcon, HashIcon } from "lucide-react";

const Account = ({account, transfers, transactions, from, to}: {account: "club"|"charity"|"dutch", transfers: any[], transactions: any[], from: string|null, to: string|null}) => {
  return (
    <>
      <h2 className="font-medium capitalize" style={{ fontSize: "14pt", marginTop: "0.8cm", marginBottom: "0.1cm" }}>
        {account}
      </h2>

      <div className="flex font-semibold text-[10pt] border-b border-t divide-x border-x bg-muted">
        {/* <p style={{ width: "16.5%", padding: "8px 6px" }}>Date</p> */}
        <p style={{ width: "32%", padding: "8px 6px" }}>Transaction</p>
        <p style={{ width: "26.5%", padding: "8px 6px" }}>Category</p>

        <p style={{ width: "14%", padding: "8px 6px" }} className="text-right">
          Income
        </p>
        <p style={{ width: "14%", padding: "8px 6px" }} className="text-right">
          Expenditure
        </p>
        <p style={{ width: "14%", padding: "8px 6px" }} className="text-right">
          Balance
        </p>
      </div>

      <div className="border-b border-x bg-muted/50 px-2 py-1.5 text-[10pt]">
        <span>
          <span className="font-semibold">Opening balance</span> at{" "}
          {format(new Date(from), "dd MMM yyyy")}
        </span>
      </div>

      {transactions.map((transaction, idx) => (
        <div
          key={idx}
          className="flex items-center text-[10pt] border-b divide-x border-x"
        >
          {/* <p className="py-2 px-1" style={{ width: "16.5%" }}>
            {format(transaction.date, "dd MMM yyyy")}
          </p> */}
          <div
            style={{ width: "32%", padding: "8px 6px" }}
            className="font-medium"
          >
            <p className="line-clamp-1">{transaction.name}</p>
          </div>

          <div
            className="flex items-center gap-1"
            style={{ width: "26.5%", padding: "8px 6px" }}
          >
            <div
              className="h-2 w-2 rounded-full flex-shrink-0"
              style={{
                backgroundColor: getColour(transaction.category.colour)
                  .foreground,
              }}
            />
            <span
              className="capitalize"
              // style={{
              //   color: getColour(transaction.category.colour).foreground,
              // }}
            >
              {transaction.category?.name}
            </span>
          </div>
          <p
            className="text-right font-medium py-2 px-1.5"
            style={{ width: "14%", padding: "8px 6px" }}
          >
            {transaction.income
              ? new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(transaction.income)
              : "-"}
          </p>
          <p
            className="text-right font-medium py-2 px-1.5"
            style={{ width: "14%", padding: "8px 6px" }}
          >
            {transaction.expense
              ? new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(transaction.expense)
              : "-"}
          </p>
          <p
            className="text-right font-medium py-2 px-1.5"
            style={{ width: "14%", padding: "8px 6px" }}
          >
            {transaction.balance}
          </p>
        </div>
      ))}

      <div className="border-b border-x bg-muted/50 px-2 py-1.5 text-[10pt]">
        <span>
          <span className="font-semibold">Closing balance</span> at{" "}
          {format(new Date(to), "dd MMM yyyy")}
        </span>
      </div>
    </>
  );
}

const AccountSummaryReport = async (routeData: {
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

  const includedAccounts = [
    searchParams.charity === "on" ? "charity" : undefined,
    searchParams.club === "on" ? "club" : undefined,
    searchParams.dutch === "on" ? "dutch" : undefined,
  ].filter((a) => a !== undefined);

  const transfersData = await selectTransfers();
  // const transfers = searchParams.account
  //   ? transfersData.filter(
  //       (transfer) =>
  //         includedAccounts.includes(transfer.from) ||
  //         includedAccounts.includes(transfer.to),
  //     )
  //   : transfersData;
  const transfers = transfersData.filter((transfer) => {
    if (searchParams.account) {
      if (
        !includedAccounts.includes(transfer.from) &&
        !includedAccounts.includes(transfer.to)
      )
        return false;
    }

    if (
      searchParams.from &&
      searchParams.to &&
      !isWithinInterval(transfer.date, {
        start: searchParams.from,
        end: searchParams.to,
      })
    )
      return false;

    return true;
  });

  const transactions = transactionsData.filter((t) =>
    t.account ? includedAccounts.includes(t.account) : true,
  );

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
        Account Summary &mdash; {format(new Date(searchParams.from), "MMMM yyyy")}
      </h1>
      <h2 className="font-medium" style={{ fontSize: "14pt" }}>
        {organisation.name}
      </h2>

      <p className="font-[8pt] mt-2">
        Period from{" "}
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

      {searchParams.club === 'on' ? <Account account="club" transactions={transactions.filter((t) => t.account === 'club').map((t) => ({balance: payments.find((p) => p.id === t.id)?.balance, ...t}))} from={searchParams.from} to={searchParams.to} /> : ""}
      {searchParams.charity === 'on' ? <Account account="charity" transactions={transactions.filter((t) => t.account === 'charity')} from={searchParams.from} to={searchParams.to} /> : ""}
      {/* {searchParams.dutch === 'on' ? <Account account="dutch" transactions={transactions.filter((t) => t.account === 'dutch')} from={searchParams.from} to={searchParams.to} /> : ""} */}
    </div>
  );
};

export default AccountSummaryReport;
