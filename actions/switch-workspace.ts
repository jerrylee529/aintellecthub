"use server";

import { workspaceSchema } from "@/lib/validations/workspace";

import * as z from "zod";
import { getUserById, updateUserWorkspace } from "@/data/user"
import { getWorkspacesByUserId, insertWorkspace } from "@/data/workspace";


export async function switchWorkspace(userId: string, workspaceId: string) {
  try {
    const workspaces = await getWorkspacesByUserId(userId);

    if (!workspaces) {
        return { success: false, status: "User has no any workspace" };
    }

    const found_workspace = workspaces.find((item) => item.id === workspaceId);

    if (!found_workspace) {
      return { success: false, status: "Workspace does not exist" };
    }

    const user = await updateUserWorkspace(userId, workspaceId);

    if (!user) {
      return { success: false, status: "Failed to update workspace" };
    }
  
    return { success: true, status: "Updated workspace successfully" };
  } catch (error) {
    console.log(error)
    return { success: false, status: "error" }
  }
}