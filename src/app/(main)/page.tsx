import { getUser } from "../lib/dal";
import Balance from "@/components/balance";
import BillsPanel from "@/components/billsPanel";
import Budgets from "@/components/budgets";
import Loading from "@/components/loading";
import Pots from "@/components/pots";
import Title from "@/components/title";
import Transactions from "@/components/transactions";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Home() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
}
