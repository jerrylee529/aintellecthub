import { prisma } from "@/lib/db";

export async function getVerificationToken(id: string, token: string) {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        identifier: id,
        token: token,
      },
      select: {
        identifier: true,
        token: true,
        expires: true,
      },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export async function getVerificationTokenById(id: string) {
    try {
      const verificationToken = await prisma.verificationToken.findFirst({
        where: {
          identifier: id
        },
        select: {
          identifier: true,
          token: true,
          expires: true,
        },
      });
  
      return verificationToken;
    } catch {
      return null;
    }
  };

  export async function getVerificationTokenByToken(token: string) {
    try {
      const verificationToken = await prisma.verificationToken.findFirst({
        where: {
          token: token
        },
        select: {
          identifier: true,
          token: true,
          expires: true,
        },
      });
  
      return verificationToken;
    } catch {
      return null;
    }
  };
