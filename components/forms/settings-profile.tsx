"use client";

import { User } from "@prisma/client";
import { UserNameForm } from "./user-name-form";


interface SettingsProfileProps {
  user: Pick<User, "id" | "name">;
}

export function SettingsProfile({ user }: SettingsProfileProps) {

  return (
    <div>
      <UserNameForm user={ user } />
    </div>
  );
}

