import React from "react";

type IconProps = {
  path: string;
  currentColor: string;
};
const Icon = ({ path, currentColor }: IconProps) => {
  return (
    <svg
      fill="none"
      height={20}
      viewBox="0 0 20 20"
      width={20}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={path} fill={currentColor} />
    </svg>
  );
};

export default Icon;
