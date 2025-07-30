import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Caption } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  BadgePoundSterlingIcon,
  BanknoteArrowUpIcon,
  ShoppingBagIcon,
} from "lucide-react";
import Link from "next/link";

const Widget = ({ account }: { account: "club" | "charity" }) => (
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
    </div>

    <div className="bg-background border rounded-lg p-3 mt-2 relative overflow-hidden">
      <div className="absolute -left-px -top-px right-0 bottom-0 bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="absolute inset-0 h-full w-full bg-gradient-to-bl from-transparent via-background via-70% to-background"></div>
      <div className="grid grid-cols-2 relative">
        <div>
          <p className="text-2xl font-mono font-semibold tracking-tight">---</p>
          <p className="font-medium text-muted-foreground">Current balance</p>
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
              <p className="font-mono font-medium tracking-tight">---</p>
              <p className="text-sm pb-[0.5px] text-muted-foreground">income</p>
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
              <p className="font-mono font-medium tracking-tight">---</p>
              <p className="text-sm pb-[0.5px] text-muted-foreground">
                expenses
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-background border rounded-lg p-3 mt-2 h-[312px]">
      <div className="divide-y border-y divide-[#cccccc]/20 border-[#cccccc]/20 mx-px mt-1">
        <div className="h-[52px]"></div>
        <div className="h-[52px]"></div>
        <div className="h-[52px]"></div>
        <div className="h-[52px]"></div>
      </div>
    </div>
  </div>
);

const TotalsLoading = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <Widget account="charity" />
      <Widget account="club" />
    </div>
  );
};

export default TotalsLoading;
