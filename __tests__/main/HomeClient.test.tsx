import { render, screen, fireEvent } from "@testing-library/react";
import HomeClient from "@/components/homeClient";
import { logout } from "@/app/actions/auth";

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
});
