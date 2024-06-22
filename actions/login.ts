"use server";

import { signIn } from "@/auth";
import { AuthError, CredentialsSignin } from 'next-auth'
import { prisma } from "@/lib/db";
import { userAuthSchema } from "@/lib/validations/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";


import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { createVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/email";


export async function login(values: z.infer<typeof userAuthSchema>) {

    const validatedFields = userAuthSchema.safeParse(values);

    if (!validatedFields.success) {
        return { success: false, status: "Invalid parameters" }
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { success: false, status: "User not found" };
    }

    if (!existingUser.emailVerified) {

        const verificationToken = await createVerificationToken(email);

        const { data, error } = await sendVerificationEmail(verificationToken.identifier, 
            verificationToken.token);
      
        if (error) {
          return { success: true, status: "Error sending email" };
        }

        return { success: false, status: "Verification email sent!" };
    }

    try {
        const result = await signIn("credentials", {
            email,
            password,
            //redirectTo: DEFAULT_LOGIN_REDIRECT
        });

        return { success: true, status: "login successfully" };
    } catch (error) {
        // console.log(error)
        if (error instanceof AuthError) {
            switch (error.type) {
            case "CredentialsSignin":
                return { success: false, status: "User not found" };
            default:
                return { success: false, status: "Something went wrong" };
            }
        }

        throw error;
    };
}