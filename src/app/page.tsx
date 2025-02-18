import Balance from "@/components/balance";
import Budgets from "@/components/budgets";
import Header from "@/components/header";
import Pots from "@/components/pots";
import Title from "@/components/title";
import Transactions from "@/components/transactions";

export default function Home() {
  return (
    <main className="main py-8 h-screen overflow-hidden overflow-y-scroll">
      <section className="px-6 sm:px-10">
        <Title title="overview" />
        <Balance />
        <section className="grid main-overview mt-8 gap-6">
          <section className="grid main-overview-pot gap-6">
            <Pots />
            <Transactions />
          </section>
          <section className="grid main-overview-budgets">
            <Budgets />
          </section>
        </section>
      </section>
      <Header />
    </main>
  );
}
