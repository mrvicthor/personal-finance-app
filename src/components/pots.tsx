import React from "react";
import { getFinanceData } from "../../lib/data";
import Link from "next/link";
import Image from "next/image";
import potIcon from "../../public/assets/images/icon-pot.svg";
import arrowRight from "../../public/assets/images/icon-caret-right.svg";
import { filterTheme, formatNumber } from "@/helpers";

export type Pot = {
  name: string;
  target: number;
  total: number;
  theme: string;
};
const Pots = async () => {
  const data = await getFinanceData();
  const pots = data.pots;
  const totalSaved = pots
    .map((item: Pot) => item.total)
    .reduce((sum: number, acc: number) => sum + acc, 0);

  const resultsToDisplay = pots.filter((item: Pot) => item.name !== "Holiday");
  return (
    <section className="py-8 px-8 bg-white space-y-5 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="capitalize text-[#201f24] text-xl font-bold">pots</h2>
        <Link href="/pots" className="capitalize flex gap-3">
          <span className="text-sm text-[#696868]">see details</span>{" "}
          <Image src={arrowRight} alt="arrow right" />
        </Link>
      </div>
      <div className="h-[6.8725rem] grid sm:grid-cols-2 gap-5">
        <div className="bg-[#f8f4f0] sm:col-span-1 flex rounded-lg px-4 py-5 gap-4 items-center">
          <div>
            <Image src={potIcon} alt="pot icon" />
          </div>
          <div>
            <p className="capitalize text-sm text-[#696868]">total saved</p>
            <p className="text-[2rem] font-bold">{formatNumber(totalSaved)}</p>
          </div>
        </div>
        <ul className="sm:col-span-1 grid grid-cols-2 gap-4">
          {resultsToDisplay.map((item: Pot) => (
            <li
              key={item.name}
              className={`border-l-4 ${filterTheme(
                item.name
              )} flex flex-col justify-between px-4`}
            >
              <span className="block text-xs font-bold text-[#696868]">
                {item.name}
              </span>
              <span className="block text-sm font-bold text-[#201f24]">
                {formatNumber(item.total)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Pots;
