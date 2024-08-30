import { Metadata } from "next";
import { selectTransactions } from "@/models/transaction";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { selectTransfers } from "@/models/transfer";
import { isAfter, isBefore, isSameDay } from "date-fns";
import { selectCurrentOrganisation } from "@/models/organisation";

export const metadata: Metadata = { title: "Transactions" };

export const runtime = "edge";

const TransactionsPage = async ({
  params,
}: {
  params: { account: string };
}) => {
  const account =
    params.account === "club"
      ? "club"
      : params.account === "charity"
      ? "charity"
      : null;

  const organisation = await selectCurrentOrganisation();

  const transactions = await selectTransactions({ account });
  const transfers = (await selectTransfers()).map((t) => {
    // const total = transactions.filter(transaction => transaction.date < t.date).map((transaction) => transaction.income ? transaction.income : `-${transaction.expense}`).reduce((total, current) => total + parseFloat(current || ""), 0);
    // const transfersTotal = transfers
    //   .filter((transfer) =>
    //     isSameDay(transfer.date, t.date)
    //       ? (transfer.notes || "") < (t.notes || "")
    //       : isBefore(transfer.date, t.date),
    //   )
    //   .map((transfer) =>
    //     transfer.from === t.from ? `-${transfer.amount}` : transfer.amount,
    //   )
    //   .reduce((total, current) => total + parseFloat(current || ""), 0);

    return {
      activeAccount: account || undefined,
      // balance: account ? total +
      //     transfersTotal +
      //     parseFloat(
      //       transaction.account === "club"
      //         ? organisation.initialClubBalance || ""
      //         : organisation.initialCharityBalance || "",
      //     ) : undefined,
      balance: undefined,
      ...t,
    };
  });

  const payments = [...transactions, ...transfers].sort((a, b) =>
    isBefore(a.date, b.date) ? 1 : -1,
  );

  const balancedTransfersPayments = payments.map((payment, idx) => {
    if (payment.balance !== undefined) return payment;

    const { balance: _balance, ...paymentWithoutBalance } = payment;

    if (account === null) return { balance: 0, ...paymentWithoutBalance };

    const initialBalance =
      idx + 1 === payments.length
        ? parseFloat(
            (account === "club"
              ? organisation.initialClubBalance
              : organisation.initialCharityBalance) || "",
          )
        : payments[idx + 1].balance;
    const addition =
      account === "charity"
        ? payment.from === "charity"
          ? parseFloat("-" + payment.amount)
          : parseFloat(payment.amount)
        : payment.from === "club"
        ? parseFloat("-" + payment.amount)
        : parseFloat(payment.amount);

    return {
      balance: (initialBalance || 0) + addition,
      ...paymentWithoutBalance,
    };
  });

  return <DataTable columns={columns} data={balancedTransfersPayments} />;
};

export default TransactionsPage;
