import Link from "next/link";
import React from "react";
import Image from "next/image";
import arrowRight from "../../public/assets/images/icon-caret-right.svg";
import { getFinanceData } from "../../lib/data";
import { formatCurrency } from "@/helpers";

type Transaction = {
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
  const transactionsToDisplay = data.transactions
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
      <ul className="mt-[0.96875rem] divide-y-[1px]">
        {transactionsToDisplay.map(
          (transaction: Transaction, index: number) => (
            <li key={index} className="flex justify-between py-5">
              <div className="flex gap-4 items-center">
                <Image
                  src={`${transaction.avatar.slice(1)}`}
                  alt={transaction.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="block text-sm font-bold">
                  {transaction.name}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span
                  className={`${
                    transaction.amount > 0 && "text-[#277c78]"
                  } block text-sm font-bold`}
                >
                  {transaction.amount > 0
                    ? "+" + formatCurrency(transaction.amount)
                    : formatCurrency(transaction.amount)}
                </span>
                <span className="block text-[#696868] text-xs font-normal">
                  {transaction.date}
                </span>
              </div>
            </li>
          )
        )}
      </ul>
    </section>
  );
};

export default Transactions;
