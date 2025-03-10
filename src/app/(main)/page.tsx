import Balance from "@/components/balance";
import BillsPanel from "@/components/billsPanel";
import Budgets from "@/components/budgets";
import Pots from "@/components/pots";
import Title from "@/components/title";
import Transactions from "@/components/transactions";

export default function Home() {
  return (
    <section className="px-4 sm:px-10">
      <Title title="overview" />
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
    </section>
  );
}
