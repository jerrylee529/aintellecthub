"use server";

import { newPasswordSchema } from "@/lib/validations/auth";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { getResetPasswordTokenByToken } from "@/data/reset-password-token";
import { updateUserPassword } from "@/data/user";
import bcrypt from "bcrypt";


export async function newPassword(values: z.infer<typeof newPasswordSchema>, token?: string|null) {
    const validatedFields = newPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      return { status: "Invalid parameters" }
    }

    const { password } = validatedFields.data;

    const existingToken = await getResetPasswordTokenByToken(token);

    if (!existingToken) {
        return { success: false, status: "Token not found" };
    }

    const isExpired = new Date() > new Date(existingToken.expires);

    if (isExpired) {
        return {
            success: false,
            message: "Token expired",
        };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { success: false, status: "User not found!" };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await updateUserPassword(existingUser.id, hashPassword);

    if (user) {
        return { success: true, status: "Password updated successfully!" };
    } else {
        return { success: false, status: "Failed to update password!" };
    }

}