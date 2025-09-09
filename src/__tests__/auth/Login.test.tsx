import LoginForm from "@/app/(auth)/login/form";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Login Form", () => {
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
});
