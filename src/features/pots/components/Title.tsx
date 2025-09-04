import React from "react";
import Image from "next/image";

type TitleProps = {
  title: string;
  theme: string;
  toggleOptions: () => void;
};
const Title = ({ title, theme, toggleOptions }: TitleProps) => {
  return (
    <div className="flex items-center gap-4 justify-between">
      <div
        style={{ backgroundColor: theme }}
        className=" h-4 w-4 rounded-full"
      />
      <h2 className="capitalize mr-auto text-[#201F24] text-[1.25rem] font-bold">
        {title}
      </h2>
      <button
        type="button"
        onClick={toggleOptions}
        aria-label="Close modal"
        className="cursor-pointer"
      >
        <Image
          src="/assets/images/icon-ellipsis.svg"
          alt="ellipsis"
          height={3.5}
          width={13.5}
        />
      </button>
    </div>
  );
};

export default Title;
