import React from "react";
import Image from "next/image";
import ellipsisIcon from "../../../../public/assets/images/icon-ellipsis.svg";

type TitleProps = {
  title: string;
};
const Title = ({ title }: TitleProps) => {
  return (
    <div className="flex items-center gap-4 justify-between">
      <div className="bg-[#277C78] h-4 w-4 rounded-full" />
      <h2 className="capitalize mr-auto text-[#201F24] text-[1.25rem] font-bold">
        {title}
      </h2>
      <Image src={ellipsisIcon} alt="ellipsis" />
    </div>
  );
};

export default Title;
