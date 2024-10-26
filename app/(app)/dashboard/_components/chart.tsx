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

const chartConfig = (account: "charity" | "club") =>
  ({
    income: {
      label: "Income",
      color: account === 'charity' ? "#ea580c" : "#0891b2",
    },
    expense: {
      label: "Expense",
      color: account === 'charity' ? "#fdba74" : "#67e8f9",
    },
  } satisfies ChartConfig);

export default function IncomeExpenseChart({
  data,
  account
}: {
  data: { month: string; income: number; expense: number }[];
  account: "charity"|"club"
}) {
  return (
    <ChartContainer config={chartConfig(account)}>
      <BarChart height={300} accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              indicator="line"
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="income" fill="var(--color-income)" radius={4} />
        <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
