import { redirect } from "next/navigation";
import { Metadata } from "next"

import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/shared/icons"
import { Suspense } from "react"
import { CreateWorkspaceForm } from "@/components/forms/create-workspace-form"
import { DashboardShell } from "@/components/dashboard/shell"
import { DashboardHeader } from "@/components/dashboard/header"
import { getCurrentUser } from "@/lib/session"

export const metadata: Metadata = {
  title: "Create workspace",
  description: "Create a workspace",
}

export default async function CreateWorkspacePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }
  
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <CreateWorkspaceForm user={{ id: user.id, name: user.name || "" }} name="" description="" />
      </div>
    </DashboardShell>

  )
}
