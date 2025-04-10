import { Suspense } from "react";
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
