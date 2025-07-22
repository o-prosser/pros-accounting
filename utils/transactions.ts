import { SelectTransaction, SelectTransfer } from "@/drizzle/schema";
import { selectCategories } from "@/models/category";
import { selectCurrentOrganisation } from "@/models/organisation";
import { selectTransactions } from "@/models/transaction";
import { selectTransfers } from "@/models/transfer";
import { isAfter } from "date-fns";

export const getTransactionType = (transaction: SelectTransaction) => {
  return transaction.expense !== null ? "expense" : "income";
};

export const getPaymentsForTable = async ({
  account,
}: {
  account: "club" | "charity" | "dutch" | null;
}) => {
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

  const categories = await selectCategories();

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
        ((payment.account || account) === "club"
          ? organisation.initialClubBalance
          : // @ts-ignore
          (payment.account || account) === "charity"
          ? organisation.initialCharityBalance
          : organisation.initialDutchBalance) || "",
      ),
    );

    return {
      balance: previousPaymentsTotal,
      ...payment,
    };
  });

  return balancedTransfersPayments;
};
