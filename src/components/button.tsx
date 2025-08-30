import React from "react";

type ButtonProps = {
  title: string;
  handleModal: () => void;
  testId: string;
};

const Button = ({ title, handleModal, testId }: ButtonProps) => {
  return (
    <button
      onClick={handleModal}
      data-testid={testId}
      className="text-white bg-[#201F24] h-[3.3125rem] w-[9.6875rem] rounded-lg capitalize ml-auto"
    >
      + {title}
    </button>
  );
};

export default Button;
