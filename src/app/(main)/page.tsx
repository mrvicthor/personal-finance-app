import HomeServer from "@/components/homeServer";
import HomeClient from "@/components/homeClient";
// import Loading from "@/components/loading";
import { Suspense } from "react";
import { SkeletonDashboard } from "@/components/skeletons/skeleton-dashboard";
// import { AiFloatingButton } from "@/components/ai-cta-buttons";

export default function Home() {
  return (
    <Suspense fallback={<SkeletonDashboard />}>
      <HomeClient>
        <HomeServer />
        {/* <AiFloatingButton /> */}
      </HomeClient>
    </Suspense>
  );
}
