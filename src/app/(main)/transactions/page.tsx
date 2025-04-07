// import Title from "@/components/title";
import FilterTransactionsTable from "@/features/transactions/components/FilterTransactionsTable";
import { getFinanceData } from "../../../../lib/data";
import { getUser } from "@/app/lib/dal";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import HomeClient from "@/features/transactions/components/HomeClient";
import Loading from "@/components/loading";

export default async function Page() {
  const data = await getFinanceData();
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <Suspense fallback={<Loading />}>
      <HomeClient>
        <section className="bg-white rounded-lg mt-8 mb-20 sm:mb-28 md:mb-8 px-8 py-8 ">
          <FilterTransactionsTable transactions={data.transactions} />
        </section>
      </HomeClient>
    </Suspense>
  );
}
