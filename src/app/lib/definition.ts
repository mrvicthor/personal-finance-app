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
  id: number;
  userId: number;
  expiresAt: Date;
};

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, { message: "Password can not be empty" }).trim(),
});

export type LoginFormData = {
  email: string;
  password: string;
};

export type LoginActionResponse = {
  success: boolean;
  message: string;
  inputs?: LoginFormData;
  errors?: { [K in keyof LoginFormData]?: string[] };
};

export const addBalanceFormSchema = z.object({
  current: z.number().min(0, { message: "balance cannot be negative" }),
  income: z.number().min(0, { message: "income cannot be negative" }),
  expenses: z.number().min(0, { message: "expenses cannot be negative" }),
});

export type AddBalanceFormData = {
  current: number;
  income: number;
  expenses: number;
};

export type AddBalanceActionResponse = {
  success: boolean;
  message: string;
  inputs?: AddBalanceFormData;
  errors?: { [K in keyof AddBalanceFormData]?: string[] };
};
