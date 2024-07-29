import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Caption } from "@/components/ui/typography";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const TotalsLoading =  () => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-4 border-orange-600 bg-orange-100/50 dark:bg-orange-950">
          <CardTitle className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full flex-shrink-0 bg-orange-600" />
            <span>Charity account</span>
          </CardTitle>
          <div className="mt-2">
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
          <Button asChild variant={null} size="sm" className="group -ml-3 my-2">
            <Link href="/transactions?account=charity">
              View transactions
              <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition duration-100 text-orange-600" />
            </Link>
          </Button>

          <div className="divide-y border-y">
            <div className="h-[48px]" />
            <div className="h-[48px]" />
            <div className="h-[48px]" />
            <div className="h-[48px]" />
          </div>

          <div className="mt-[14px] flex justify-evenly">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} className="h-3 w-4 my-[1.5px]" />
            ))}
          </div>

          <div className="mt-3 flex gap-4 justify-center">
            <Skeleton className="h-2 w-[54px]" />
            <Skeleton className="h-2 w-[54px]" />
          </div>
        </Card>
        <Card className="p-4 border-cyan-600 bg-cyan-100/50 dark:bg-cyan-950">
          <CardTitle className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full flex-shrink-0 bg-cyan-600" />
            <span>Club account</span>
          </CardTitle>
          <div className="mt-2">
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
          <Button asChild variant={null} size="sm" className="group -ml-3 my-2">
            <Link href="/transactions?account=club">
              View transactions
              <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition duration-100 text-cyan-600" />
            </Link>
          </Button>

          <div className="divide-y border-y">
            <div className="h-[48px]" />
            <div className="h-[48px]" />
            <div className="h-[48px]" />
            <div className="h-[48px]" />
          </div>

          <div className="mt-[14px] flex justify-evenly">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} className="h-3 w-4 my-[1.5px]" />
            ))}
          </div>

          <div className="mt-3 flex gap-4 justify-center">
            <Skeleton className="h-2 w-[54px]" />
            <Skeleton className="h-2 w-[54px]" />
          </div>
        </Card>
      </div>
    </>
  );
};

export default TotalsLoading;
