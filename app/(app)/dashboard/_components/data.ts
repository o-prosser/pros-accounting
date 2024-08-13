import { selectCurrentOrganisation } from "@/models/organisation"
import { selectTransactions } from "@/models/transaction";
import { addDays, differenceInMonths, getMonth, startOfMonth, subMonths } from "date-fns";

const getMonths = async () => {
  const organisation = await selectCurrentOrganisation();
  const financialStartMonth = getMonth(
    addDays(organisation.endOfFinancialYear, 1),
  );

  const difference = differenceInMonths(
    addDays(organisation.endOfFinancialYear, 1),
    startOfMonth(new Date()),
  );
  const startMonth = difference < 6 ? financialStartMonth : getMonth(subMonths(new Date(), 5));

  return [
    startMonth,
    startMonth + 1,
    startMonth + 2,
    startMonth + 3,
    startMonth + 4,
    startMonth + 5,
  ];
}

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

  const getTotal = async (
    account: "charity" | "club",
    month: number,
    type: "income" | "expense",
  ) => {

    const filtered = transactions
      .filter(
        (t) =>
          t.account === account &&
          getMonth(t.date) === month &&
          t[type] !== null,
      )
      .map((t) => t[type]);

    const total = filtered.reduce(
      (total, current) => total + parseFloat(current || ""),
      0,
    );

    return total;
  };


  return {
    charity: await Promise.all(months.map(async (m) => ({
      month: monthNames[m],
      income: await getTotal("charity", m, "income"),
      expense: await getTotal("charity", m, "expense"),
    }))),
    club: await Promise.all(months.map(async (m) => ({
      month: monthNames[m],
      income: await getTotal("club", m, "income"),
      expense: await getTotal("club", m, "expense"),
    }))),
  };
}