import React from "react";
import { CollapseStoreProvider } from "@/providers/collapse-store-provider";
import Header from "@/components/header";
import LayoutWrapper from "@/components/layoutWrapper";
import Sidebar from "@/components/sidebar";
import { getUser } from "../lib/dal";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }
  return (
    <CollapseStoreProvider>
      <LayoutWrapper>
        <Sidebar />
        <main className="main pt-6 sm:pt-8 md:h-screen overflow-hidden overflow-y-scroll">
          {children}
          <Header />
        </main>
      </LayoutWrapper>
    </CollapseStoreProvider>
  );
}
