import { selectCurrentOrganisation } from "@/models/organisation";
import { selectTransactions } from "@/models/transaction";
import { selectTransfers } from "@/models/transfer";
import { getTotal } from "@/utils/totals";
import {
  addDays,
  differenceInMonths,
  getMonth,
  startOfMonth,
  subMonths,
} from "date-fns";

const getMonths = async () => {
  const organisation = await selectCurrentOrganisation();
  const financialStartMonth = getMonth(
    addDays(organisation.endOfFinancialYear, 1),
  );

  const difference = differenceInMonths(
    addDays(organisation.endOfFinancialYear, 1),
    startOfMonth(new Date()),
  );
  const startMonth =
    difference < 6 ? financialStartMonth : getMonth(subMonths(new Date(), 5));

  return [
    startMonth,
    startMonth + 1,
    startMonth + 2,
    startMonth + 3,
    startMonth + 4,
    startMonth + 5,
  ];
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getTotals = async () => {
  const months = await getMonths();
  const transactions = await selectTransactions({ account: null });
  const transfers = await selectTransfers();

  return {
    charity: months.map((month) => ({
      month: monthNames[month],
      income: getTotal({
        transactions,
        transfers,
        account: "charity",
        month,
        type: "income",
      }),
      expense: getTotal({
        transactions,
        transfers,
        account: "charity",
        month,
        type: "expense",
      }),
    })),
    club: months.map((month) => ({
      month: monthNames[month],
      income: getTotal({
        transactions,
        transfers,
        account: "club",
        month,
        type: "income",
      }),
      expense: getTotal({
        transactions,
        transfers,
        account: "club",
        month,
        type: "expense",
      }),
    })),
  };
};
