import { Suspense } from "react";
import HomeClient from "@/features/budgets/components/HomeClient";
import HomeServer from "@/features/budgets/components/HomeServer";
import Loading from "@/components/loading";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <HomeClient>
        <HomeServer />
      </HomeClient>
    </Suspense>
  );
}
