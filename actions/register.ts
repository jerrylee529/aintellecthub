"use server";

import { getUserByEmail } from "@/data/user";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/lib/validations/auth";
import bcrypt from "bcrypt";

import * as z from "zod";
import { createVerificationToken } from "@/lib/token"
import { sendVerificationEmail } from "@/lib/email";


export async function signUp(values: z.infer<typeof registerSchema>) {
  try {
    const validatedFields = registerSchema.safeParse(values);

    if (!validatedFields.success) {
      return { status: "Invalid parameters" }
    }

    const { email, password, name } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { status: "User already exists" };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword
      }
    });

    const verificationToken = await createVerificationToken(email);

    const { data, error } = await sendVerificationEmail(verificationToken.identifier, 
      verificationToken.token);

    if (error) {
      return { success: true, status: "Error sending email" };
    }
  
    return { success: true, status: "Email sent" };
  } catch (error) {
    console.log(error)
    return { success: false, status: "error" }
  }
}