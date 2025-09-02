import { addBalance } from "@/app/actions/balance";
import AddBalanceForm from "@/components/forms/addBalanceForm";
import { InputFieldProps } from "@/components/forms/inputField";
import { render, screen } from "@testing-library/react";

jest.mock("../../../src/app/actions/balance", () => ({
  addBalance: jest.fn(),
}));

jest.mock("../../../src/components/forms/inputField", () => {
  return function MockInputField({
    id,
    label,
    name,
    value,
    placeholder,
    error,
  }: InputFieldProps) {
    return (
      <div data-testid={`input-field-${name}`} className="flex flex-col gap-1">
        <label
          htmlFor={id}
          className="capitalize text-[#696868] text-xs font-bold"
        >
          {label}
        </label>
        <input
          id={id}
          name={name}
          defaultValue={value}
          className="border-[#98908B] border rounded-lg h-[2.8125rem] px-5"
          type="text"
          placeholder={placeholder}
          required
          data-testid={`input-${name}`}
        />
        {error && <span data-testid={`error-${name}`}>{error}</span>}
      </div>
    );
  };
});

describe("AddBalanceForm", () => {
  const mockAddBalance = addBalance as jest.MockedFunction<typeof addBalance>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Initial Rendering", () => {
    test("should render the form with all input fields", () => {
      render(<AddBalanceForm />);

      expect(screen.getByTestId("form-instructions")).toBeInTheDocument();
      expect(screen.getByTestId("form-instructions")).toHaveTextContent(
        "Add your income, expenses and balance"
      );
      expect(screen.getByTestId("input-field-current")).toBeInTheDocument();
      expect(screen.getByTestId("input-field-income")).toBeInTheDocument();
      expect(screen.getByTestId("input-field-expenses")).toBeInTheDocument();
    });

    test("should render the submit button with correct initial state", () => {
      render(<AddBalanceForm />);

      const submitButton = screen.getByTestId("submit-button");
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveTextContent("add balance");
      expect(submitButton).not.toBeDisabled();
    });
  });
});
