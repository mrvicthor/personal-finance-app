import { signup } from "@/app/actions/auth";
import { db } from "@/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

jest.mock();
