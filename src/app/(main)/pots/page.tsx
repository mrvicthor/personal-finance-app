import { getFinanceData } from "../../../../lib/data";
import Pots from "@/features/pots/components/Pots";
import PotClient from "@/features/pots/components/PotClient";
import { Suspense } from "react";
import Loading from "@/components/loading";

export default async function Page() {
  // const [data, pots] = await Promise.all([getFinanceData(), getPots()]);
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
