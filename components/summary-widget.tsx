import { Account } from "@/enums";
import { Card, CardTitle } from "./ui/card";
import { Caption } from "./ui/typography";
import { selectTransactions } from "@/models/transaction";
import { selectTransfers } from "@/models/transfer";
import { getInitialBalance, getTotal } from "@/utils/totals";
import { currency } from "@/utils/currency";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { selectCurrentOrganisation } from "@/models/organisation";
import {
  addDays,
  addMonths,
  differenceInMonths,
  getMonth,
  getYear,
  startOfMonth,
  subMonths,
} from "date-fns";
import IncomeExpenseChart from "./summary-chart";
import { cn } from "@/lib/utils";

const getMonths = async () => {
  const organisation = await selectCurrentOrganisation();
  const financialStart = addDays(organisation.endOfFinancialYear, 1);

  const startFromFinancialStart =
    differenceInMonths(startOfMonth(new Date()), financialStart) <= 6;

  return startFromFinancialStart
    ? [
        financialStart,
        addMonths(financialStart, 1),
        addMonths(financialStart, 2),
        addMonths(financialStart, 3),
        addMonths(financialStart, 4),
        addMonths(financialStart, 5),
      ]
    : [
        startOfMonth(subMonths(new Date(), 5)),
        startOfMonth(subMonths(new Date(), 4)),
        startOfMonth(subMonths(new Date(), 3)),
        startOfMonth(subMonths(new Date(), 2)),
        startOfMonth(subMonths(new Date(), 1)),
        startOfMonth(new Date()),
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
      month: monthNames[month.getMonth()],
      income: getTotal({
        transactions,
        transfers,
        account: "charity",
        month: month.getMonth(),
        type: "income",
      }),
      expense: getTotal({
        transactions,
        transfers,
        account: "charity",
        month: month.getMonth(),
        type: "expense",
      }),
    })),
    club: months.map((month) => ({
      month: monthNames[month.getMonth()],
      income: getTotal({
        transactions,
        transfers,
        account: "club",
        month: month.getMonth(),
        type: "income",
      }),
      expense: getTotal({
        transactions,
        transfers,
        account: "club",
        month: month.getMonth(),
        type: "expense",
      }),
    })),
    dutch: months.map((month) => ({
      month: monthNames[month.getMonth()],
      income: getTotal({
        transactions,
        transfers,
        account: "dutch",
        month: month.getMonth(),
        type: "income",
      }),
      expense: getTotal({
        transactions,
        transfers,
        account: "dutch",
        month: month.getMonth(),
        type: "expense",
      }),
    })),
  };
};

const SummaryWidget = async ({
  account,
  chart = true,
  viewButton = true,
  min = false,
  className,
  ...props
}: {
  account: Account;
  chart?: boolean;
  viewButton?: boolean;
  min?: boolean;
} & React.ComponentProps<"div">) => {
  const transactions = await selectTransactions({ account: null });
  const transfers = await selectTransfers();

  const income = getTotal({ transactions, transfers, type: "income", account });
  const expense = getTotal({
    transactions,
    transfers,
    type: "expense",
    account,
  });
  const initial = await getInitialBalance(account);

  const monthlyTotals = await getTotals();

  return (
    <Card
      className={cn(
        "p-4",
        account === "charity" &&
          "border-orange-600 bg-orange-100/50 dark:bg-orange-950",
        account === "club" && "border-cyan-600 bg-cyan-100/50 dark:bg-cyan-950",
        account === "dutch" &&
          "border-green-600 bg-green-100/50 dark:bg-green-950",
        min && "flex jusitfy-between",
        className,
      )}
      {...props}
    >
      <div className="flex-1">
        <CardTitle className="flex items-center gap-2">
          <div
            className={cn(
              "h-4 w-4 rounded-full flex-shrink-0",
              account === "charity" && "bg-orange-600",
              account === "club" && "bg-cyan-600",
              account === "dutch" && "bg-green-600",
            )}
          />
          <span className="capitalize">
            {account} {account === "dutch" ? "Visit" : ""} account
          </span>
        </CardTitle>
        <div className="mt-2">
          <Caption>Current balance</Caption>
          <p className="text-3xl font-mono font-semibold tracking-tight">
            {/* {charityIncome + charityInitial - charityExpense > 0 ? "+" : ""} */}
            {income + initial - expense == 0
              ? "---"
              : currency(income + initial - expense)}
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
        {viewButton ? (
          <Button
            asChild
            variant={null}
            size="sm"
            className={cn(
              "group -ml-3",
              account !== "dutch" ? "my-2" : "mt-2 -mb-2",
            )}
          >
            <Link href={`/transactions/cash-book/${account}`}>
              View transactions
              <ArrowRightIcon
                className={cn(
                  "h-4 w-4 ml-2 group-hover:translate-x-1 transition duration-100",
                  account === "charity" && "text-orange-600",
                  account === "club" && "text-cyan-600",
                  account === "dutch" && "text-green-600",
                )}
              />
            </Link>
          </Button>
        ) : (
          ""
        )}
      </div>

      {chart ? (
        <div className={cn(min && "h-48 w-1/2 flex justify-end")}>
          <IncomeExpenseChart
            min={min}
            data={monthlyTotals[account]}
            account={account}
          />
        </div>
      ) : (
        ""
      )}
    </Card>
  );
};

export default SummaryWidget;
