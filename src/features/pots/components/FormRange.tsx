import React from "react";

type FormRangeProps = {
  target: number;
  total: number;
  theme: string;
};

const FormRange = ({ target, total, theme }: FormRangeProps) => {
  const percentage = (total / target) * 100;
  const breakPoint = 5;
  const longestRange = Math.floor((7 / 8) * percentage);
  const warningRaningRange = 10;
  const colorRange =
    longestRange > warningRaningRange
      ? theme
      : longestRange < warningRaningRange && longestRange >= breakPoint
      ? "#C94736"
      : "";

  return (
    <div className="h-full flex">
      <span
        style={{
          backgroundColor: percentage > 0 ? "#201F24" : "",
          width: "1.58rem",
          borderTopLeftRadius: "4px",
          borderBottomLeftRadius: "4px",
          height: "100%",
        }}
      />
      <span
        style={{
          backgroundColor: percentage === breakPoint ? "bg-white" : "",
          width: "1.72px",
          height: "100%",
        }}
      />
      <span
        style={{
          backgroundColor: colorRange,
          width: `${longestRange}%`,
          height: "100%",
          borderTopRightRadius: "4px",
          borderBottomRightRadius: "4px",
        }}
      />
    </div>
  );
};

export default FormRange;
