import Balance from "@/components/balance";
import Header from "@/components/header";
import Title from "@/components/title";

export default function Home() {
  return (
    <main className="main pt-8 relative">
      <section className="px-6 sm:px-10">
        <Title title="overview" />
        <Balance />
      </section>
      <Header />
    </main>
  );
}
