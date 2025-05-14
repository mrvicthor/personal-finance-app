"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { BotMessageSquare } from "lucide-react";

export function AiFloatingButton({ className }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  return (
    <div
      className={cn("fixed bottom-16 right-6 z-50 cursor-pointer", className)}
    >
      <Button
        size="lg"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center",
          isHovered ? "bg-blue-600 w-auto px-4" : "bg-blue-500"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => router.push("/ai-assistant")}
      >
        <BotMessageSquare
          className={cn(
            "h-8 w-8 transition-all duration-300",
            isHovered ? "mr-2" : ""
          )}
        />

        <span
          className={cn(
            "whitespace-nowrap overflow-hidden transition-all duration-300",
            isHovered ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"
          )}
        >
          AI Assistant
        </span>
      </Button>
    </div>
  );
}
