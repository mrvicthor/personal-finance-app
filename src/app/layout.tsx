import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layoutWrapper";
import Sidebar from "@/components/sidebar";
import { CollapseStoreProvider } from "@/providers/collapse-store-provider";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // use zustand to manage state of collapsible sidebar

  return (
    <html lang="en">
      <body className={`${publicSans.variable} antialiased`}>
        <CollapseStoreProvider>
          <LayoutWrapper>
            {" "}
            <Sidebar />
            {children}
          </LayoutWrapper>
        </CollapseStoreProvider>
      </body>
    </html>
  );
}
