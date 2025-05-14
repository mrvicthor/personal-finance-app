import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIBubbleChart from "./bubble-chart";

export default function InsightsTabs() {
  return (
    <>
      <div className="p-4 ">
        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
          </TabsList>
          <TabsContent
            value="expenses"
            className="flex items-center justify-center"
          >
            <AIBubbleChart />
          </TabsContent>
          <TabsContent value="income">victor</TabsContent>
          <TabsContent value="investments">zuby</TabsContent>
        </Tabs>
      </div>
    </>
  );
}
