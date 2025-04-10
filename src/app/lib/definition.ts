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

export type ActionResponse<T> = {
  success: boolean;
  message: string;
  inputs?: T;
  errors?: { [K in keyof T]?: string[] };
};

export type SignupActionResponse = ActionResponse<SignupFormData>;

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

export type LoginActionResponse = ActionResponse<LoginFormData>;

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

export type AddBalanceActionResponse = ActionResponse<AddBalanceFormData>;

export const addBudgetFormSchema = z.object({
  category: z.string().min(2, { message: "Category cannot be empty" }),
  maximum: z.number().min(0, { message: "Maximum cannot be negative" }),
  theme: z.string().min(2, { message: "Theme cannot be empty" }),
});

export type AddBudgetFormData = {
  category: string;
  maximum: number;
  theme: string;
};

export type AddBudgetActionResponse = ActionResponse<AddBudgetFormData>;

export const editBudgetFormSchema = addBudgetFormSchema.extend({
  id: z.number(),
});

export type EditBudgetFormData = AddBudgetFormData & {
  id: number;
};

export type EditBudgetActionResponse = ActionResponse<EditBudgetFormData>;
export const addTransactionFormSchema = z.object({
  sender: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long. " })
    .trim(),
  category: z.string().min(2, { message: "Category cannot be empty" }),
  transactionDate: z.string().datetime({ message: "Date is invalid" }),
  amount: z.number().min(0, { message: "Amount cannot be negative" }),
  recurring: z.boolean().default(false).optional(),
});

export type AddTransactionFormData = {
  sender: string;
  category: string;
  transactionDate: Date;
  amount: number;
  recurring: boolean;
};

export type AddTransactionActionResponse =
  ActionResponse<AddTransactionFormData>;
