import { Account } from "@/enums";
import { Card, CardTitle } from "./ui/card";
import { Caption } from "./ui/typography";
import { selectTransactions } from "@/models/transaction";
import { selectTransfers } from "@/models/transfer";
import { getInitialBalance, getTotal } from "@/utils/totals";
import { currency } from "@/utils/currency";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  ArrowRightIcon,
  BadgePoundSterlingIcon,
  BanknoteArrowUpIcon,
  DownloadIcon,
  ExternalLinkIcon,
  ShoppingBagIcon,
} from "lucide-react";
import { selectCurrentOrganisation } from "@/models/organisation";
import {
  addDays,
  addMonths,
  differenceInMonths,
  endOfMonth,
  format,
  getMonth,
  getYear,
  isBefore,
  isWithinInterval,
  startOfMonth,
  subMonths,
} from "date-fns";
import IncomeExpenseChart from "./summary-chart";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuRadioItemLink,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ui/context-menu";
import LoadingIndicator from "./loading-indicator";

const getMonths = async () => {
  const organisation = await selectCurrentOrganisation();
  const financialStart = addDays(
    organisation.financialYears.find((fy) => fy.isCurrent)?.startDate ||
      new Date(),
    1,
  );

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

export const getTotals = async ({
  financialYear,
}: {
  financialYear?: { id: string };
}) => {
  const months = await getMonths();
  const transactions = await selectTransactions({
    account: null,
    financialYear,
  });
  const transfers = await selectTransfers({ financialYear });

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
  currentFinancialYear,
  className,
  ...props
}: {
  account: Account;
  chart?: boolean;
  viewButton?: boolean;
  min?: boolean;
  currentFinancialYear?: { id: string; startDate: Date; endDate: Date };
} & React.ComponentProps<"div">) => {
  const transactions = await selectTransactions({
    account: null,
  });
  const transfers = await selectTransfers({});

  const organisation = await selectCurrentOrganisation();

  const income = getTotal({
    transactions: transactions.filter((t) =>
      currentFinancialYear
        ? isWithinInterval(t.date, {
            start: currentFinancialYear.startDate,
            end: currentFinancialYear.endDate,
          })
        : true,
    ),
    transfers: transfers.filter((t) =>
      currentFinancialYear
        ? isWithinInterval(t.date, {
            start: currentFinancialYear.startDate,
            end: currentFinancialYear.endDate,
          })
        : true,
    ),
    type: "income",
    account,
    financialYear: currentFinancialYear,
  });
  const expense = getTotal({
    transactions: transactions.filter((t) =>
      currentFinancialYear
        ? isWithinInterval(t.date, {
            start: currentFinancialYear.startDate,
            end: currentFinancialYear.endDate,
          })
        : true,
    ),
    transfers: transfers.filter((t) =>
      currentFinancialYear
        ? isWithinInterval(t.date, {
            start: currentFinancialYear.startDate,
            end: currentFinancialYear.endDate,
          })
        : true,
    ),
    type: "expense",
    account,
    financialYear: currentFinancialYear,
  });

  const incomeForBalance = getTotal({
    transactions: transactions.filter((t) =>
      currentFinancialYear
        ? isBefore(t.date, addDays(currentFinancialYear.endDate, 1))
        : true,
    ),
    transfers: transfers.filter((t) =>
      currentFinancialYear
        ? isBefore(t.date, addDays(currentFinancialYear.endDate, 1))
        : true,
    ),
    type: "income",
    account,
  });
  const expenseForBalance = getTotal({
    transactions: transactions.filter((t) =>
      currentFinancialYear
        ? isBefore(t.date, addDays(currentFinancialYear.endDate, 1))
        : true,
    ),
    transfers: transfers.filter((t) =>
      currentFinancialYear
        ? isBefore(t.date, addDays(currentFinancialYear.endDate, 1))
        : true,
    ),
    type: "expense",
    account,
  });
  const initial = await getInitialBalance(account);

  const monthlyTotals = await getTotals({
    financialYear: currentFinancialYear,
  });

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="rounded-2xl p-3 border bg-muted/50 group">
          <div className="flex gap-2 items-center">
            <div
              className={cn(
                "bg-gradient-to-br size-7 rounded-lg grid place-items-center via-50%",
                account === "charity" &&
                  "via-orange-600 from-orange-400 to-orange-400",
                account === "club" && "via-cyan-600 from-cyan-400 to-cyan-400",
              )}
            >
              <BadgePoundSterlingIcon className="size-4 text-background" />
            </div>
            <h3 className="font-medium text-xl flex-1">
              <span className="capitalize">{account}</span> account
            </h3>

            <Button
              size="icon"
              variant="ghost"
              className="size-7 opacity-0 group-hover:opacity-100 transition"
              asChild
            >
              <Link href={`/cashbook?account=${account}`}>
                <ExternalLinkIcon />
              </Link>
            </Button>
          </div>
          <div className="bg-background border rounded-lg p-3 mt-2 relative overflow-hidden">
            <div className="absolute -left-px -top-px right-0 bottom-0 bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] bg-[size:20px_20px]" />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-bl from-transparent via-background via-70% to-background"></div>
            <div className="grid grid-cols-2 relative">
              <div>
                <p className="text-2xl font-mono font-semibold tracking-tight">
                  {incomeForBalance + initial - expenseForBalance == 0
                    ? "---"
                    : currency(incomeForBalance + initial - expenseForBalance)}
                </p>
                <p className="font-medium text-muted-foreground">
                  Current balance
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <BanknoteArrowUpIcon
                    className={cn(
                      "size-4",
                      account === "charity" && "text-orange-600",
                      account === "club" && "text-cyan-600",
                    )}
                  />
                  <div className="flex items-end gap-1">
                    <p className="font-mono font-medium tracking-tight">
                      {income == 0 ? "---" : currency(income)}
                    </p>
                    <p className="text-sm pb-[0.5px] text-muted-foreground">
                      income
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingBagIcon
                    className={cn(
                      "size-4",
                      account === "charity" && "text-orange-600",
                      account === "club" && "text-cyan-600",
                    )}
                  />
                  <div className="flex items-end gap-1">
                    <p className="font-mono font-medium tracking-tight">
                      {expense == 0 ? "---" : currency(expense)}
                    </p>
                    <p className="text-sm pb-[0.5px] text-muted-foreground">
                      expenses
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background border rounded-lg p-3 mt-2">
            <IncomeExpenseChart
              min={min}
              data={monthlyTotals[account]}
              account={account}
            />
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuItem inset asChild>
          <Link href={`/cashbook?account=${account}`}>
            Open cash book
            <LoadingIndicator />
          </Link>
        </ContextMenuItem>
        <ContextMenuItem inset asChild>
          <Link href={`/cashbook/create?account=${account}`}>
            Add payment
            <LoadingIndicator />
            <ContextMenuShortcut>⌘N</ContextMenuShortcut>
          </Link>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Reports</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-64">
            <ContextMenuItem asChild>
              <Link
                href={`/reports/account-summary/report?charity=on&club=on&from=${format(
                  startOfMonth(new Date()),
                  "yyyy-MM-dd",
                )}&to=${format(endOfMonth(new Date()), "yyyy-MM-dd")}`}
              >
                <div className="flex-1">Generate monthly summary</div>
                <LoadingIndicator />
                <DownloadIcon />
              </Link>
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup
          value={
            currentFinancialYear?.id ||
            organisation.financialYears.find((fy) => fy.isCurrent)?.id
          }
        >
          <ContextMenuLabel inset>Financial year</ContextMenuLabel>
          {organisation.financialYears.toReversed().map((fy, key) => (
            <ContextMenuRadioItemLink
              key={key}
              value={fy.id}
              href={`/dashboard?fy=${fy.id}`}
            >
              {format(fy.startDate, "MMM yyyy")} &ndash;{" "}
              {format(fy.endDate, "MMM yyyy")}
            </ContextMenuRadioItemLink>
          ))}
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>

    // <Card
    //   className={cn(
    //     "p-4",
    //     account === "charity" &&
    //       "border-orange-600 bg-orange-100/50 dark:bg-orange-950",
    //     account === "club" && "border-cyan-600 bg-cyan-100/50 dark:bg-cyan-950",
    //     account === "dutch" &&
    //       "border-green-600 bg-green-100/50 dark:bg-green-950",
    //     min && "flex jusitfy-between",
    //     className,
    //   )}
    //   {...props}
    // >
    //   <div className="flex-1">
    //     <CardTitle className="flex items-center gap-2">
    //       <div
    //         className={cn(
    //           "h-4 w-4 rounded-full flex-shrink-0",
    //           account === "charity" && "bg-orange-600",
    //           account === "club" && "bg-cyan-600",
    //           account === "dutch" && "bg-green-600",
    //         )}
    //       />
    //       <span className="capitalize">
    //         {account} {account === "dutch" ? "Visit" : ""} account
    //       </span>
    //     </CardTitle>
    //     <div className="mt-2">
    //       <Caption>Current balance</Caption>
    //       <p className="text-3xl font-mono font-semibold tracking-tight">
    //         {/* {charityIncome + charityInitial - charityExpense > 0 ? "+" : ""} */}
    //         {income + initial - expense == 0
    //           ? "---"
    //           : currency(income + initial - expense)}
    //       </p>
    //     </div>
    //     <div className="flex gap-6 mt-2">
    //       <div>
    //         <Caption className="text-sm">Income</Caption>
    //         <p className="text-xl font-mono font-semibold tracking-tight">
    //           {income == 0 ? "---" : currency(income)}
    //         </p>
    //       </div>
    //       <div>
    //         <Caption className="text-sm">Expense</Caption>
    //         <p className="text-xl font-mono font-semibold tracking-tight">
    //           {expense == 0 ? "---" : currency(expense)}
    //         </p>
    //       </div>
    //     </div>
    //     {viewButton ? (
    //       <Button
    //         asChild
    //         variant={null}
    //         size="sm"
    //         className={cn(
    //           "group -ml-3",
    //           account !== "dutch" ? "my-2" : "mt-2 -mb-2",
    //         )}
    //       >
    //         <Link href={`/transactions/cash-book/${account}`}>
    //           View transactions
    //           <ArrowRightIcon
    //             className={cn(
    //               "h-4 w-4 ml-2 group-hover:translate-x-1 transition duration-100",
    //               account === "charity" && "text-orange-600",
    //               account === "club" && "text-cyan-600",
    //               account === "dutch" && "text-green-600",
    //             )}
    //           />
    //         </Link>
    //       </Button>
    //     ) : (
    //       ""
    //     )}
    //   </div>

    //   {chart ? (
    //     <div className={cn(min && "h-48 w-1/2 flex justify-end")}>
    //       <IncomeExpenseChart
    //         min={min}
    //         data={monthlyTotals[account]}
    //         account={account}
    //       />
    //     </div>
    //   ) : (
    //     ""
    //   )}
    // </Card>
  );
};

export default SummaryWidget;
