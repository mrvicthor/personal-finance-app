import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/components/loading";
import closeIcon from "../../../../public/assets/images/icon-close-modal.svg";
import { getPots } from "../actions/pots";
import EditPotForm from "./forms/EditForm";

type EditPotProps = {
  onClose: () => void;
  selected: string;
};

export type Pot = {
  id: number;
  name: string;
  target: number | null;
  total: number | null;
  theme: string;
};

const EditPot = ({ onClose, selected }: EditPotProps) => {
  const [selectedPot, setSelectedPot] = useState<Pot>({} as Pot);
  const [usedThemes, setUsedThemes] = useState<string[]>([]);

  useEffect(() => {
    const updateTheme = async () => {
      const data = await getPots();
      const themes = data.map((pot) => pot.theme);
      setUsedThemes(themes);
      const selectedItem = data.find((pot) => pot.name === selected);
      if (selectedItem) return setSelectedPot(selectedItem);
    };
    updateTheme();
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
            edit pot
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
        {Object.keys(selectedPot).length > 0 ? (
          <EditPotForm selected={selectedPot} usedThemes={usedThemes} />
        ) : (
          <p className="text-red-500">
            Oops! Nothing to edit. Please close the modal.
          </p>
        )}
      </div>
    </Suspense>
  );
};

export default EditPot;
