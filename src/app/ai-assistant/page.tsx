import { AIAssistantClient } from "./ai-assistant-client";

import SuggestedQuestions from "./suggested-questions-server";
import InsightsTabsWrapper from "./insights-tabs-wrapper";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function AIAssistantPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/"
          className="font-bold hover:text-white hover:bg-black hover:py-2 hover:px-2 hover:rounded-full"
        >
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-3xl font-bold  text-center">
          Financial AI Assistant
        </h1>
        <div />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AIAssistantClient />
        </div>

        <div className="lg:col-span-1">
          <div className="h-[600px] flex flex-col border rounded-lg shadow-sm overflow-hidden bg-white dark:bg-slate-950">
            <div className="p-4 border-b bg-slate-50 dark:bg-slate-800">
              <h2 className="font-semibold">Financial Insights</h2>
            </div>
            <InsightsTabsWrapper />
          </div>
        </div>
      </div>
      <SuggestedQuestions />
    </div>
  );
}
