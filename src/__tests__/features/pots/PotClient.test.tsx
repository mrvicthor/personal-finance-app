import PotClient from "@/features/pots/components/PotClient";
import { screen, render } from "@testing-library/react";
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
}));

jest.mock("../../../features/pots/actions/pots", () => ({
  getPots: jest.fn(),
}));

describe("Pot Client", () => {
  describe("Initial Render", () => {
    test("should render Pots Page", () => {
      render(
        <PotClient>
          <div>Test content</div>
        </PotClient>
      );

      const formHeading = screen.getByRole("heading", {
        level: 1,
        name: "pots",
      });
      const toggleFormModalButton = screen.getByTestId("add-pot-btn");
      expect(toggleFormModalButton).toBeInTheDocument();
      expect(formHeading).toBeInTheDocument();
    });

    test("should not render form modal on initial rendering", () => {
      render(
        <PotClient>
          <div>Test content</div>
        </PotClient>
      );

      const form = screen.queryByTestId("add-pot-form");
      expect(form).not.toBeInTheDocument();
    });

    test("should render the form when the toggle button is clicked", async () => {
      const user = userEvent.setup();
      render(
        <PotClient>
          <div>Test content</div>
        </PotClient>
      );
      const toggleFormModalButton = screen.getByTestId("add-pot-btn");
      const formBefore = screen.queryByTestId("add-pot-form");
      expect(formBefore).not.toBeInTheDocument();

      await user.click(toggleFormModalButton);

      const formAfter = await screen.findByTestId("add-pot-form");
      expect(formAfter).toBeInTheDocument();
    });
  });
});
