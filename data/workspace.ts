import { prisma } from "@/lib/db";

export async function getWorkspacesByUserId(userId: string) {
  try {
    // 查询所有与该userId相关的WorkspaceMembership，同时包括对应的Workspace详细信息
    const workspaces = await prisma.workspaceMembership.findMany({
      where: {
        userId: userId,
      },
      include: {
        workspace: true, // 包括关联的Workspace详细信息
      },
    });

    // 映射结果以获取纯Workspace数组
    const workspaceDetails = workspaces.map(
      (membership) => membership.workspace,
    );

    return workspaceDetails;
  } catch (error) {
    console.error("Error fetching workspaces for user:", error);
    return [];
  }
}


export async function insertWorkspace(userId: string, name: string, description: string) {
  try {
    // 通过Prisma的$transaction API执行事务
    const result = await prisma.$transaction(async (prisma) => {
        // 向第一张表插入数据
        const workspace_rec = await prisma.workspace.create({
          data: {
            name,
            description,
          },
        });

        // 向第二张表插入数据
        const workspaceMembership_rec = await prisma.workspaceMembership.create({
            data: {
              userId: userId,
              workspaceId: workspace_rec.id,
              role: "OWNER",
            },
        });

        // 返回插入结果，只有当以上所有操作都成功时，事务才会被提交
        return { workspace_rec, workspaceMembership_rec };
    });
    
    return result;
  } catch (error) {
    console.error("Error creating workspace:", error);
    throw error;
  }
}

export async function createWorkspaceMembershipInDB(
  userId: string,
  workspaceId: string,
  role: string,
) {
  try {
    const membership = await prisma.workspaceMembership.create({
      data: {
        userId: userId,
        workspaceId: workspaceId,
        role: role,
      },
    });
    console.log("WorkspaceMembership created:", membership);
    return membership;
  } catch (error) {
    console.error("Error creating workspace membership:", error);
    throw error;
  }
}
