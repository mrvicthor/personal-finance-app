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
  currentBalance: z
    .string()
    .min(1, { message: "balance is required" })
    .refine((val) => !isNaN(Number(val)), {
      message: "balance must be a number",
    })
    .refine((val) => Number(val) >= 0, {
      message: "balance cannot be negative",
    })
    .transform((val) => Number(val)),
  income: z
    .string()
    .min(1, { message: "income is required" })
    .refine((val) => !isNaN(Number(val)), {
      message: "income must be a number",
    })
    .refine((val) => Number(val) >= 0, {
      message: "income cannot be negative",
    })
    .transform((val) => Number(val)),
  expenses: z
    .string()
    .min(1, { message: "expenses is required" })
    .refine((val) => !isNaN(Number(val)), {
      message: "expenses must be a number",
    })
    .refine((val) => Number(val) >= 0, {
      message: "expenses cannot be negative",
    })
    .transform((val) => Number(val)),
});

export type AddBalanceFormData = {
  currentBalance: string;
  income: string;
  expenses: string;
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

export const deleteBudgetFormSchema = z.object({
  id: z.number(),
});

export type DeleteBudgetFormData = {
  id: number;
};

export type DeleteBudgetActionResponse = ActionResponse<DeleteBudgetFormData>;

export type AddTransactionFormData = {
  sender: string;
  category: string;
  transactionDate: Date;
  amount: number;
  recurring: boolean;
};

export type AddTransactionActionResponse =
  ActionResponse<AddTransactionFormData>;

export const addPotFormSchema = z.object({
  potName: z.string().min(2, { message: "Name cannot be empty" }),
  target: z.number().min(0, { message: "Target cannot be negative" }),
  total: z.number().min(0, { message: "Total cannot be negative" }),
  theme: z.string().min(2, { message: "Theme cannot be empty" }),
});

export type AddPotFormData = {
  potName: string;
  target: number;
  total: number;
  theme: string;
};

export type AddPotActionResponse = ActionResponse<AddPotFormData>;

export const editPotFormSchema = addPotFormSchema.extend({
  id: z.number(),
});

export type EditPotsFormData = AddPotFormData & {
  id: number;
};

export type EditPotsActionResponse = ActionResponse<EditPotsFormData>;

export const deletePotFormSchema = z.object({
  id: z.number(),
});

export type DeletePotFormData = {
  id: number;
};

export type DeletePotActionResponse = ActionResponse<DeletePotFormData>;

export const addMoneyFormSchema = z.object({
  id: z.number(),
  total: z.number(),
  target: z.number(),
});

export type AddMoneyFormData = {
  id: number;
  total: number;
  target: number;
};

export type AddMoneyActionResponse = ActionResponse<AddMoneyFormData>;

export const forgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});

export type ForgotPasswordFormData = {
  email: string;
};

export type ForgotPasswordActionResponse =
  ActionResponse<ForgotPasswordFormData>;

export interface UserData extends SignupFormData {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
