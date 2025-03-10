"use client";
import React from "react";
import { useCollapseStore } from "@/providers/collapse-store-provider";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isCollapsed } = useCollapseStore((state) => state);
  return (
    <div
      className={`grid ${
        isCollapsed ? "finance-wrapper_isCollapsed" : "finance-wrapper"
      } min-h-screen font-[family-name:var(--font-public-sans)]`}
    >
      {children}
    </div>
  );
};

export default LayoutWrapper;
