import { getFinanceData } from "../../../../lib/data";
import Pots from "@/features/pots/components/Pots";
import PotClient from "@/features/pots/components/PotClient";
import { Suspense } from "react";
import Loading from "@/components/loading";
import { getPots } from "@/features/pots/actions/pots";

export default async function Page() {
  const [data, pots] = await Promise.all([getFinanceData(), getPots()]);

  const dataToUse = Array.isArray(pots) && pots.length > 0 ? pots : data.pots;
  return (
    <Suspense fallback={<Loading />}>
      <PotClient>
        <Pots data={dataToUse} />
      </PotClient>
    </Suspense>
  );
}
