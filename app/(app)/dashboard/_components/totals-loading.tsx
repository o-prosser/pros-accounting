import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Caption } from "@/components/ui/typography";

const TotalsLoading =  () => {
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
              ---
            </p>
          </div>
          <div className="flex gap-6 mt-2">
            <div>
              <Caption className="text-sm">Income</Caption>
              <p className="text-xl font-mono font-semibold tracking-tight">
                ---
              </p>
            </div>
            <div>
              <Caption className="text-sm">Expense</Caption>
              <p className="text-xl font-mono font-semibold tracking-tight">
                ---
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
              ---
            </p>
          </div>
          <div className="flex gap-6 mt-2">
            <div>
              <Caption className="text-sm">Income</Caption>
              <p className="text-xl font-mono font-semibold tracking-tight">
                ---
              </p>
            </div>
            <div>
              <Caption className="text-sm">Expense</Caption>
              <p className="text-xl font-mono font-semibold tracking-tight">
                ---
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default TotalsLoading;
