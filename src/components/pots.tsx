import React from "react";
import { getFinanceData } from "../../lib/data";
import Image from "next/image";
import potIcon from "../../public/assets/images/icon-pot.svg";
import { formatNumber } from "@/helpers/currencyFormatter";
import Subheader from "./subheader";

export type Pot = {
  name: string;
  target: number;
  total: number;
  theme: string;
};
const Pots = async () => {
  const data = await getFinanceData();
  const pots = data.pots;
  const totalSaved = pots.reduce(
    (sum: number, item: Pot) => sum + item.total,
    0
  );

  const resultsToDisplay = pots.filter((item: Pot) => item.name !== "Holiday");
  return (
    <section className="py-8 px-8 bg-white space-y-5 rounded-lg">
      <Subheader title="pots" description="see details" href="/pots" />
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
              style={{ borderColor: item.theme }}
              className={`border-l-4 flex flex-col justify-between px-4`}
            >
              <span className="block text-[#696868] text-xs font-normal">
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
