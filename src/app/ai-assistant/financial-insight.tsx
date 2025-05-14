import { FinancialInsightChart } from "./financial-insight-chart";

// This is a server component that fetches data
export default async function FinancialInsight({
  title,
  chartType,
}: {
  title: string;
  chartType: "pie" | "bar" | "bubble";
}) {
  // Fetch data from your database or API
  const data = await fetchFinancialData(chartType);

  // Calculate total for server-side processing
  const total = data.reduce((acc, item) => acc + item.amount, 0);

  // Pass data to client component for rendering
  return (
    <FinancialInsightChart
      title={title}
      data={data}
      total={total}
      chartType={chartType}
    />
  );
}

// Mock function to simulate fetching data from a database
// Replace this with your actual data fetching logic
async function fetchFinancialData(chartType: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Return different data based on chart type
  if (chartType === "bubble") {
    return [
      { category: "Savings", amount: 1200, risk: 0.2, growth: 0.05 },
      { category: "Stocks", amount: 2500, risk: 0.6, growth: 0.12 },
      { category: "Bonds", amount: 1800, risk: 0.3, growth: 0.04 },
      { category: "Real Estate", amount: 3500, risk: 0.5, growth: 0.08 },
      { category: "Crypto", amount: 800, risk: 0.9, growth: 0.25 },
    ];
  } else if (chartType === "bar") {
    return [
      { category: "Salary", amount: 3500 },
      { category: "Investments", amount: 500 },
      { category: "Side Hustle", amount: 300 },
    ];
  } else {
    // Default pie chart data
    return [
      { category: "Housing", amount: 1200 },
      { category: "Food", amount: 400 },
      { category: "Transportation", amount: 200 },
      { category: "Entertainment", amount: 150 },
      { category: "Utilities", amount: 250 },
    ];
  }
}
