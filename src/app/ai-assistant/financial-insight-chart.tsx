"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { PieChart, BarChart4, TrendingUp } from "lucide-react";

// Define types for our data
type BaseDataPoint = {
  category: string;
  amount: number;
};

type BubbleDataPoint = BaseDataPoint & {
  risk: number;
  growth: number;
};

type DataPoint = BaseDataPoint | BubbleDataPoint;

type FinancialInsightChartProps = {
  title: string;
  data: DataPoint[];
  total: number;
  chartType: "pie" | "bar" | "bubble";
};

const COLORS = [
  "#3b82f6", // blue-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#f97316", // orange-500
  "#10b981", // emerald-500
  "#06b6d4", // cyan-500
  "#6366f1", // indigo-500
  "#f59e0b", // amber-500
];

export function FinancialInsightChart({
  title,
  data,
  total,
  chartType,
}: FinancialInsightChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Draw chart
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (chartType === "pie") {
      drawPieChart(ctx, canvas.width, canvas.height, data);
    } else if (chartType === "bar") {
      drawBarChart(ctx, canvas.width, canvas.height, data);
    } else if (chartType === "bubble") {
      drawBubbleChart(
        ctx,
        canvas.width,
        canvas.height,
        data as BubbleDataPoint[]
      );
    }
  }, [data, chartType]);

  const drawPieChart = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    data: DataPoint[]
  ) => {
    const radius = Math.min(width, height) / 2 - 20;
    const centerX = width / 2;
    const centerY = height / 2;

    let startAngle = 0;

    data.forEach((item, index) => {
      const sliceAngle = (2 * Math.PI * item.amount) / total;

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();

      ctx.fillStyle = COLORS[index % COLORS.length];
      ctx.fill();

      // Draw label line and text
      const midAngle = startAngle + sliceAngle / 2;
      const labelRadius = radius * 0.7;
      const labelX = centerX + labelRadius * Math.cos(midAngle);
      const labelY = centerY + labelRadius * Math.sin(midAngle);

      if (item.amount / total > 0.05) {
        // Only label slices that are at least 5% of the total
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          `${Math.round((item.amount / total) * 100)}%`,
          labelX,
          labelY
        );
      }

      startAngle += sliceAngle;
    });
  };

  const drawBarChart = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    data: DataPoint[]
  ) => {
    const padding = { top: 20, right: 20, bottom: 40, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Find max value for scaling
    const maxValue = Math.max(...data.map((item) => item.amount));

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.strokeStyle = "#94a3b8"; // slate-400
    ctx.stroke();

    // Draw bars
    const barWidth = (chartWidth / data.length) * 0.7;
    const barSpacing = (chartWidth / data.length) * 0.3;

    data.forEach((item, index) => {
      const barHeight = (item.amount / maxValue) * chartHeight;
      const x = padding.left + (barWidth + barSpacing) * index + barSpacing / 2;
      const y = height - padding.bottom - barHeight;

      // Draw bar
      ctx.fillStyle = COLORS[index % COLORS.length];
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw category label
      ctx.fillStyle = "#64748b"; // slate-500
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(
        item.category,
        x + barWidth / 2,
        height - padding.bottom + 10
      );

      // Draw value label
      ctx.fillStyle = "#1e293b"; // slate-800
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(`$${item.amount}`, x + barWidth / 2, y - 5);
    });

    // Draw y-axis labels
    const yAxisSteps = 5;
    for (let i = 0; i <= yAxisSteps; i++) {
      const value = (maxValue / yAxisSteps) * i;
      const y = height - padding.bottom - (chartHeight / yAxisSteps) * i;

      ctx.fillStyle = "#64748b"; // slate-500
      ctx.font = "12px sans-serif";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(`$${Math.round(value)}`, padding.left - 10, y);

      // Draw grid line
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.strokeStyle = "#e2e8f0"; // slate-200
      ctx.stroke();
    }
  };

  const drawBubbleChart = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    data: BubbleDataPoint[]
  ) => {
    const padding = { top: 20, right: 20, bottom: 40, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Find max values for scaling
    const maxAmount = Math.max(...data.map((item) => item.amount));
    const maxRisk = Math.max(...data.map((item) => item.risk));
    const maxGrowth = Math.max(...data.map((item) => item.growth));

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom); // x-axis (risk)
    ctx.moveTo(padding.left, height - padding.bottom);
    ctx.lineTo(padding.left, padding.top); // y-axis (growth)
    ctx.strokeStyle = "#94a3b8"; // slate-400
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = "#64748b"; // slate-500
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("Risk", width / 2, height - padding.bottom + 25);

    ctx.save();
    ctx.translate(padding.left - 25, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText("Growth Potential", 0, 0);
    ctx.restore();

    // Draw bubbles
    data.forEach((item, index) => {
      const x = padding.left + (item.risk / maxRisk) * chartWidth;
      const y =
        height - padding.bottom - (item.growth / maxGrowth) * chartHeight;
      const radius = 10 + (item.amount / maxAmount) * 30; // Scale bubble size based on amount

      // Draw bubble
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `${COLORS[index % COLORS.length]}80`; // Add transparency
      ctx.fill();
      ctx.strokeStyle = COLORS[index % COLORS.length];
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw label
      ctx.fillStyle = "#1e293b"; // slate-800
      ctx.font = "bold 10px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(item.category, x, y);
    });

    // Draw risk axis ticks
    for (let i = 0; i <= 5; i++) {
      const x = padding.left + (chartWidth / 5) * i;
      const y = height - padding.bottom;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 5);
      ctx.strokeStyle = "#94a3b8"; // slate-400
      ctx.stroke();

      ctx.fillStyle = "#64748b"; // slate-500
      ctx.font = "10px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText((i * 0.2).toFixed(1), x, y + 8);
    }

    // Draw growth axis ticks
    for (let i = 0; i <= 5; i++) {
      const x = padding.left;
      const y = height - padding.bottom - (chartHeight / 5) * i;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 5, y);
      ctx.strokeStyle = "#94a3b8"; // slate-400
      ctx.stroke();

      ctx.fillStyle = "#64748b"; // slate-500
      ctx.font = "10px sans-serif";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText((i * 0.05).toFixed(2), x - 8, y);
    }
  };

  // Get the appropriate icon based on chart type
  const ChartIcon = () => {
    if (chartType === "pie") return <PieChart className="h-4 w-4" />;
    if (chartType === "bar") return <BarChart4 className="h-4 w-4" />;
    return <TrendingUp className="h-4 w-4" />;
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">{title}</h3>
        <div className="flex items-center gap-1 text-sm text-slate-500">
          <ChartIcon />
          <span>Total: ${total}</span>
        </div>
      </div>

      <div className="relative aspect-square">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="w-full h-full"
        />
      </div>

      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm">{item.category}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">${item.amount}</span>
              <span className="text-xs text-slate-500">
                ({Math.round((item.amount / total) * 100)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
