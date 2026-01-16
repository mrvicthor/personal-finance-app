"use client";
import { useEffect, useState } from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getCategoryTotal } from "@/helpers";
import { Transaction } from "@/types/transaction";
import { getConfig } from "@/helpers/chartConfig";
import { formatNumber } from "@/helpers/currencyFormatter";

type Budget = {
  category: string;
  maximum: number;
  theme: string;
};

type BudgetsProps = {
  data: Budget[];
  transactions: Transaction[];
};

const Bubblechart = ({ data, transactions }: BudgetsProps) => {
  const filteredBudget = transactions.filter((item) =>
    data.some((budget) => budget.category === item.category)
  );
  const totalAmountSpent = filteredBudget.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const totalBudget = data.reduce(
    (acc: number, item: Budget) => acc + item.maximum,
    0
  );

  const chartData = getCategoryTotal(filteredBudget, data);

  const chartConfig = getConfig(data);
  chartConfig.total = {
    label: "Total",
  };

  return (
    <ChartContainer
      config={chartConfig satisfies ChartConfig}
      style={{ width: 300, height: 300 }}
      // className="max-w-[15.4375rem] aspect-square max-h-[15rem]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="total"
          nameKey="category"
          innerRadius={80}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {formatNumber(Math.abs(totalAmountSpent))}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      of {formatNumber(totalBudget)} limit
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};

export default Bubblechart;
