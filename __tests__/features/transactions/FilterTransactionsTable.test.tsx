import { fireEvent, render, screen, act } from "@testing-library/react";
import FilterTransactionsTable, {
  SortOption,
} from "@/features/transactions/components/FilterTransactionsTable";
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
describe("FilterTransactionsTable page", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("should view all transactions on transactions page", () => {
    render(<FilterTransactionsTable transactions={transactions} />);
  });

  test("should render search bar", () => {
    render(<FilterTransactionsTable transactions={transactions} />);
    const searchBar = screen.getByTestId("search-transactions");
    expect(searchBar).toBeInTheDocument();
  });

  test("should filter transactions based on search input", () => {
    render(<FilterTransactionsTable transactions={transactions} />);
    filterTransactionsByName("Emma");
    const transaction = screen.getByText("Emma Richardson");
    expect(transaction).toBeInTheDocument();
  });

  test("should show no transaction found if search input does not match any transaction", async () => {
    render(<FilterTransactionsTable transactions={transactions} />);
    const inputField = screen.getByTestId("search-transactions");
    act(() => {
      fireEvent.change(inputField, { target: { value: "Non Existent" } });

      jest.advanceTimersByTime(3000);
    });

    const noTransaction = await screen.findByTestId("no-transactions");
    expect(noTransaction).toBeInTheDocument();
    expect(noTransaction).toHaveTextContent(
      "Oops! There are no transactions to display"
    );
  });

  test("should filter transactions based on category selected", () => {
    render(<FilterTransactionsTable transactions={transactions} />);
    const selectCategory = screen.getByTestId("select-category");
    fireEvent.click(selectCategory);

    const categoryOption = screen.getAllByText("Dining Out");
    fireEvent.click(categoryOption[0]);

    const transaction = screen.getByText("Savory Bites Bistro");
    expect(transaction).toBeInTheDocument();
  });

  test("should sort transactions by latest - Date", () => {
    render(<FilterTransactionsTable transactions={transactions} />);

    sortTransaction("Latest");

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent(transactions[0].name);
  });

  test("should sort transactions by oldest - Date", () => {
    render(<FilterTransactionsTable transactions={transactions} />);

    sortTransaction("Oldest");
    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent(transactions[1].name);
  });

  test("should sort transactions from A to Z", () => {
    render(<FilterTransactionsTable transactions={transactions} />);
    sortTransaction("A to Z");
    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent(transactions[0].name);
  });

  test("should sort transactions from Z to A", () => {
    render(<FilterTransactionsTable transactions={transactions} />);
    sortTransaction("Z to A");
    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent(transactions[1].name);
  });
});

function sortTransaction(sortValue: SortOption) {
  const sortButton = screen.getByTestId("sort-option-btn");
  fireEvent.click(sortButton);

  const sortOption = screen.getByRole("option", { name: sortValue });
  fireEvent.click(sortOption);
}

function filterTransactionsByName(transactionName: string) {
  const inputField = screen.getByTestId("search-transactions");
  fireEvent.change(inputField, { target: { value: transactionName } });
}
