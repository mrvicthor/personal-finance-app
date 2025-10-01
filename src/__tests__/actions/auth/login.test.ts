import { authAdapter } from "@/lib/adapters/auth.adapter";
import { login } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import { mockFormData, mockUser } from "@/test-utils";

describe("Login Action", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should fail if fields are missing", async () => {
    const formData = mockFormData({ email: "test@gmail.com" });
    const response = await login(null, formData);

    expect(response?.success).toBe(false);
    expect(response?.message).toBe("Please fix all errors in the form");
  });

  test("should fail if user is not found", async () => {
    (authAdapter.findUserByEmail as jest.Mock).mockResolvedValue(undefined);
    const formData = mockFormData({
      email: "test@gmail.com",
      password: "testing@123",
    });

    const response = await login(null, formData);
    expect(response?.success).toBe(false);
    expect(response?.message).toBe("Invalid Credentials");
  });

  test("should fail if the the password do not match", async () => {
    (authAdapter.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
    (authAdapter.comparePasswords as jest.Mock).mockResolvedValue(false);

    const formData = mockFormData({
      email: "test@gmail.com",
      password: "testing@123",
    });

    const response = await login(null, formData);

    expect(response?.success).toBe(false);
    expect(response?.message).toBe("Invalid Credentials");
  });

  test("should successfully login, create session and redirect user to home page", async () => {
    (authAdapter.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
    (authAdapter.comparePasswords as jest.Mock).mockResolvedValue(true);

    const formData = mockFormData({
      email: "test@gmail.com",
      password: "testing@123",
    });

    await login(null, formData);
    expect(authAdapter.findUserByEmail).toHaveBeenCalledWith("test@gmail.com");
    expect(authAdapter.createSessionWithCookie).toHaveBeenCalledWith(1);
    expect(authAdapter.comparePasswords).toHaveBeenCalledWith(
      "testing@123",
      "testing@123"
    );

    expect(redirect).toHaveBeenCalledWith("/");
  });
});
