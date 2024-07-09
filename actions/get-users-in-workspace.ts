"use server";

import { getMembersByWorkspaceId } from "@/data/workspace";
import { eachMinuteOfInterval } from "date-fns";
import { use } from "react";


export async function getMembersInWorkspace(workspaceId: string) {
  try {
    const members = await getMembersByWorkspaceId(workspaceId);

    if (!members) {
        return { success: false, status: "Workspace doesn't contain any user" };
    }
  
    const result = members.map(
        user => ({
          id: user.user.id,
          name: user.user.name, 
          email: user.user.email,
          role: user.role,
        })
    );

    return { success: true, status: "Updated workspace successfully", members: result };
  } catch (error) {
    console.log(error)
    return { success: false, status: "error" }
  }
}