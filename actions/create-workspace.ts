"use server";

import { workspaceSchema } from "@/lib/validations/workspace";

import * as z from "zod";
import { getWorkspacesByUserId, insertWorkspace } from "@/data/workspace"
import { updateUserWorkspace } from "@/data/user";


export async function createWorkspace(userId: string, values: z.infer<typeof workspaceSchema>) {
  try {
    const validatedFields = workspaceSchema.safeParse(values);

    if (!validatedFields.success) {
      return { status: "Invalid parameters" }
    }

    const { name, description } = validatedFields.data;

    const workspaces = await getWorkspacesByUserId(userId);

    // 从workspaces中获取userId对应的workspace
    const found_workspace = workspaces.find((item) => item.name === name);

    if (found_workspace) {
      return { success: false, status: "Workspace already exists" };
    }

    const workspace = await insertWorkspace(userId, name, description);

    if (!workspace) {
      return { success: false, status: "Failed to create workspace" };
    }

    const user = await updateUserWorkspace(userId, workspace.workspace_rec.id);

    if (!user) {
      return { success: false, status: "Failed to update user workspace" };
    }
  
    return { success: true, status: "Created workspace successfully", workspaceId: workspace.workspace_rec.id };
  } catch (error) {
    console.log(error)
    return { success: false, status: "error" }
  }
}