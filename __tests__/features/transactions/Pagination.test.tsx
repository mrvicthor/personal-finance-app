import { fireEvent, render, screen } from "@testing-library/react";
import FilterTransactionsTable from "@/features/transactions/components/FilterTransactionsTable";
import { Transaction } from "@/types/transaction";
import { getFinanceData } from "../../../lib/data";

let transactions: Transaction[] = [];

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
  beforeEach(async () => {
    const data = await getFinanceData();
    transactions = [...data.transactions];
  });

  test("should render the FilterTransactionsTable", () => {
    render(<FilterTransactionsTable transactions={transactions} />);
  });

  test("should render pagination component", () => {
    render(<FilterTransactionsTable transactions={transactions} />);
    const paginationTab = screen.getByTestId("pagination-container");
    expect(paginationTab).toBeInTheDocument();
  });

  test("should go to the next page when the next arrow button is clicked", () => {
    render(<FilterTransactionsTable transactions={transactions} />);
    const nextBtn = screen.getByTestId("next-btn");
    fireEvent.click(nextBtn);

    expect(screen.getByText(transactions[0].name)).toBeInTheDocument();
  });

  test("previous button should be disabled if on first transaction page", () => {
    render(<FilterTransactionsTable transactions={transactions} />);
    const previousBtn = screen.getByTestId("previous-btn");
    // fireEvent.click(previousBtn);
    expect(previousBtn).toBeDisabled();
  });
});
