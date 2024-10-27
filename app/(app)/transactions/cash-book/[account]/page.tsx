import { Metadata } from "next";
import { selectTransactions } from "@/models/transaction";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { selectTransfers } from "@/models/transfer";
import { isAfter, isBefore, isSameDay } from "date-fns";
import { selectCurrentOrganisation } from "@/models/organisation";
import { SelectTransaction, SelectTransfer } from "@/drizzle/schema";
import { columnsWithoutAccount } from "./columnsWithoutAccount";
import { Card, CardTitle } from "@/components/ui/card";
import { Caption } from "@/components/ui/typography";
import { getInitialBalance, getTotal } from "@/utils/totals";
import { currency } from "@/utils/currency";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Transactions" };

export const runtime = "edge";

const TransactionsPage = async (props: {
  params: Promise<{ account: string }>;
}) => {
  const params = await props.params;

  const account =
    params.account === "club"
      ? "club"
      : params.account === "charity"
      ? "charity"
      : params.account === "dutch"
      ? "dutch"
      : null;

  const organisation = await selectCurrentOrganisation();

  const transactions: SelectTransaction[] = await selectTransactions({
    account,
  });
  const transfers: SelectTransfer[] = (await selectTransfers({ account })).map(
    (t) => ({
      activeAccount: account || undefined,
      ...t,
    }),
  );

  const payments = [...transactions, ...transfers].sort((a, b) =>
    isAfter(a.date, b.date) ? 1 : -1,
  );

  const balancedTransfersPayments = payments.map((payment, idx) => {
    if (account === null && payment.hasOwnProperty("amount")) return payment;
    const previousPayments = payments.slice(0, idx + 1);
    const previousPaymentValues: number[] = previousPayments.map(
      (previousPayment) => {
        if (!previousPayment.hasOwnProperty("amount")) {
          // @ts-expect-error
          return previousPayment.account === (payment.account || account)
            ? // @ts-expect-error
              parseFloat(`${previousPayment.income}`) ||
                // @ts-expect-error
                parseFloat(`-${previousPayment.expense}`)
            : 0;
        } else {
          // @ts-expect-error
          return previousPayment.from === (payment.account || account)
            ? // @ts-expect-error
              parseFloat(`-${previousPayment.amount}`)
            : // @ts-expect-error
              parseFloat(previousPayment.amount);
        }
      },
    );

    const previousPaymentsTotal = previousPaymentValues.reduce(
      (total, current) => total + current,
      parseFloat(
        // @ts-ignore
        ((payment.account||account) === "club"
          ? organisation.initialClubBalance
          : // @ts-ignore
          (payment.account||account) === "charity"
          ? organisation.initialCharityBalance
          : organisation.initialDutchBalance) || "",
      ),
    );

    return {
      balance: previousPaymentsTotal,
      ...payment,
    };
  });

  const income = account ? getTotal({transfers, transactions, type: "income", account}) : 0;
  const expense = account ? getTotal({ transfers, transactions, type: "expense", account }) : 0;
  const initial = await getInitialBalance(account);

  return (
    <>
      {account ? (
        <Card
          className={cn(
            "p-4",
            account === "charity" &&
              "border-orange-600 bg-orange-100/50 dark:bg-orange-950",
            account === "club" &&
              "border-cyan-600 bg-cyan-100/50 dark:bg-cyan-950",
            account === "dutch" &&
              "border-green-600 bg-green-100/50 dark:bg-green-950",
          )}
        >
          <CardTitle className="flex items-center gap-2">
            <div
              className={cn(
                "h-4 w-4 rounded-full flex-shrink-0",
                account === "charity" && "bg-orange-600",
                account === "club" && "bg-cyan-600",
                account === "dutch" && "bg-green-600",
              )}
            />
            <span className="capitalize">{account} account</span>
          </CardTitle>
          <div className="mt-2">
            <Caption>Current balance</Caption>
            <p className="text-3xl font-mono font-semibold tracking-tight">
              {/* {charityIncome + charityInitial - charityExpense > 0 ? "+" : ""} */}
              {initial + income - expense == 0
                ? "---"
                : currency(initial + income - expense)}
            </p>
          </div>
          <div className="flex gap-6 mt-2">
            <div>
              <Caption className="text-sm">Income</Caption>
              <p className="text-xl font-mono font-semibold tracking-tight">
                {income == 0 ? "---" : currency(income)}
              </p>
            </div>
            <div>
              <Caption className="text-sm">Expense</Caption>
              <p className="text-xl font-mono font-semibold tracking-tight">
                {expense == 0 ? "---" : currency(expense)}
              </p>
            </div>
          </div>
        </Card>
      ) : (
        ""
      )}
      <DataTable
        columns={account ? columnsWithoutAccount : columns}
        data={balancedTransfersPayments.reverse()}
      />
    </>
  );
};

export default TransactionsPage;
