import CreatePotForm from "@/features/pots/components/forms/CreatePotForm";
import { screen, render } from "@testing-library/react";

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
}));

jest.mock("../../../features/pots/actions/pots", () => ({
  getPots: jest.fn(),
}));

describe("Create Pot Form", () => {
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
});
