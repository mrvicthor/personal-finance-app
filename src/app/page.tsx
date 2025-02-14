import Balance from "@/components/balance";
import Title from "@/components/title";

export default function Home() {
  return (
    <main className="main px-10 pt-8">
      <Title title="overview" />
      <Balance />
    </main>
  );
}
