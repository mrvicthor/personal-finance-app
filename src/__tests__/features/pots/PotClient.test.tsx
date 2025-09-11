import PotClient from "@/features/pots/components/PotClient";
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
  });
});
