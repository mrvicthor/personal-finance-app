import React from "react";

type ButtonProps = {
  title: string;
  handleModal: () => void;
};

const Button = ({ title, handleModal }: ButtonProps) => {
  return (
    <button
      onClick={handleModal}
      className="text-white bg-[#201F24] h-[3.3125rem] w-[9.6875rem] rounded-lg capitalize ml-auto"
    >
      + {title}
    </button>
  );
};

export default Button;
