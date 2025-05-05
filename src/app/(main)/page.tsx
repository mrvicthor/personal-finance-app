import HomeServer from "@/components/homeServer";
import HomeClient from "@/components/homeClient";
import Loading from "@/components/loading";
import { Suspense } from "react";
import PushNotificationManager from "@/components/pushNotificationManager";
import InstallPrompt from "@/components/installPrompt";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <HomeClient>
        <HomeServer />
        <PushNotificationManager />
        <InstallPrompt />
      </HomeClient>
    </Suspense>
  );
}
