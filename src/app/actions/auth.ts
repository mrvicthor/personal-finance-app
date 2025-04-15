"use server";

import { eq } from "drizzle-orm";
import {
  LoginActionResponse,
  LoginFormData,
  loginFormSchema,
  SignupActionResponse,
  SignupFormData,
  signupFormSchema,
} from "../lib/definition";

import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "./session";
import { capitaliseFirstLetters } from "@/helpers/capitaliseFirstLetters";

export async function signup(
  state: SignupActionResponse | null,
  formData: FormData
) {
  const rawData: SignupFormData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validateFields = signupFormSchema.safeParse(rawData);
  if (!validateFields.success) {
    return {
      success: false,
      message: "Please fill in all the required fields",
      inputs: rawData,
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validateFields.data;

  //   check if user already exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return {
      success: false,
      message: "User already exists",
      inputs: rawData,
    };
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const [user] = await db
    .insert(users)
    .values({
      name: capitaliseFirstLetters(name),
      email,
      password: hashedPassword,
    })
    .returning({ id: users.id });

  if (!user) {
    return {
      success: false,
      message: "Unable to create user",
      inputs: rawData,
    };
  }
  //   create session
  await createSession(user.id);

  redirect("/");
}

export async function login(
  state: LoginActionResponse | null,
  formData: FormData
) {
  const rawData: LoginFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validateFields = loginFormSchema.safeParse(rawData);
  if (!validateFields.success) {
    return {
      success: false,
      message: "Please fix all errors in the form",
      errors: validateFields.error.flatten().fieldErrors,
      inputs: rawData,
    };
  }
  const { email, password } = validateFields.data;

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    return {
      success: false,
      message: "Invalid Credentials",
      inputs: rawData,
    };
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return {
      success: false,
      message: "Invalid Credentials",
      inputs: rawData,
    };
  }

  await createSession(user.id);
  redirect("/");
}

export async function logout() {
  await deleteSession();
}
