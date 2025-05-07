"use client";

import { motion } from "framer-motion";

interface BalanceSkeletonProps {
  type?: "current" | "income" | "expenses";
}

export default function BalanceSkeleton({
  type = "income",
}: BalanceSkeletonProps) {
  const isCurrent = type === "current";

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.li
      variants={itemVariants}
      className={`${
        isCurrent ? "bg-[#201f24] text-white" : "bg-white text-[#201f24]"
      } col-span-1 rounded-lg px-6 py-6 space-y-3 h-[6.9375rem] sm:h-[7.4375rem]`}
    >
      <div
        className={`h-4 w-24 rounded animate-pulse ${isCurrent ? "bg-gray-700" : "bg-gray-200"}`}
      />
      <div
        className={`h-8 w-32 rounded animate-pulse mt-2 ${isCurrent ? "bg-gray-700" : "bg-gray-200"}`}
      />
    </motion.li>
  );
}
