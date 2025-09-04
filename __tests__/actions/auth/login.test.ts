import { authAdapter } from "@/adapters/auth.adapter";
import { login } from "@/app/actions/auth";
import { redirect } from "next/navigation";

describe("Login Action", () => {
  const mockFormData = (data: Record<string, string>) =>
    Object.entries(data).reduce((formData, [key, value]) => {
      formData.append(key, value);
      return formData;
    }, new FormData());

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
    (authAdapter.findUserByEmail as jest.Mock).mockResolvedValue({
      id: 1,
      name: "victor doom",
      email: "test@gmail.com",
      password: "test7889",
      createdAt: "2025-03-21 15:03:18.071572+00",
      updatedAt: "2025-03-21 15:03:18.071572+00",
    });
    (authAdapter.comparePasswords as jest.Mock).mockResolvedValue(false);

    const formData = mockFormData({
      email: "test@gmail.com",
      password: "testing@123",
    });

    const response = await login(null, formData);

    expect(response?.success).toBe(false);
    expect(response?.message).toBe("Invalid Credentials");
  });

  test("should successfully login and redirect user to home page", async () => {
    (authAdapter.findUserByEmail as jest.Mock).mockResolvedValue({
      id: 1,
      name: "victor doom",
      email: "test@gmail.com",
      password: "testing@123",
      createdAt: "2025-03-21 15:03:18.071572+00",
      updatedAt: "2025-03-21 15:03:18.071572+00",
    });
    (authAdapter.comparePasswords as jest.Mock).mockResolvedValue(true);

    const formData = mockFormData({
      email: "test@gmail.com",
      password: "testing@123",
    });

    await login(null, formData);
    expect(authAdapter.findUserByEmail).toHaveBeenCalledWith("test@gmail.com");
    expect(authAdapter.comparePasswords).toHaveBeenCalledWith(
      "testing@123",
      "testing@123"
    );
    expect(authAdapter.createSession).toHaveBeenCalledWith(1);
    expect(redirect).toHaveBeenCalledWith("/");
  });
});
