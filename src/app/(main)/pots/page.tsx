import { getUser } from "@/app/lib/dal";
import { getFinanceData } from "../../../../lib/data";
import Pots from "@/features/pots/components/Pots";
import { redirect } from "next/navigation";
import PotClient from "@/features/pots/components/PotClient";
import { Suspense } from "react";
import Loading from "@/components/loading";

export default async function Page() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const data = await getFinanceData();
  const pots = data.pots;
  return (
    <Suspense fallback={<Loading />}>
      <PotClient>
        <Pots data={pots} />
      </PotClient>
    </Suspense>
  );
}
