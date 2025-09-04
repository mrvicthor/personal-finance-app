import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/components/loading";
import { SelectedPot } from "@/types/pot";
import WithdrawMoneyForm from "./forms/WithdrawMoneyForm";

type WithdrawMoneyProps = {
  onClose: () => void;
  selected: string;
  selectedPot: SelectedPot | null;
};

const WithdrawMoney = ({
  onClose,
  selected,
  selectedPot,
}: WithdrawMoneyProps) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-[20.9375rem] sm:max-w-[35rem] py-8 px-5 sm:px-8 z-50">
        <div className="flex items-center justify-between">
          <p className="text-[#201F24] font-bold text-[2rem]">
            Withdraw from `{selectedPot?.name ? selectedPot.name : selected}`
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="cursor-pointer"
          >
            <Image
              src="/assets/images/icon-close-modal.svg"
              alt="close-icon"
              width={32}
              height={32}
            />
          </button>
        </div>
        {hasMounted && !selectedPot ? (
          <Loading />
        ) : selectedPot ? (
          <WithdrawMoneyForm selectedPot={selectedPot} />
        ) : (
          <p>Oops! Nothing to withdraw...</p>
        )}
      </div>
    </>
  );
};

export default WithdrawMoney;
