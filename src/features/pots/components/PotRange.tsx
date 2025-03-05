import React from "react";

type PotRangeProps = {
  target: number;
  total: number;
  theme: string;
};

const PotRange = ({ target, total, theme }: PotRangeProps) => {
  const percentage = (total / target) * 100;
  return (
    <div
      style={{
        backgroundColor: theme,
        height: "100%",
        width: `${percentage}%`,
        borderRadius: "4px",
      }}
    />
  );
};

export default PotRange;
