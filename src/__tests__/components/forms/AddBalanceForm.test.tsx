import AddBalanceForm from "@/components/forms/addBalanceForm";

import { render, screen } from "@testing-library/react";

jest.mock("../../../app/actions/balance", () => ({
  addBalance: jest.fn(),
}));

describe("AddBalanceForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Initial Rendering", () => {
    test("should render the form with all input fields and correct initial state", () => {
      // Arrange
      render(<AddBalanceForm />);
      const formHeadingText = "Add your income, expenses and balance";
      const formHeading = screen.getByRole("heading", {
        level: 2,
        name: formHeadingText,
      });
      const currentBalanceInput = screen.getByLabelText("current balance");
      const incomeInput = screen.getByLabelText("income");
      const expensesInput = screen.getByLabelText("expenses");

      // Assert
      expect(formHeading).toBeInTheDocument();
      expect(currentBalanceInput).toBeInTheDocument();
      expect(currentBalanceInput).toHaveValue("");
      expect(incomeInput).toBeInTheDocument();
      expect(incomeInput).toHaveValue("");
      expect(expensesInput).toBeInTheDocument();
      expect(expensesInput).toHaveValue("");
    });

    test("should render the submit button with correct initial state", () => {
      // Arrange
      render(<AddBalanceForm />);
      const submitButton = screen.getByRole("button", { name: "add balance" });

      // Assert
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute("type", "submit");
      expect(submitButton).not.toBeDisabled();
    });

    test("should render input fields with correct labels and placeholders", () => {
      // Arrange
      render(<AddBalanceForm />);
      const currentBalanceInput = screen.getByLabelText("current balance");
      const incomeInput = screen.getByLabelText("income");
      const expensesInput = screen.getByLabelText("expenses");

      // Assert
      expect(currentBalanceInput).toHaveAttribute("placeholder", "$ e.g 2000");
      expect(incomeInput).toHaveAttribute("placeholder", "$ e.g 2000");
      expect(expensesInput).toHaveAttribute("placeholder", "$ e.g 2000");
    });
  });
});
