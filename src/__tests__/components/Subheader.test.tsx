import Subheader from "@/components/subheader";
import { render, screen } from "@testing-library/react";

describe("Subheader", () => {
  test("should render subheader component", () => {
    render(<Subheader title="Pots" description="Test post" href="/pot" />);
    const heading = screen.getByRole("heading", { level: 2 });
    const link = screen.getByTestId("subheader-link");
    const description = screen.getByTestId("subheader-description");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Pots");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/pot");
    expect(description).toHaveTextContent("Test post");
    expect(description).toBeInTheDocument();
  });
});
