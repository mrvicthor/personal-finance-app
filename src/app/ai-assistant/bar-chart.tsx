"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Balance } from "@/types/balance";

type BarChartType = {
  data: Balance;
};

export function BarChartInsight({ data }: BarChartType) {
  const chartData = Object.entries(data).map(([key, value]) => {
    return { balance: key, total: value };
  });

  const chartConfig = {
    total: {
      label: "Total",
      color: "#3F82B2",
    },
  } satisfies ChartConfig;

  return (
    <section className="mt-4 space-y-6">
      <h3 className="capitalize text-[#201f24] text-xl font-bold">
        Balance Summary
      </h3>
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="balance"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="total" fill="var(--color-total)" radius={8}>
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
      <div>
        <p className=" text-sm text-[#696868]">
          Showing your balance for the last 3 months
        </p>
      </div>
    </section>
  );
}
