"use client";
import { useCollapseStore } from "@/providers/collapse-store-provider";
import React from "react";

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
