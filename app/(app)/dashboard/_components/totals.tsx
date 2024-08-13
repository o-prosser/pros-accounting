import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Caption } from "@/components/ui/typography";
import { selectCurrentOrganisation } from "@/models/organisation";
import { selectTransactions } from "@/models/transaction";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import IncomeExpenseChart from "./chart";
import { getTotals } from "./data";
import { selectTransfers } from "@/models/transfer";

const Totals = async () => {
  const organisation = await selectCurrentOrganisation();
  const transactions = await selectTransactions({account: null});
  const transfers = await selectTransfers();

  const total = (account: "club" | "charity", type: "income" | "expense") => {
    const filtered = transactions
      .filter((transaction) => {
        const transactionType =
          transaction.income !== null ? "income" : "expense";
        if (
          transaction.account === account &&
          type === transactionType
        )
          return true;
      })
      .map((transaction) => transaction[type]);

    const total = filtered.reduce(
      (total, current) => total + parseFloat(current || ""),
      0,
    );

    const transferTotal = transfers
      .filter((transfer) => {
        return type === "income"
          ? transfer.to === account
          : transfer.from === account;
      })
      .map((transfer) => transfer.amount)
      .reduce((total, current) => total + parseFloat(current || ""), 0);

    return total + transferTotal;
  };

  const charityIncome = total("charity", "income");
  const charityExpense = total("charity", "expense");
  const charityInitial = organisation.initialCharityBalance
    ? parseFloat(organisation.initialCharityBalance)
    : 0;
  const clubIncome = total("club", "income");
  const clubExpense = total("club", "expense");
  const clubInitial = organisation.initialClubBalance
    ? parseFloat(organisation.initialClubBalance)
    : 0;

  const monthlyTotals = await getTotals();

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-4 border-orange-600 bg-orange-100/50 dark:bg-orange-950">
          <CardTitle className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full flex-shrink-0 bg-orange-600" />
            <span>Charity account</span>
          </CardTitle>
          <div className="mt-2">
            <Caption>Current balance</Caption>
            <p className="text-3xl font-mono font-semibold tracking-tight">
              {/* {charityIncome + charityInitial - charityExpense > 0 ? "+" : ""} */}
              {charityIncome + charityInitial - charityExpense == 0
                ? "---"
                : new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP",
                  }).format(charityIncome + charityInitial - charityExpense)}
            </p>
          </div>
          <div className="flex gap-6 mt-2">
            <div>
              <Caption className="text-sm">Income</Caption>
              <p className="text-xl font-mono font-semibold tracking-tight">
                {charityIncome == 0
                  ? "---"
                  : new Intl.NumberFormat("en-GB", {
                      style: "currency",
                      currency: "GBP",
                    }).format(charityIncome)}
              </p>
            </div>
            <div>
              <Caption className="text-sm">Expense</Caption>
              <p className="text-xl font-mono font-semibold tracking-tight">
                {charityExpense == 0
                  ? "---"
                  : new Intl.NumberFormat("en-GB", {
                      style: "currency",
                      currency: "GBP",
                    }).format(charityExpense)}
              </p>
            </div>
          </div>
          <Button asChild variant={null} size="sm" className="group -ml-3 my-2">
            <Link href="/transactions/cash-book/charity">
              View transactions
              <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition duration-100 text-orange-600" />
            </Link>
          </Button>

          <IncomeExpenseChart data={monthlyTotals.charity} account="charity" />
        </Card>
        <Card className="p-4 border-cyan-600 bg-cyan-100/50 dark:bg-cyan-950">
          <CardTitle className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full flex-shrink-0 bg-cyan-600" />
            <span>Club account</span>
          </CardTitle>
          <div className="mt-2">
            <Caption>
              Current balance
            </Caption>
            <p className="text-3xl font-mono font-semibold tracking-tight">
              {/* {clubIncome + clubInitial - clubExpense > 0 ? "+" : ""} */}
              {clubIncome + clubInitial - clubExpense == 0
                ? "---"
                : new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP",
                  }).format(clubIncome + clubInitial - clubExpense)}
            </p>
          </div>
          <div className="flex gap-6 mt-2">
            <div>
              <Caption className="text-sm">Income</Caption>
              <p className="text-xl font-mono font-semibold tracking-tight">
                {clubIncome == 0
                  ? "---"
                  : new Intl.NumberFormat("en-GB", {
                      style: "currency",
                      currency: "GBP",
                    }).format(clubIncome)}
              </p>
            </div>
            <div>
              <Caption className="text-sm">Expense</Caption>
              <p className="text-xl font-mono font-semibold tracking-tight">
                {clubExpense == 0
                  ? "---"
                  : new Intl.NumberFormat("en-GB", {
                      style: "currency",
                      currency: "GBP",
                    }).format(clubExpense)}
              </p>
            </div>
          </div>
          <Button asChild variant={null} size="sm" className="group -ml-3 my-2">
            <Link href="/transactions/cash-book/club">
              View transactions
              <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition duration-100 text-cyan-600" />
            </Link>
          </Button>

          <IncomeExpenseChart data={monthlyTotals.club} account="club" />
        </Card>
      </div>
    </>
  );
};

export default Totals;
