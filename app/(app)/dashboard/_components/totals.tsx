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
import { getInitialBalance, getTotal } from "@/utils/totals";
import { currency } from "@/utils/currency";

const Totals = async () => {
  const organisation = await selectCurrentOrganisation();
  const transactions = await selectTransactions({ account: null });
  const transfers = await selectTransfers();

  const charityIncome = getTotal({
    transactions,
    transfers,
    account: "charity",
    type: "income",
  });
  const charityExpense = getTotal({
    transactions,
    transfers,
    account: "charity",
    type: "expense",
  });
  const charityInitial = await getInitialBalance("charity");
  const clubIncome = getTotal({
    transactions,
    transfers,
    account: "club",
    type: "income",
  });
  const clubExpense = getTotal({
    transactions,
    transfers,
    account: "club",
    type: "expense",
  });
  const clubInitial = await getInitialBalance("club");
   const dutchIncome = getTotal({
     transactions,
     transfers,
     account: "dutch",
     type: "income",
   });
   const dutchExpense = getTotal({
     transactions,
     transfers,
     account: "dutch",
     type: "expense",
   });
   const dutchInitial = await getInitialBalance("dutch");

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
                : currency(charityIncome + charityInitial - charityExpense)}
            </p>
          </div>
          <div className="flex gap-6 mt-2">
            <div>
              <Caption className="text-sm">Income</Caption>
              <p className="text-xl font-mono font-semibold tracking-tight">
                {charityIncome == 0 ? "---" : currency(charityIncome)}
              </p>
            </div>
            <div>
              <Caption className="text-sm">Expense</Caption>
              <p className="text-xl font-mono font-semibold tracking-tight">
                {charityExpense == 0 ? "---" : currency(charityExpense)}
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
            <Caption>Current balance</Caption>
            <p className="text-3xl font-mono font-semibold tracking-tight">
              {/* {clubIncome + clubInitial - clubExpense > 0 ? "+" : ""} */}
              {clubIncome + clubInitial - clubExpense == 0
                ? "---"
                : currency(clubIncome + clubInitial - clubExpense)}
            </p>
          </div>
          <div className="flex gap-6 mt-2">
            <div>
              <Caption className="text-sm">Income</Caption>
              <p className="text-xl font-mono font-semibold tracking-tight">
                {clubIncome == 0 ? "---" : currency(clubIncome)}
              </p>
            </div>
            <div>
              <Caption className="text-sm">Expense</Caption>
              <p className="text-xl font-mono font-semibold tracking-tight">
                {clubExpense == 0 ? "---" : currency(clubExpense)}
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
        <Card className="p-4 border-green-600 !bg-green-100/50 dark:bg-green-950 md:col-span-2">
          <CardTitle className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full flex-shrink-0 bg-green-600" />
            <span>Dutch account</span>
          </CardTitle>
          <div className="mt-2">
            <Caption>Current balance</Caption>
            <p className="text-3xl font-mono font-semibold tracking-tight">
              {/* {clubIncome + clubInitial - clubExpense > 0 ? "+" : ""} */}
              {dutchIncome + dutchInitial - dutchExpense == 0
                ? "---"
                : currency(dutchIncome + dutchInitial - dutchExpense)}
            </p>
          </div>
          <div className="flex gap-6 mt-2">
            <div>
              <Caption className="text-sm">Income</Caption>
              <p className="text-xl font-mono font-semibold tracking-tight">
                {dutchIncome == 0 ? "---" : currency(dutchIncome)}
              </p>
            </div>
            <div>
              <Caption className="text-sm">Expense</Caption>
              <p className="text-xl font-mono font-semibold tracking-tight">
                {dutchExpense == 0 ? "---" : currency(dutchExpense)}
              </p>
            </div>
          </div>
          <Button asChild variant={null} size="sm" className="group -ml-3 mt-2">
            <Link href="/transactions/cash-book/dutch">
              View transactions
              <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition duration-100 text-green-600" />
            </Link>
          </Button>
        </Card>
      </div>
    </>
  );
};

export default Totals;
