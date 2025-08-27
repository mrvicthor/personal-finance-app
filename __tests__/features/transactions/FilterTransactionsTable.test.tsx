import { render } from "@testing-library/react";
import FilterTransactionsTable from "@/features/transactions/components/FilterTransactionsTable";
import { Transaction } from "@/types/transaction";

jest.mock("lucide-react", () => {
  return new Proxy(
    {},
    {
      get: (target, prop) => {
        return () => <svg data-testid={String(prop)} />;
      },
    }
  );
});

describe("FilterTransactionsTable page", () => {
  test("should view all transactions on transactions page", () => {
    const transactions: Transaction[] = [
      {
        avatar: "./assets/images/avatars/emma-richardson.jpg",
        name: "Emma Richardson",
        category: "General",
        date: "2024-08-19T14:23:11Z",
        amount: 75.5,
        recurring: false,
      },
      {
        avatar: "./assets/images/avatars/savory-bites-bistro.jpg",
        name: "Savory Bites Bistro",
        category: "Dining Out",
        date: "2024-08-19T20:23:11Z",
        amount: -55.5,
        recurring: false,
      },
    ];

    render(<FilterTransactionsTable transactions={transactions} />);
  });
});
