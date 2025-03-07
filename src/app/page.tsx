import Balance from "@/components/balance";
import BillsPanel from "@/components/billsPanel";
import Budgets from "@/components/budgets";
import Pots from "@/components/pots";
import Title from "@/components/title";
import Transactions from "@/components/transactions";

export default function Home() {
  return (
    <main className="main pt-6 sm:py-8 h-screen overflow-hidden overflow-y-scroll border border-red-500">
      <section className="px-4 sm:px-10">
        <Title title="overview" />
        <Balance />
        <section className="grid main-overview my-8 gap-6">
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
    </main>
  );
}
