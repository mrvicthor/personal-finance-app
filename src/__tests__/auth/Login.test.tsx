import LoginForm from "@/app/(auth)/login/form";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useActionState } from "react";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useActionState: jest.fn(),
}));

describe("Login Form", () => {
  const mockUseActionState = useActionState as jest.MockedFunction<
    typeof useActionState
  >;
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseActionState.mockReturnValue([
      {
        success: false,
        message: "",
      },
      jest.fn(),
      false,
    ]);
  });

  describe("Initial render", () => {
    test("should render the form", () => {
      render(<LoginForm />);
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByTestId("login-button")).toBeInTheDocument();
      expect(
        screen.getByText(/need to create an account?/i)
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /sign up/i })
      ).toBeInTheDocument();
    });
  });

  describe("Password Visibility Toggle", () => {
    test("should toggle password visibility when the icon is clicked", async () => {
      const user = userEvent.setup();
      render(<LoginForm />);
      const passwordField = screen.getByLabelText(/password/i);
      const toggleButton = screen.getByTestId("toggle-show-password");
      expect(passwordField).toHaveAttribute("type", "password");
      await user.click(toggleButton);
      expect(passwordField).toHaveAttribute("type", "text");
      await user.click(toggleButton);
      expect(passwordField).toHaveAttribute("type", "password");
    });
  });

  describe("Form Input Interaction", () => {
    test("should allow typing in all input fields", async () => {
      const user = userEvent.setup();
      render(<LoginForm />);
      const emailField = screen.getByLabelText(/email/i);
      const passwordField = screen.getByLabelText(/password/i);

      await user.type(emailField, "johndoe@gmail.com");
      await user.type(passwordField, "Testing@123");

      expect(emailField).toHaveValue("johndoe@gmail.com");
      expect(passwordField).toHaveValue("Testing@123");
    });
  });
  describe("Loading States", () => {
    test("should show loading state when form is submitting", async () => {
      mockUseActionState.mockReturnValue([
        { success: false, message: "" },
        jest.fn(),
        true,
      ]);
      render(<LoginForm />);
      await waitFor(() => {
        expect(screen.getByText(/logging in\.\.\./i)).toBeInTheDocument();
        expect(screen.getByText("⚪")).toHaveClass("animate-spin");
      });
    });

    test("should handle form submission with valid data", async () => {
      const user = userEvent.setup();
      mockUseActionState.mockReturnValue([
        { success: false, message: "" },
        jest.fn(),
        true,
      ]);
      render(<LoginForm />);
      await user.type(screen.getByLabelText(/email/i), "johndoe@gmail.com");
      await user.type(screen.getByLabelText(/password/i), "Testing@123");
      await waitFor(() => {
        expect(screen.getByText(/logging in\.\.\./i)).toBeInTheDocument();
        expect(screen.getByText("⚪")).toHaveClass("animate-spin");
      });
    });
  });
});
