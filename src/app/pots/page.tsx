import { getFinanceData } from "../../../lib/data";
import Pots from "@/features/pots/components/Pots";

export default async function Page() {
  const data = await getFinanceData();
  const pots = data.pots;
  return (
    <section className="main py-6 sm:py-8 md:h-screen overflow-hidden overflow-y-scroll">
      <section className="px-4 sm:px-10">
        <div className="flex items-center justify-between">
          <h1 className="text-[2rem] font-bold capitalize">pots</h1>
          <button className="text-white bg-[#201F24] h-[3.3125rem] w-[9.6875rem] rounded-lg capitalize">
            + add new pot
          </button>
        </div>
        <Pots data={pots} />
      </section>
    </section>
  );
}
