import { authAdapter } from "@/adapters/auth.adapter";
import { login } from "@/app/actions/auth";

jest.mock("../../../src/adapters/auth.adapter", () => ({
  authAdapter: {
    findUserByEmail: jest.fn(),
    comparePasswords: jest.fn(),
  },
}));

jest.mock("jose", () => {
  const mockSignJWT = jest.fn().mockImplementation(() => ({
    setProtectedHeader: jest.fn().mockReturnThis(),
    setIssuedAt: jest.fn().mockReturnThis(),
    setExpirationTime: jest.fn().mockReturnThis(),
    sign: jest.fn().mockResolvedValue("mock-jwt-token"),
  }));

  const mockJwtVerify = jest.fn().mockResolvedValue({
    payload: { sub: "test-user", exp: Date.now() / 1000 + 3600 },
    protectedHeader: { alg: "HS256" },
  });

  return {
    __esModule: true,
    SignJWT: mockSignJWT,
    jwtVerify: mockJwtVerify,
  };
});

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
    console.log(response);
    expect(response?.success).toBe(false);
    expect(response?.message).toBe("Invalid Credentials");
  });
});
