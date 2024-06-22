"use server";

import { auth } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { prisma } from "@/lib/db";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

import * as z from "zod";
import { sendResetPasswordEmail } from "@/lib/email";
import { createResetPasswordToken } from "@/lib/token";

export async function resetPassword(values: z.infer<typeof resetPasswordSchema>) {
  try {
    const validatedFields = resetPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      return { status: "Invalid email!" }
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { status: "Email not found" };
    }

    const resetPasswordToken = await createResetPasswordToken(email);

    const { data, error } = await sendResetPasswordEmail(resetPasswordToken.email, 
      resetPasswordToken.token);

    if (error) {
      return { success: true, status: "Error sending email" };
    }

    return { success: true, status: "Reset email sent" };
  } catch (error) {
    console.log(error)
    return { success: false, status: "error" }
  }
}