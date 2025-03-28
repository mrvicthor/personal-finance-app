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
type Budget = {
  category: string;
  maximum: number;
  theme: string;
};

type BudgetsProps = {
  data: Budget[];
};
const Bubblechart = ({ data }: BudgetsProps) => {
  const [mounted, setMounted] = React.useState(false);
  const totalBudget = useMemo(() => {
    return data.reduce((acc: number, item: Budget) => acc + item.maximum, 0);
  }, [data]);

  const chartData = data.map((item: Budget) => ({
    ...item,
    fill: item.theme,
  }));

  const chartConfig = {
    maximum: {
      label: "Maximums",
    },
    entertainment: {
      label: "Entertainment",
      color: "#277C78",
    },
    bills: {
      label: "Bills",
      color: "#82C9D7",
    },
    diningOut: {
      label: "Dining Out",
      color: "#F2CDAC",
    },
    personalCare: {
      label: "Personal Care",
      color: "#626070",
    },
  } satisfies ChartConfig;

  React.useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) return null;
  return (
    <ChartContainer
      config={chartConfig}
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
                      {formatNumber(totalBudget)}
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
