import { Budget } from "@/components/budgetList";
import { ChartConfig } from "@/components/ui/chart";

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

export const getConfig = (data: Budget[]) => {
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
