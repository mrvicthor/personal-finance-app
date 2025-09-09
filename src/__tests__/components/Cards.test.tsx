import { render, screen } from "@testing-library/react";

import Cards from "@/components/cards";
import { Balance } from "@/types/balance";
const mockBalanceData: Balance = {
  current: 4000,
  income: 3500,
  expenses: 2000,
};

describe("Balance Cards", () => {
  test("Should render Balance cards", () => {
    render(<Cards data={mockBalanceData} />);
    expect(screen.getByTestId("balance-container")).toBeInTheDocument();
  });
});
