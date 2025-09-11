import { screen, render, fireEvent } from "@testing-library/react";
import HomeClient from "@/features/transactions/components/HomeClient";

import { logout } from "@/app/actions/auth";
import { addTransaction } from "@/features/transactions/db/transactions";

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

jest.mock("../../../app/actions/auth", () => ({
  logout: jest.fn(),
}));

jest.mock("../../../features/transactions/db/transactions", () => ({
  addTransaction: jest.fn().mockResolvedValue({
    success: true,
    message: "Transaction added successfully",
  }),
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

  test("should submit add transaction form if successful ", async () => {
    (addTransaction as jest.Mock).mockImplementation(async () => ({
      success: true,
      message: "Transaction added successfully",
    }));

    render(
      <HomeClient>
        <div>Transactions</div>
      </HomeClient>
    );

    const addButton = screen.getByRole("button", {
      name: /add transaction/i,
    });

    fireEvent.click(addButton);

    const senderField = screen.getByLabelText("recipient / sender", {
      selector: "input",
    });
    const selectCategory = screen.getByTestId("select-category");

    const dateField = screen.getByTestId("date-input");

    const amountField = screen.getByLabelText("amount", { selector: "input" });
    const trueOption = screen.getByLabelText("True") as HTMLInputElement;

    const submitButton = screen.getByTestId("submit-transaction-button");

    fireEvent.change(senderField, { target: { value: "victor eleanya" } });
    fireEvent.change(selectCategory, { target: { value: "Entertainment" } });
    fireEvent.change(dateField, {
      target: { value: "2025-09-02T23:00:00.000Z" },
    });

    fireEvent.change(amountField, { target: { value: "400" } });
    fireEvent.click(trueOption);

    fireEvent.click(submitButton);

    const successMessage = await screen.findByText(
      "Transaction added successfully"
    );

    expect(successMessage).toBeInTheDocument();
  });
});
