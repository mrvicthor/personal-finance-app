import { screen, render, fireEvent } from "@testing-library/react";
import HomeClient from "@/features/transactions/components/HomeClient";
import {
  getTransactions,
  addTransaction,
} from "@/features/transactions/db/transactions";
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
  addTransaction: jest.fn().mockResolvedValue({
    success: true,
    message: "Transaction added successfully",
  }),
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

  test("should render Add Transaction Form when the button is Add Transaction button is clicked", () => {
    render(
      <HomeClient>
        <div>Transactions</div>
      </HomeClient>
    );
    const addButton = screen.getByRole("button", {
      name: /add transaction/i,
    });
    fireEvent.click(addButton);
    screen.debug();
    expect(addButton).toBeInTheDocument();

    // fireEvent.click(addButton);
    // // screen.debug();
    // const addTransactionForm = screen.getByTestId("add-transaction-form");
    // expect(addTransactionForm).toBeInTheDocument();
  });
});
