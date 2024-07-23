import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Caption } from "@/components/ui/typography";
import { selectCurrentOrganisation } from "@/models/organisation";
import { selectTransactions } from "@/models/transaction";

const Totals = async () => {
  const organisation = await selectCurrentOrganisation();
  const transactions = await selectTransactions();

  const total = (account: "club" | "charity", type: "income" | "expense") => {
    const filtered = transactions
      .filter((transaction) => {
        const transactionType =
          transaction.income !== null ? "income" : "expense";
        if (
          transaction.category.account === account &&
          type === transactionType
        )
          return true;
      })
      .map((transaction) => transaction[type]);

    const total = filtered.reduce(
      (total, current) => total + parseFloat(current || ""),
      0
    );

    return total;
  };

  const charityIncome = total("charity", "income");
  const charityExpense = total("charity", "expense");
  const charityInitial = organisation.initialCharityBalance ? parseFloat(organisation.initialCharityBalance) : 0;
  const clubIncome = total("club", "income");
  const clubExpense = total("club", "expense");
  const clubInitial = organisation.initialClubBalance ? parseFloat(organisation.initialClubBalance) : 0;

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-4 border-cyan-500 bg-cyan-50 dark:bg-cyan-950">
          <Badge variant="outline-accent1">Charity</Badge>
          <div>
            <Caption>
              Balance <span className="italic text-sm">(to date)</span>
            </Caption>
            <p className="text-3xl font-mono font-semibold tracking-tight">
              {/* {charityIncome + charityInitial - charityExpense > 0 ? "+" : ""} */}{charityIncome + charityInitial - charityExpense == 0 ? "---" : new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP",
              }).format(charityIncome + charityInitial - charityExpense)}
            </p>
          </div>
          <div className="flex gap-6 mt-2">
            <div>
              <Caption className="text-sm">Income</Caption>
              <p className="text-xl font-mono font-semibold tracking-tight">
                {charityIncome == 0 ? "---" : new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(charityIncome)}
              </p>
            </div>
            <div>
              <Caption className="text-sm">Expense</Caption>
              <p className="text-xl font-mono font-semibold tracking-tight">
                {charityExpense == 0 ? "---" : new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(charityExpense)}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-orange-500 bg-orange-50 dark:bg-orange-950">
          <Badge variant="outline-accent2">Club</Badge>
          <div>
            <Caption>
              Balance <span className="italic text-sm">(to date)</span>
            </Caption>
            <p className="text-3xl font-mono font-semibold tracking-tight">
            {/* {clubIncome + clubInitial - clubExpense > 0 ? "+" : ""} */}{clubIncome + clubInitial - clubExpense == 0 ? "---" : new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP",
              }).format(clubIncome + clubInitial - clubExpense)}
            </p>
          </div>
          <div className="flex gap-6 mt-2">
            <div>
              <Caption className="text-sm">Income</Caption>
              <p className="text-xl font-mono font-semibold tracking-tight">
                {clubIncome == 0 ? "---" : new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(clubIncome)}
              </p>
            </div>
            <div>
              <Caption className="text-sm">Expense</Caption>
              <p className="text-xl font-mono font-semibold tracking-tight">
                {clubExpense == 0 ? "---" : new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(clubExpense)}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Totals;
