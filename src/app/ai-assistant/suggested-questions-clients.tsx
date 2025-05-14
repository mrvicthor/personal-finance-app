"use client";
import { Button } from "@/components/ui/button";
import { useAiPromptStore } from "@/providers/ai-prompt-store-provider";

export function SuggestedQuestionsClient() {
  const { setInput, prompt } = useAiPromptStore((state) => state);
  console.log(prompt);
  const questions = [
    "How am I doing financially?",
    "What are my biggest expenses?",
    "How can I save more money?",
    "Analyze my investment portfolio",
    "Create a budget plan",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((question, index) => (
        <Button
          key={index}
          variant="outline"
          className="text-sm"
          onClick={() => {
            setInput(question);
            // In a real implementation, you would dispatch this to the chat component
            // For example, using a global state manager or context
          }}
        >
          {question}
        </Button>
      ))}
    </div>
  );
}
