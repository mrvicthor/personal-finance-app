"use client";
import React, { useEffect, useState } from "react";
import Title from "@/features/pots/components/Title";
import PotRange from "@/features/pots/components/PotRange";
import PotStats from "@/features/pots/components/PotStats";
import { containerVariants, itemVariants } from "@/helpers";
import { motion } from "motion/react";
import { createPortal } from "react-dom";
import EditPot from "./EditPot";
import DeletePot from "./DeletePot";
import { formatCurrency } from "@/helpers/currencyFormatter";
import { getPots } from "../actions/pots";
import { Pot, SelectedPot } from "@/types/pot";
import AddMoney from "./AddMoney";
import WithdrawMoney from "./WithdrawMoney";

type PotsProps = {
  data: Pot[];
};

const Pots = ({ data }: PotsProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [editPot, setEditPot] = useState(false);
  const [deletePot, setDeletePot] = useState(false);
  const [selectedPot, setSelectedPot] = useState<SelectedPot | null>(null);
  const [usedThemes, setUsedThemes] = useState<string[]>([]);
  const [shouldAddMoney, setShouldAddMoney] = useState(false);
  const [shouldWithdraw, setShouldWithdraw] = useState(false);

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
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid md:grid-cols-2 gap-6 my-8 mb-20 sm:mb-28 md:mb-8"
    >
      {data.map((pot) => (
        <motion.li
          variants={itemVariants}
          key={pot.name}
          className="bg-white rounded-lg py-6 px-6 relative"
        >
          <Title
            title={pot.name}
            theme={pot.theme}
            toggleOptions={() => {
              setShowOptions(!showOptions);
              setSelected(pot.name);
            }}
          />
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#696868] capitalize">
                total saved
              </span>
              <span className="text-[2rem] font-bold text-[#201F24]">
                {formatCurrency(Number(pot.total))}
              </span>
            </div>
            <div>
              <div className="h-2 bg-[#F8F4F0] rounded-md overflow-hidden">
                <PotRange
                  target={Number(pot.target)}
                  total={Number(pot.total)}
                  theme={pot.theme}
                />
              </div>

              <PotStats
                target={pot.target as number}
                total={pot.total as number}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <button
                onClick={() => {
                  setSelected(pot.name);
                  setShouldAddMoney(true);
                }}
                className=" bg-[#F8F4F0] h-[3.3125rem] capitalize text-[#201F24] text-sm font-bold rounded-md"
              >
                + add money
              </button>
              <button
                onClick={() => {
                  setSelected(pot.name);
                  setShouldWithdraw(true);
                }}
                className=" bg-[#F8F4F0] h-[3.3125rem] capitalize text-[#201F24] text-sm font-bold rounded-md"
              >
                withdraw
              </button>
            </div>
          </div>
          {showOptions && selected === pot.name && (
            <div className="absolute top-14 right-8 flex flex-col divide-y-[1px] items-center justify-center px-5 py-3 h-[5.6875rem] w-[8.375rem] bg-white modal-box-shadow rounded-lg">
              <button
                className="text-sm text-[#201F24] pb-3 capitalize"
                onClick={() => {
                  setShowOptions(false);
                  setEditPot(true);
                }}
              >
                edit pot
              </button>
              <button
                className="text-sm text-[#C94736] capitalize pt-3"
                onClick={() => {
                  setShowOptions(false);
                  setDeletePot(true);
                }}
              >
                delete pot
              </button>
            </div>
          )}
        </motion.li>
      ))}
      {editPot &&
        createPortal(
          <EditPot
            onClose={() => {
              setSelected("");
              setSelectedPot(null);
              setEditPot(false);
            }}
            selectedPot={selectedPot}
            usedThemes={usedThemes}
          />,

          document.body
        )}
      {deletePot &&
        createPortal(
          <DeletePot
            onClose={() => {
              setSelected("");
              setSelectedPot(null);
              setDeletePot(false);
            }}
            selected={selected}
            selectedPot={selectedPot}
          />,
          document.body
        )}
      {shouldAddMoney &&
        createPortal(
          <AddMoney
            onClose={() => {
              setSelected("");
              setSelectedPot(null);
              setShouldAddMoney(false);
            }}
            selected={selected}
            selectedPot={selectedPot}
          />,
          document.body
        )}
      {shouldWithdraw &&
        createPortal(
          <WithdrawMoney
            onClose={() => {
              setSelected("");
              setSelectedPot(null);
              setShouldWithdraw(false);
            }}
            selected={selected}
            selectedPot={selectedPot}
          />,
          document.body
        )}
    </motion.ul>
  );
};

export default Pots;
