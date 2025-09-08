import HomeClient from "@/components/homeClient";
import HomeServer from "@/components/homeServer";
import { SkeletonDashboard } from "@/components/skeletons/skeleton-dashboard";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
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
