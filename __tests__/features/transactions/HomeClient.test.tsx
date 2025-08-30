import { screen, render, fireEvent } from "@testing-library/react";
import HomeClient from "@/features/transactions/components/HomeClient";
// import { addTransaction } from "@/features/transactions/db/transactions";
import { logout } from "@/app/actions/auth";

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
  addTransaction: jest.fn().mockResolvedValue({
    success: true,
    message: "Transaction added successfully",
  }),
}));

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node: React.ReactNode) => node,
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useActionState: jest.fn(() => [
    { success: false, message: "" },
    jest.fn(),
    false,
  ]),
}));

describe("Transactions Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

  test("should call logout function when logout icon is clicked", () => {
    render(
      <HomeClient>
        <div>Test Content</div>
      </HomeClient>
    );
    fireEvent.click(screen.getByTestId("logout-icon"));
    expect(logout).toHaveBeenCalled();
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
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    expect(screen.getByTestId("add-transaction-form")).toBeInTheDocument();

    const closeBtn = screen.getByTestId("close-button");
    fireEvent.click(closeBtn);
    expect(
      screen.queryByTestId("add-transaction-form")
    ).not.toBeInTheDocument();
  });

  test("should ");
});
