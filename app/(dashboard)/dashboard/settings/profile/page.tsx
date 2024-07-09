import { redirect } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { SettingsForm } from "@/components/forms/settings-form";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { getMembersInWorkspace } from "@/actions/get-users-in-workspace";

export const metadata = constructMetadata({
  title: "Settings – AIntellectHub",
  description: "Configure your account and website settings.",
});

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const members = await getMembersInWorkspace(user.currentWorkspaceId);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <SettingsForm user={{ id: user.id, name: user.name || "" }} workspaceId={user.currentWorkspaceId} members={members} />
      </div>
    </DashboardShell>
  );
}
