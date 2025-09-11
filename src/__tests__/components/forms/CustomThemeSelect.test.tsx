import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomThemeSelect from "@/components/forms/customSelect";

jest.mock("../../../features/pots/actions/pots", () => ({
  addPot: jest.fn(),
  getPots: jest.fn(),
}));

describe("CustomThemeSelct", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<CustomThemeSelect id="theme" name="theme" label="color tag" />);
  });

  describe("Initial rendering", () => {
    test("renders the component with label", () => {
      expect(screen.getByText("color tag")).toBeInTheDocument();
    });

    test("renders the select trigger with placeholder text", () => {
      expect(screen.getByTestId("select-trigger-theme")).toBeInTheDocument();
      expect(screen.getByText("Theme")).toBeInTheDocument();
    });
  });
});
