import { redirect, usePathname, useSearchParams } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { getMembersInWorkspace } from "@/actions/get-users-in-workspace";
import { SettingsProfile } from "@/components/forms/settings-profile";
import { SettingsTeam } from "@/components/forms/settings-team";
import { SettingsTab } from "@/components/forms/settings-tab";


export const metadata = constructMetadata({
  title: "Settings – AIntellectHub",
  description: "Configure your account and website settings.",
});

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const result = await getMembersInWorkspace(user.currentWorkspaceId);
  if (!result) {
    redirect("/dashboard");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div>
        <SettingsTab user={ user } members={ result.members }></SettingsTab>
      </div>
    </DashboardShell>
  );
}
