import React from "react";
import Balance from "./balance";
import Pots from "./pots";
import Transactions from "./transactions";
import Budgets from "./budgets";
import BillsPanel from "./billsPanel";

const HomeServer = () => {
  return (
    <>
      <Balance />
      <section className="grid main-overview gap-6 my-8 sm:mb-10">
        <section className="grid main-overview-pot gap-6">
          <Pots />
          <Transactions />
        </section>
        <section className="grid main-overview-budgets gap-6">
          <Budgets />
          <BillsPanel />
        </section>
      </section>
    </>
  );
};

export default HomeServer;
