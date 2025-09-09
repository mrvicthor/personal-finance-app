import LoginForm from "@/app/(auth)/login/form";
import { render, screen } from "@testing-library/react";

describe("Login Form", () => {
  describe("Initial render", () => {
    test("should render the form", () => {
      render(<LoginForm />);
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByTestId("login-button")).toBeInTheDocument();
    });
  });
});
