import { getResetPasswordTokenByEmail } from "@/data/reset-password-token";
import { getVerificationTokenById } from "@/data/verification-token";
import { prisma } from "@/lib/db";
import { v4 as uuidv4 } from "uuid"

export async function createVerificationToken(email: string) {
  const token = uuidv4()
  const expiresAt = new Date(new Date().getTime() + 60 * 60 * 1000)

  const existingToken = await getVerificationTokenById(email)

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        identifier: existingToken.email,
        token: existingToken.token,
      },
    })
  }

  const tokenData = await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: token,
      expires: expiresAt,
    },
  })

  return tokenData;
}

export async function createResetPasswordToken(email: string) {
  const token = uuidv4()
  const expiresAt = new Date(new Date().getTime() + 15 * 60 * 1000)

  const existingToken = await getResetPasswordTokenByEmail(email)

  if (existingToken) {
    await prisma.resetPasswordToken.delete({
      where: {
        id: existingToken.id
      },
    })
  }

  const tokenData = await prisma.resetPasswordToken.create({
    data: {
      email: email,
      token: token,
      expires: expiresAt,
    },
  })

  return tokenData;
}