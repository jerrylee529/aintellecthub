import { prisma } from "@/lib/db";

export const getInvitationsByWorkspace = async (workspaceId: string) => {
  try {
    const invitations = await prisma.invitation.findMany({
      where: {
        workspaceId: workspaceId,
      },
      select: {
        id: true,
        name: true,
        emailVerified: true,
        password: true,
        currentWorkspaceId: true,
      },
    });

    return invitations;
  } catch {
    return null;
  }
};

export async function insertInvitation(userId: string, email: string, workspaceId: string, token: string, expiresAt: Date) {
    try {
        const result = await prisma.invitation.create({
          data: {
            inviterId: userId,
            invitee_email: email,
            workspaceId: workspaceId,
            token: token,
            expiresAt: expiresAt,
          },
        });

    } catch (error) {
      console.error("Error creating invitation:", error);
      throw error;
    }
  }

export async function updateInvitation(token: string, status: string) {
  try {
    const invitation = await prisma.invitation.update({
      where: {
        token: token
      },
      data: {
        status: status,
      },
    });
    console.log("invitation changed:", invitation);
    return invitation;
  } catch (error) {
    console.error("Error update invitation:", error);
    throw error;
  }
}