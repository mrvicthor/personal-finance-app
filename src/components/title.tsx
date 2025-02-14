import React from "react";

type TitleProps = {
  title: string;
};
const Title = ({ title }: TitleProps) => {
  return <h1 className="text-[2rem] font-bold capitalize">{title}</h1>;
};

export default Title;
