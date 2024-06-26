import { prisma } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        name: true,
        emailVerified: true,
        password: true
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const updateUserPassword = async (id: string, hashPassword: string) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: hashPassword,
      },
    });

    return user;
  } catch {
    return null;
  }
};