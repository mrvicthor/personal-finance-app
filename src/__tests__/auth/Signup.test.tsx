import { render, screen } from "@testing-library/react";
import SignupForm from "@/app/(auth)/signup/form";
import { signup } from "@/app/actions/auth";
import userEvent from "@testing-library/user-event";
import { useActionState } from "react";

jest.mock("../../app/actions/auth", () => ({
  signup: jest.fn(),
}));

describe("Signup Form", () => {
  const mockSignup = signup as jest.MockedFunction<typeof signup>;
  const mockUseActionState = useActionState as jest.MockedFunction<
    typeof useActionState
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Initial Rendering", () => {
    test("should render the form with all input fields", () => {
      render(<SignupForm />);
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
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
  });

  // describe("Form Submission - Pending State", () => {
  //   test("should disable submit button and show loading state when form is submitted", async () => {
  //     const user = userEvent.setup();
  //     const userData = {
  //       name: "Victor Eleanya",
  //       email: "victor@gmail.com",
  //       password: "test1234",
  //     };
  //     mockSignup.mockImplementation(async () => {
  //       await new Promise((resolve) => setTimeout(resolve, 1000));
  //       return {
  //         success: true,
  //         message: "Balance added successfully",
  //         inputs: userData,
  //       };
  //     });

  //     render(<SignupForm />);

  //     const submitButton = screen.getByRole("button", {
  //       name: /create account/i,
  //     });
  //     await user.click(submitButton);
  //     //   screen.debug();
  //     expect(submitButton).toHaveTextContent("Signing up...");
  //     expect(screen.getByText("⚪")).toHaveClass("animate-spin");
  //   });
  // });
});
