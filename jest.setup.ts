import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder as never;
global.TextDecoder = TextDecoder as never;

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
