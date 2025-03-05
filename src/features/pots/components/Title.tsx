import React from "react";
import Image from "next/image";
import ellipsisIcon from "../../../../public/assets/images/icon-ellipsis.svg";

type TitleProps = {
  title: string;
  theme: string;
};
const Title = ({ title, theme }: TitleProps) => {
  return (
    <div className="flex items-center gap-4 justify-between">
      <div
        style={{ backgroundColor: theme }}
        className=" h-4 w-4 rounded-full"
      />
      <h2 className="capitalize mr-auto text-[#201F24] text-[1.25rem] font-bold">
        {title}
      </h2>
      <Image src={ellipsisIcon} alt="ellipsis" />
    </div>
  );
};

export default Title;
