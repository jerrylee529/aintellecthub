'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SettingsProfile } from "@/components/forms/settings-profile";
import { SettingsTeam } from "@/components/forms/settings-team";
import { getMembersInWorkspace } from '@/actions/get-users-in-workspace';
import { User } from '@prisma/client';


interface SettingsTabProps {
    //user: Pick<User, "id" | "name">;
    user: User;
    members: [];
}

export function SettingsTab({ user, members }: SettingsTabProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const initialTab = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState(initialTab || "profile");

    const handleTabChange = (value) => {
      // Update the state
      setActiveTab(value);
      // Update the URL query parameter
      const url = `${pathname}?tab=${value}`;
      window.history.pushState({}, '', url);
    };

    // If the query parameter changes, update the state
    useEffect(() => {
      setActiveTab(searchParams.get('tab'));
    }, [searchParams]);


  return (
    <div>
        <Tabs
        value={activeTab}
        defaultValue="profile"
        onValueChange={handleTabChange}
        className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
            <SettingsProfile user={user} />
        </TabsContent>
        <TabsContent value="team">
            <SettingsTeam data={members} onInvite={()=> {}}></SettingsTeam>
        </TabsContent>
      </Tabs>
    </div>
  );
};
