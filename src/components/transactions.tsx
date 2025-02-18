import Link from "next/link";
import React from "react";
import Image from "next/image";
import arrowRight from "../../public/assets/images/icon-caret-right.svg";
import { getFinanceData } from "../../lib/data";
import Transaction from "./transaction";

export type Transaction = {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
};
const Transactions = async () => {
  const data = await getFinanceData();
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const transactionsToDisplay: Transaction[] = data.transactions
    .filter((item: Transaction, index: number) => index < 5)
    .map((item: Transaction) => ({
      ...item,
      date: new Date(item.date).toLocaleDateString("en-GB", options),
    }));
  return (
    <section className="py-8 px-8 bg-white rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="capitalize text-[#201f24] text-xl font-bold">
          transaction
        </h2>
        <Link href="/transactions" className="capitalize flex gap-3">
          <span className="text-sm text-[#696868]">view all</span>{" "}
          <Image src={arrowRight} alt="arrow right" />
        </Link>
      </div>
      <Transaction transactions={transactionsToDisplay} />
    </section>
  );
};

export default Transactions;
