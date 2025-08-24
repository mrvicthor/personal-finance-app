import { render, screen } from "@testing-library/react";
import Title from "@/components/title";

describe("Title Component", () => {
  it("renders title correctly", () => {
    const titleText = "Test Title";
    render(<Title title={titleText} />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(titleText)).toBeInTheDocument();
  });

  test("applies correct HTML structure", () => {
    render(<Title title="Sample" />);
    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading.tagName).toBe("H1");
  });
});
