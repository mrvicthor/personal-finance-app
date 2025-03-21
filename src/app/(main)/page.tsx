import HomeServer from "@/components/homeServer";
import { getUser } from "../lib/dal";
import HomeClient from "@/components/homeClient";
import Loading from "@/components/loading";

import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Home() {
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
