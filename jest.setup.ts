import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder as never;
global.TextDecoder = TextDecoder as never;

jest.mock("/src/lib/adapters/auth.adapter", () => ({
  authAdapter: {
    findUserByEmail: jest.fn(),
    createUser: jest.fn(),
    createSession: jest.fn().mockResolvedValue({ id: 123 }),
    hashPassword: jest.fn(),
    comparePasswords: jest.fn(),
    createSessionWithCookie: jest.fn(),
    deleteSession: jest.fn(),
  },
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("resend", () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: jest.fn().mockResolvedValue({
          data: { id: "mock-email-id" },
          error: null,
        }),
      },
    })),
  };
});

process.env.RESEND_API_KEY = "test-resend-key";

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

jest.mock("next/headers", () => {
  return {
    cookies: jest.fn(() => ({
      set: jest.fn(),
      get: jest.fn(),
      delete: jest.fn(),
    })),
    headers: jest.fn(),
  };
});
