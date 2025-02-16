import Balance from "@/components/balance";
import Header from "@/components/header";
import Pots from "@/components/pots";
import Title from "@/components/title";

export default function Home() {
  return (
    <main className="main pt-8 h-screen overflow-hidden overflow-y-scroll">
      <section className="px-6 sm:px-10">
        <Title title="overview" />
        <Balance />
        <section className="grid main-overview mt-8 gap-6">
          <section className="grid">
            <Pots />
          </section>
          <section className=""></section>
        </section>
      </section>
      <Header />
    </main>
  );
}
