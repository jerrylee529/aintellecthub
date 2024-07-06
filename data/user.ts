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
        password: true,
        currentWorkspaceId: true,
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


export async function updateUserWorkspace(
  userId: string,
  workspaceId: string
) {
  try {
    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        currentWorkspaceId: workspaceId,
      },
    });
    console.log("workspace changed:", user);
    return user;
  } catch (error) {
    console.error("Error update workspace:", error);
    throw error;
  }
}