
"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { prisma } from "@/lib/db"


export async function newVerification(token: string) {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return {
            success: false,
            message: "Invalid token",
        };
    }

    const isExpired = new Date() > new Date(existingToken.expires);

    if (isExpired) {
        return {
            success: false,
            message: "Token expired",
        };
    }

    const existingUser = await getUserByEmail(existingToken.identifier);

    if (!existingUser) {
        return {
            success: false,
            message: "Email does not exist!",
        };
    }

    await prisma.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            emailVerified: new Date(),
        },
    });

    await prisma.verificationToken.delete({
        where: {
            token: existingToken.token,
        },
    });

    return {
        success: true,
        message: "Email verified!"
    };
}

