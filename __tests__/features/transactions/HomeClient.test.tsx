import { screen, render } from "@testing-library/react";
import HomeClient from "@/features/transactions/components/HomeClient";
import { getTransactions } from "@/features/transactions/db/transactions";
import { Transaction } from "@/types/transaction";

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

jest.mock("../../../src/app/actions/auth", () => ({
  logout: jest.fn(),
}));

jest.mock("../../../src/features/transactions/db/transactions", () => ({
  getTransactions: jest.fn(),
}));

describe("Transactions Page", () => {
  beforeEach(() => {
    (getTransactions as jest.Mock).mockResolvedValue({
      data: transactions,
    });
  });
  test("should render transactions page", () => {
    render(
      <HomeClient>
        <div>Transactions</div>
      </HomeClient>
    );
    const label = screen.getByLabelText("Transactions");
    expect(label).toBeInTheDocument();
  });
});
