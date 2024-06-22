import { prisma } from "@/lib/db";

export async function getResetPasswordTokenByEmail(email: string) {
  try {
    const resetPasswordToken = await prisma.resetPasswordToken.findFirst({
      where: {
        email: email
      },
      select: {
        id: true,
        email: true,
        token: true,
        expires: true,
      },
    });

    return resetPasswordToken;
  } catch {
    return null;
  }
};

export async function getResetPasswordTokenByToken(token: string) {
  try {
    const resetPasswordToken = await prisma.resetPasswordToken.findUnique({
      where: {
        token: token
      },
      select: {
        id: true,
        email: true,
        token: true,
        expires: true,
      },
    });

    return resetPasswordToken;
  } catch {
    return null;
  }
};

