import { deleteSession, updateSession } from "@/app/actions/session";
import { authAdapter } from "@/lib/adapters/auth.adapter";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { redirect } from "next/navigation";

jest.mock("../../../lib/adapters/auth.adapter");

describe("Session", () => {
  const mockGet = jest.fn();
  const mockDelete = jest.fn();
  const mockCookies = {
    get: mockGet,
    set: jest.fn(),
    delete: mockDelete,
  } as unknown as ReadonlyRequestCookies;
  const mockDecrypt = jest.fn();
  const mockAuthAdapter = {
    findUserSessionById: jest.fn(),
    updateSession: jest.fn(),
    deleteSession: jest.fn(),
  };
  const dependencies = {
    cookies: () => Promise.resolve(mockCookies),
    decrypt: mockDecrypt,
    authAdapter: mockAuthAdapter,
  };
  const mockNow = new Date("2025-09-04T00:00:00Z").getTime();

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(mockNow);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  describe("Create Session", () => {
    test("should create a session with correct userId", async () => {
      jest.useFakeTimers().setSystemTime(new Date("2025-09-04T00:00:00Z"));
      (authAdapter.createSession as jest.Mock).mockResolvedValue({ id: 123 });

      const sessionData = await authAdapter.createSession(1, new Date());
      expect(authAdapter.createSession).toHaveBeenCalledWith(
        1,
        expect.any(Date)
      );
      expect(sessionData).toEqual({ id: 123 });

      jest.useRealTimers();
    });
  });

  describe("Update Session", () => {
    test("should return null if no session cookie", async () => {
      mockGet.mockReturnValue(undefined);
      mockDecrypt.mockResolvedValue(null);

      const result = await updateSession(dependencies);
      expect(result).toBeNull();
    });

    test('should return "Session expired" if expired', async () => {
      mockGet.mockReturnValue({ value: "fake-session" });
      mockDecrypt.mockResolvedValue({ id: 1 });
      mockAuthAdapter.findUserSessionById.mockResolvedValue({
        id: 1,
        expiresAt: new Date(mockNow - 1000),
      });

      const result = await updateSession(dependencies);
      expect(result).toEqual({ message: "Session expired" });
    });

    test("should retfresh session if expiry < 24h", async () => {
      mockGet.mockReturnValue({ value: "fake-session" });
      mockDecrypt.mockResolvedValue({
        id: 1,
      });
      mockAuthAdapter.findUserSessionById.mockResolvedValue({
        id: 1,
        expiresAt: new Date(mockNow + 23 * 60 * 60 * 1000),
      });
      await updateSession(dependencies);

      expect(mockAuthAdapter.updateSession).toHaveBeenCalledWith(
        1,
        expect.any(Date)
      );
      expect(mockCookies.set).toHaveBeenCalled();
    });
  });

  describe("Delete Session", () => {
    test("should delete session from DB, cookie and redirect user", async () => {
      const fakeSession = { id: 123, userid: 1 };
      mockGet.mockReturnValue({ value: "encrypted-session" });
      mockDecrypt.mockResolvedValue(fakeSession);
      mockAuthAdapter.deleteSession(undefined);
      await deleteSession(dependencies);
      expect(mockCookies.get).toHaveBeenCalledWith("session");
      expect(mockDecrypt).toHaveBeenCalledWith("encrypted-session");
      expect(mockAuthAdapter.deleteSession).toHaveBeenCalledWith(123);
      expect(mockCookies.delete).toHaveBeenCalledWith("session");
      expect(redirect).toHaveBeenCalledWith("/login");
    });

    test("should still delete cookie and redirect even if session is not found", async () => {
      mockDecrypt.mockResolvedValue(undefined);
      await deleteSession(dependencies);
      expect(mockCookies.get).toHaveBeenCalledWith("session");
      expect(mockAuthAdapter.deleteSession).not.toHaveBeenCalled();
      expect(mockCookies.delete).toHaveBeenCalledWith("session");
      expect(redirect).toHaveBeenCalledWith("/login");
    });
  });
});
