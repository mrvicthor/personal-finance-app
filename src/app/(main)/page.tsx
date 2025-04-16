import HomeServer from "@/components/homeServer";
import HomeClient from "@/components/homeClient";
import Loading from "@/components/loading";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <HomeClient>
        <HomeServer />
      </HomeClient>
    </Suspense>
  );
}
