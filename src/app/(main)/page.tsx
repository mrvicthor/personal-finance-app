import HomeClient from "@/components/homeClient";
import HomeServer from "@/components/homeServer";
import { SkeletonDashboard } from "@/components/skeletons/skeleton-dashboard";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Suspense fallback={<SkeletonDashboard />}>
        <HomeClient>
          <HomeServer />
        </HomeClient>
      </Suspense>
    </>
  );
}
