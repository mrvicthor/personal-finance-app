import { Suspense } from "react";
// import Bubblechart from "@/components/bubblechart";
// import { getFinanceData } from "../../../../lib/data";
// import SpendingSummary from "@/features/budgets/components/SpendingSummary";
// import Budgets from "@/features/budgets/components/Budgets";
import { getUser } from "@/app/lib/dal";
import { redirect } from "next/navigation";
import HomeClient from "@/features/budgets/components/HomeClient";
import HomeServer from "@/features/budgets/components/HomeServer";
import Loading from "@/components/loading";

export default async function Page() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <Suspense fallback={<Loading />}>
      <HomeClient>
        <HomeServer />
      </HomeClient>
    </Suspense>
  );
}
