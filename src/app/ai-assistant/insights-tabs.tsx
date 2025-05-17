import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIBubbleChart from "./bubble-chart";
import BarChartServer from "./bar-chart-server";

export default function InsightsTabs() {
  return (
    <>
      <div className="p-4 ">
        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>
          <TabsContent
            value="expenses"
            className="flex items-center justify-center"
          >
            <AIBubbleChart />
          </TabsContent>
          <TabsContent value="income">
            <BarChartServer />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
