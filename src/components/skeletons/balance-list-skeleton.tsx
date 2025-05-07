import BalanceSkeleton from "./balance-skeleton";

export default function BalanceListSkeleton() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <>
        <BalanceSkeleton type="current" />
        <BalanceSkeleton type="income" />
        <BalanceSkeleton type="expenses" />
      </>
    </ul>
  );
}
