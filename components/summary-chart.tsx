"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

const chartConfig = (account: "charity" | "club" | "dutch") =>
  ({
    income: {
      label: "Income",
      color: account === "charity" ? "#ea580c" : account === 'club' ? "#0891b2" : "#84cc16",
    },
    expense: {
      label: "Expense",
      color: account === "charity" ? "#fdba74" : account === 'club' ? "#67e8f9" : "#16a34a",
    },
  } satisfies ChartConfig);

export default function IncomeExpenseChart({
  data,
  account,
  min
}: {
  data: { month: string; income: number; expense: number }[];
  account: "charity" | "club" | "dutch";
  min?: boolean;
}) {
  return (
    <ChartContainer className={cn(min && "w-full")} config={chartConfig(account)}>
      <BarChart height={300} style={min && {height: "192px"}} accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        {min ? "" : <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />}
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        {min ? "" : <ChartLegend content={<ChartLegendContent />} />}
        <Bar dataKey="income" fill="var(--color-income)" radius={4} />
        <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
