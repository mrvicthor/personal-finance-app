"use client";
import React, { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatNumber } from "@/helpers";
import { Transaction } from "./transactions";
type Budget = {
  category: string;
  maximum: number;
  theme: string;
};

type BudgetsProps = {
  data: Budget[];
  transactions: Transaction[];
};

type BudgetOption =
  | "general"
  | "entertainment"
  | "bills"
  | "dining out"
  | "personalCare"
  | "shopping"
  | "lifestyle"
  | "education"
  | "groceries"
  | "transportation"
  | "maximum";

const Bubblechart = ({ data, transactions }: BudgetsProps) => {
  const amountSpent = transactions.filter((item) =>
    data.some((budget) => budget.category === item.category)
  );
  const totalAmountSpent = useMemo(() => {
    return amountSpent.reduce((acc, item) => acc + item.amount, 0);
  }, [amountSpent]);

  const [mounted, setMounted] = React.useState(false);
  const totalBudget = useMemo(() => {
    return data.reduce((acc: number, item: Budget) => acc + item.maximum, 0);
  }, [data]);

  const chartData = data.map((item: Budget) => ({
    ...item,
    fill: item.theme,
  }));

  const getConfig = (data: Budget[]) => {
    const configMap: Partial<ChartConfig> = {};
    for (let i = 0; i < data.length; i++) {
      const category = data[i].category.toLowerCase() as BudgetOption;
      if (!configMap[category]) {
        configMap[category] = {
          label: data[i].category,
          color: data[i].theme,
        };
      }
    }
    return configMap as ChartConfig;
  };

  const chartConfig = getConfig(data);
  chartConfig.maximum = {
    label: "Maximums",
  };

  React.useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) return null;
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
          dataKey="maximum"
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
