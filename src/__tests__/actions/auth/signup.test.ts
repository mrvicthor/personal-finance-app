import { signup } from "@/app/actions/auth";
import { authAdapter } from "@/lib/adapters/auth.adapter";
import { mockUser, mockFormData } from "@/test-utils";
import { redirect } from "next/navigation";

describe("Signup Action", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should fail if fields are missing", async () => {
    const formData = mockFormData({ email: "test@gmail.com" });
    const res = await signup(null, formData);

    expect(res?.success).toBe(false);
    expect(res?.message).toMatch(/Please fill in all the required fields/);
  });

  test("should fail if user already exist", async () => {
    (authAdapter.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
    const formData = mockFormData({
      name: "john doe",
      email: "johndoe@gmail.com",
      password: "test@1234",
    });

    const response = await signup(null, formData);
    expect(response?.success).toBe(false);
    expect(response?.message).toBe("User already exists");
  });

  test("should render a message if it fails to create a user", async () => {
    (authAdapter.findUserByEmail as jest.Mock).mockResolvedValue(undefined);

    (authAdapter.createUser as jest.Mock).mockResolvedValue(null);
    const formData = mockFormData({
      name: "john doe",
      email: "johndoe@gmail.com",
      password: "test@1234",
    });

    const response = await signup(null, formData);

    expect(response?.success).toBe(false);
    expect(response?.message).toBe("Unable to create user");
  });

  test("should successfully create a user and redirect the user to the home page", async () => {
    (authAdapter.findUserByEmail as jest.Mock).mockResolvedValue(undefined);
    (authAdapter.hashPassword as jest.Mock).mockResolvedValue("hashed");
    (authAdapter.createUser as jest.Mock).mockResolvedValue({ id: 1 });

    const formData = mockFormData({
      name: "john doe",
      email: "johndoe@gmail.com",
      password: "test@1234",
    });

    await signup(null, formData);
    expect(authAdapter.hashPassword).toHaveBeenCalledWith("test@1234");
    expect(authAdapter.createUser).toHaveBeenCalled();
    expect(authAdapter.createSessionWithCookie).toHaveBeenCalledWith(1);
    expect(redirect).toHaveBeenCalledWith("/");
  });
});
