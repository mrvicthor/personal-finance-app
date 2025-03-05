import { formatCurrency } from "@/helpers";
import React from "react";
type PotStatsProps = {
  target: number;
  total: number;
};
const PotStats = ({ target, total }: PotStatsProps) => {
  const percentage = (total / target) * 100;
  return (
    <div className="flex items-center justify-between mt-[0.8125rem]">
      <span className="text-xs text-[#696868] font-bold">
        {percentage.toFixed(2)}%
      </span>
      <span className="text-xs text-[#696868]">
        Target of {formatCurrency(target)}
      </span>
    </div>
  );
};

export default PotStats;
