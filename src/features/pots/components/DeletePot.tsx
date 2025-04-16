import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/components/loading";
import closeIcon from "../../../../public/assets/images/icon-close-modal.svg";
import { Pot } from "./EditPot";
import { getPots } from "../actions/pots";
import DeletePotForm from "./forms/DeletePotForm";

type DeletePotProps = {
  onClose: () => void;
  selected: string;
};

const DeletePot = ({ onClose, selected }: DeletePotProps) => {
  const [pot, setPot] = useState<Pot>({} as Pot);
  useEffect(() => {
    const updateData = async () => {
      const data = await getPots();
      if (!data) return;
      const itemSelected = data.find((pot) => pot.name === selected);
      if (itemSelected) return setPot(itemSelected);
    };
    updateData();
  }, [selected]);
  return (
    <Suspense fallback={<Loading />}>
      <div
        className="fixed inset-0 bg-black bg-opacity-20 z-40"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-[20.9375rem] sm:max-w-[35rem] py-8 px-5 sm:px-8 z-50">
        <div className="flex items-center justify-between">
          <p className="text-[#201F24] font-bold text-[2rem] capitalize">
            delete `{pot.name ? pot.name : selected}`?
          </p>
          <Image
            src={closeIcon}
            onClick={onClose}
            alt="close-icon"
            width={32}
            height={32}
            className="cursor-pointer"
          />
        </div>
        {Object.keys(pot).length > 0 ? (
          <DeletePotForm selected={pot} handleModal={onClose} />
        ) : (
          <p className="text-red-500">
            Oops! Nothing to delete. Please close the modal.
          </p>
        )}
      </div>
    </Suspense>
  );
};

export default DeletePot;
