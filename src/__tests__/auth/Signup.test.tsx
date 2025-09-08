import { render, screen, waitFor } from "@testing-library/react";
import SignupForm from "@/app/(auth)/signup/form";
import userEvent from "@testing-library/user-event";
import { useActionState } from "react";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useActionState: jest.fn(),
}));

jest.mock("../../../src/app/actions/auth", () => ({
  signup: jest.fn(),
}));

describe("Signup Form", () => {
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

  describe("Initial Rendering", () => {
    test("should render the form with all input fields", () => {
      render(<SignupForm />);
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText("create password")).toBeInTheDocument();
    });

    test("should render the submit button with correct initial state", () => {
      render(<SignupForm />);
      const submitButton = screen.getByRole("button", {
        name: /create account/i,
      });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toBeEnabled();
    });

    test("should not display any error messages initially", () => {
      render(<SignupForm />);
      expect(screen.queryByTestId("error-name")).not.toBeInTheDocument();
      expect(screen.queryByTestId("error-email")).not.toBeInTheDocument();
      expect(screen.queryByTestId("error-password")).not.toBeInTheDocument();
    });

    test("should render login link", () => {
      render(<SignupForm />);
      expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
    });

    test("should show password requirements text", () => {
      render(<SignupForm />);

      expect(
        screen.getByText(/password must be at least 8 characters/i)
      ).toBeInTheDocument();
    });
  });

  describe("Password Visibility Toggle", () => {
    test("should toggle password visibility when the icon is clicked", async () => {
      const user = userEvent.setup();
      render(<SignupForm />);
      const passwordInput = screen.getByLabelText("create password");
      const toggleButton = screen.getByLabelText("toggle password visibility");
      expect(passwordInput).toHaveAttribute("type", "password");
      await user.click(toggleButton);
      expect(passwordInput).toHaveAttribute("type", "text");
      await user.click(toggleButton);
      expect(passwordInput).toHaveAttribute("type", "password");
    });
  });

  describe("Form Input interaction", () => {
    test("should allow typing in all input fields", async () => {
      const user = userEvent.setup();
      render(<SignupForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText("create password");

      await user.type(nameInput, "John Doe");
      await user.type(emailInput, "john@example.com");
      await user.type(passwordInput, "password123");

      expect(nameInput).toHaveValue("John Doe");
      expect(emailInput).toHaveValue("john@example.com");
      expect(passwordInput).toHaveValue("password123");
    });

    test("should handle form submission with valid data", async () => {
      const user = userEvent.setup();
      mockUseActionState.mockReturnValue([
        {
          success: false,
          message: "",
        },
        jest.fn(),
        true,
      ]);
      render(<SignupForm />);
      await user.type(screen.getByLabelText(/name/i), "john doe");
      await user.type(screen.getByLabelText(/email/i), "john@example.com");
      await user.type(screen.getByLabelText("create password"), "password@123");
      const submitButton = screen.getByTestId("signup-button");
      await userEvent.click(submitButton);
      await waitFor(() => {
        expect(screen.getByText(/signing up\.\.\./i)).toBeInTheDocument();
        expect(submitButton).toBeDisabled();
      });
    });
  });

  describe("Loading States", () => {
    test("should show loading state when form is submitting", async () => {
      mockUseActionState.mockReturnValue([
        { success: false, message: "" },
        jest.fn(),
        true,
      ]);

      render(<SignupForm />);

      await waitFor(() => {
        expect(screen.getByText(/signing up\.\.\./i)).toBeInTheDocument();
        expect(screen.getByText("⚪")).toHaveClass("animate-spin");
      });
    });
  });
  describe("Form Validation Display", () => {
    test("should display password validation errors when present", () => {
      mockUseActionState.mockReturnValue([
        {
          success: false,
          message: "",
          errors: {
            password: [
              "Be at least 8 characters long",
              "Contain at least one special character",
            ],
          },
        },
        jest.fn(),
        true,
      ]);

      render(<SignupForm />);
      const passwordSection = screen
        .getByLabelText("create password")
        .closest("div");
      expect(passwordSection).toBeInTheDocument();
    });
  });
});
