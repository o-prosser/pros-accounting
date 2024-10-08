"use client";

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  income: {
    label: "Income",
    color: "#16a34a",
  },
  expense: {
    label: "Expense",
    color: "#dc2626",
  },
} satisfies ChartConfig;

const MonthlyChart = ({
  data,
}: {
  data: { month: string; income: number; expense: number }[];
}) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[150px] max-h-[400px] h-[400px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Bar dataKey="income" fill="var(--color-income)" radius={4} />
        <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default MonthlyChart;
