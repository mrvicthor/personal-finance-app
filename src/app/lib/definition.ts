import { z } from "zod";

export const signupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long. " })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

export type SignupActionResponse = {
  success: boolean;
  message: string;
  inputs?: SignupFormData;
  errors?: { [K in keyof SignupFormData]?: string[] };
};

export type SessionPayload = {
  userId: number;
  expiresAt: Date;
};
