import { login } from "@/app/actions/auth";

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
});
