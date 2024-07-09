import { redirect } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { useRouter } from 'next/router';
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";


export const metadata = constructMetadata({
  title: "Settings – AIntellectHub",
  description: "Overview of your account and activities.",
});

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if ('currentWorkspaceId' in user && user.currentWorkspaceId) {
    const url = `${DEFAULT_LOGIN_REDIRECT}/${user.currentWorkspaceId}`
    redirect(url);
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Panel" text="Create and manage content." />
      <div>
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No content created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any content yet. Start creating content.
          </EmptyPlaceholder.Description>
          <Button variant="outline">Fake button</Button>
        </EmptyPlaceholder>
      </div>
    </DashboardShell>
  );
}
