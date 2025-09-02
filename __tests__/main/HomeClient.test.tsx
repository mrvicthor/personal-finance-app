import { render, screen, fireEvent } from "@testing-library/react";
import HomeClient from "@/components/homeClient";
import { logout } from "@/app/actions/auth";
import { addBalance } from "@/app/actions/balance";
import userEvent from "@testing-library/user-event";

jest.mock("../../src/app/actions/auth", () => ({
  logout: jest.fn(),
}));

jest.mock("../../src/app/actions/balance", () => ({
  addBalance: jest.fn().mockResolvedValue({
    success: true,
    message: "Balance added successfully",
  }),
}));

// Mock the notification hook
jest.mock("../../src/hooks/useNotification", () => ({
  usePushNotificationManager: jest.fn(),
}));

describe("Initial render", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should render overview section with title", () => {
    render(
      <HomeClient>
        <div>Test Content</div>
      </HomeClient>
    );

    expect(screen.getByLabelText("Overview")).toBeInTheDocument();
    expect(screen.getByText("overview")).toBeInTheDocument();
  });

  test("should render add new balance button", () => {
    render(
      <HomeClient>
        <div>Test Content</div>
      </HomeClient>
    );

    expect(screen.getByText(/add new balance/i)).toBeInTheDocument();
  });

  test("should render logout ", () => {
    render(
      <HomeClient>
        <div>Test Content</div>
      </HomeClient>
    );

    expect(screen.getByTestId("logout-icon")).toBeInTheDocument();
  });

  test("should render children content", () => {
    render(
      <HomeClient>
        <div data-testid="child-content">Test content</div>
      </HomeClient>
    );

    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });

  test("should open and close the add balance modal", () => {
    render(
      <HomeClient>
        <div data-testid="child-content">Test content</div>
      </HomeClient>
    );

    const addButton = screen.getByRole("button", { name: /add new balance/i });

    // open modal
    fireEvent.click(addButton);
    expect(screen.getByText(/add balance/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("close-modal-btn"));
    expect(
      screen.queryByText(/add your income, expenses and balance/i)
    ).not.toBeInTheDocument();
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

  test("should render form instructions and fields when success=false", () => {
    // Arrange
    (addBalance as jest.Mock).mockReturnValue(async () => ({
      success: false,
      message: "",
    }));
    render(
      <HomeClient>
        <div>Test Content</div>
      </HomeClient>
    );
    const { balanceInput, incomeInput, expensesInput } = getInputFields();
    const formHeading = screen.getByRole("heading", {
      level: 1,
      name: "overview",
    });
    // Assert
    expect(formHeading).toBeInTheDocument();
    expect(balanceInput).toBeInTheDocument();
    expect(incomeInput).toBeInTheDocument();
    expect(expensesInput).toBeInTheDocument();
  });

  test("should have placeholder for input field", async () => {
    (addBalance as jest.Mock).mockReturnValue(async () => ({
      success: false,
      message: "",
    }));
    const user = userEvent.setup();
    render(
      <HomeClient>
        <div>Test Content</div>
      </HomeClient>
    );

    const openModalForm = screen.getByRole("button", {
      name: /add new balance/i,
    });

    await user.click(openModalForm);

    expect(
      screen.queryAllByPlaceholderText("$ e.g 2000")[0]
    ).toBeInTheDocument();
  });

  test("should submit form if successful", async () => {
    // Arrange
    (addBalance as jest.Mock).mockImplementation(async () => ({
      success: true,
      message: "Balance added successfully",
    }));

    const user = userEvent.setup();

    render(
      <HomeClient>
        <div>Test Content</div>
      </HomeClient>
    );
    const { balanceInput, incomeInput, expensesInput } = getInputFields();
    const addBalanceSubmitButton = screen.getByRole("button", {
      name: "add balance",
    });

    await user.type(balanceInput, "2000");
    await user.type(incomeInput, "3000");
    await user.type(expensesInput, "1000");
    await user.click(addBalanceSubmitButton);

    const successMessage = await screen.findByText(
      "Balance added successfully"
    );

    expect(successMessage).toBeVisible();
  });

  test("should show error message if form submission fails", async () => {
    (addBalance as jest.Mock).mockImplementation(async () => ({
      success: false,
      message: "Please fill in all the required fields",
      errors: {
        current: "Current balance is required",
        income: "Income is required",
        expenses: "Expenses are required",
      },
    }));

    render(
      <HomeClient>
        <div>Test Content</div>
      </HomeClient>
    );
    const { balanceInput, incomeInput, expensesInput } = getInputFields();

    expect(balanceInput).toHaveAttribute("required");
    expect(incomeInput).toHaveAttribute("required");
    expect(expensesInput).toHaveAttribute("required");
  });
});

function getInputFields() {
  const openModalForm = screen.getByRole("button", {
    name: /add new balance/i,
  });
  fireEvent.click(openModalForm);

  const balanceInput = screen.getByLabelText("current balance", {
    selector: "input",
  });
  const incomeInput = screen.getByLabelText("income", {
    selector: "input",
  });
  const expensesInput = screen.getByLabelText("expenses", {
    selector: "input",
  });
  return { balanceInput, incomeInput, expensesInput };
}
