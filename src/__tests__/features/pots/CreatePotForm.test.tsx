import { getPots } from "@/features/pots/actions/pots";
import CreatePotForm from "@/features/pots/components/forms/CreatePotForm";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

jest.mock("../../../features/pots/actions/pots", () => ({
  addPot: jest.fn(),
  getPots: jest.fn(),
}));

describe("Create Pot Form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should render the form modal correctly", () => {
    render(<CreatePotForm />);
    const form = screen.queryByTestId("add-pot-form");
    const potNameInput = screen.getByLabelText("pot name");
    const targetInput = screen.getByLabelText("target");
    const colorTagInput = screen.getByLabelText("color tag");
    const submitButton = screen.getByRole("button", { name: /add pot/i });
    expect(form).toBeInTheDocument();
    expect(potNameInput).toBeInTheDocument();
    expect(targetInput).toBeInTheDocument();
    expect(colorTagInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("should call getPots on mount", () => {
    render(<CreatePotForm />);
    expect(getPots).toHaveBeenCalled();
  });

  describe("Form Interaction", () => {
    test("should allow user to type in the fields", async () => {
      render(<CreatePotForm />);
      const user = userEvent.setup();
      const form = screen.queryByTestId("add-pot-form");
      const potNameInput = screen.getByLabelText("pot name");
      const targetInput = screen.getByLabelText("target");
      const trigger = screen.getByTestId("select-trigger-theme");

      await user.type(potNameInput, "Vacation");
      await user.type(targetInput, "1000");
      await user.click(trigger);
      expect(form).toBeInTheDocument();
      expect(potNameInput).toHaveValue("Vacation");
      expect(targetInput).toHaveValue("1000");
      await waitFor(() => {
        expect(screen.getByTestId("select-options-theme")).toBeInTheDocument();
      });
    });
  });
});
