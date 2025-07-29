import { SelectTransaction, SelectTransfer } from "@/drizzle/schema";
import { Account } from "@/enums";
import { getTransactionType } from "./transactions";
import { getMonth, isBefore } from "date-fns";
import { selectCurrentOrganisation } from "@/models/organisation";
import { selectTransfers } from "@/models/transfer";
import { selectTransactions } from "@/models/transaction";

export const getTotal = ({
  transactions,
  transfers,
  account,
  month,
  type,
  financialYear,
}: {
  transactions: SelectTransaction[];
  transfers: SelectTransfer[];
  account?: Account;
  month?: number;
  type?: "income" | "expense";
  financialYear?: { id: string };
}) => {
  const filteredTransactionValues = transactions
    .filter(
      (transaction) =>
        (account ? transaction.account === account : true) &&
        (type ? getTransactionType(transaction) === type : true) &&
        (month !== undefined || month === 0
          ? getMonth(transaction.date) === month
          : true) &&
        (financialYear
          ? transaction.financialYearId === financialYear.id
          : true),
    )
    .map(
      (transaction) =>
        `${!type && getTransactionType(transaction) === "expense" ? "-" : ""}${
          transaction[getTransactionType(transaction)]
        }`,
    );

  const transactionTotal = filteredTransactionValues.reduce(
    (total, current) => total + parseFloat(current),
    0,
  );

  const filteredTransferValues = type
    ? transfers
        .filter(
          (transfer) =>
            (type === "income"
              ? transfer.to === account
              : transfer.from === account) &&
            (month !== undefined || month === 0
              ? getMonth(transfer.date) === month
              : true) &&
            (financialYear
              ? transfer.financialYearId === financialYear.id
              : true),
        )
        .map((transfer) => transfer.amount)
    : [];

  const transferTotal = filteredTransferValues.reduce(
    (total, current) => total + parseFloat(current),
    0,
  );

  return transactionTotal + transferTotal;
};

export const getInitialBalance = async (
  account: Account | null,
  date?: Date,
) => {
  const organisation = await selectCurrentOrganisation();

  if (account === "club")
    return parseFloat(organisation.initialClubBalance || "");
  if (account === "charity")
    return parseFloat(organisation.initialCharityBalance || "");
  if (account === "dutch")
    return parseFloat(organisation.initialDutchBalance || "");

  return 0;
};
