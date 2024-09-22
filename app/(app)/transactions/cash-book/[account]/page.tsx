import { Metadata } from "next";
import { selectTransactions } from "@/models/transaction";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { selectTransfers } from "@/models/transfer";
import { isAfter, isBefore, isSameDay } from "date-fns";
import { selectCurrentOrganisation } from "@/models/organisation";
import { SelectTransaction, SelectTransfer } from "@/drizzle/schema";

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

  return (
    <DataTable columns={columns} data={balancedTransfersPayments.reverse()} />
  );
};

export default TransactionsPage;
