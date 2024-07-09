"use client";

import Link from "next/link";
import { CreditCard, LayoutDashboard, LogOut, Settings, ListPlus, ListChecksIcon, CheckCircle } from "lucide-react";
import type { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { switchWorkspace } from "@/actions/switch-workspace";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSub
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/shared/user-avatar";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "id" | "name" | "image" | "email">;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const { data: session } = useSession();

  const workspaces = session?.user.workspaces;
  const currentWorkspaceId = session?.user.currentWorkspaceId;

  console.info("user: ", user);

  console.info("currentWorkspaceId: ", currentWorkspaceId)

  const handleLinkClick = (workspaceId) => async (e) => {
    e.preventDefault();  // 阻止默认的链接跳转行为

    try {
      const {success, status} = await switchWorkspace(user.id, workspaceId);
  
      if (!success) {
        throw new Error('Failed to switch workspace');
      }
    } catch (error) {

      console.error('Error switching workspace:', error);
    }

    window.location.href = `/dashboard/${workspaceId}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user?.name || null, image: user?.image || null }}
          className="size-9 border"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user?.name && <p className="font-medium">{user?.name}</p>}
            {user?.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user?.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        {/* 添加的 Switch Workspace 菜单项及子菜单 */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            Switch Workspace
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {workspaces.map(workspace => (
              <DropdownMenuItem key={workspace.id}>  
                <Link href={`/dashboard/${workspace.id}`} className="flex items-center space-x-2.5" onClick={handleLinkClick(workspace.id)}>
                  {currentWorkspaceId && currentWorkspaceId === workspace.id && (
                    <CheckCircle className="size-4" />
                  )}
                  <p className="text-sm">{workspace.name}</p>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/create-workspace" className="flex items-center space-x-2.5">
            <ListPlus className="size-4" />
            <p className="text-sm">Create workspace</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/billing"
            className="flex items-center space-x-2.5"
          >
            <CreditCard className="size-4" />
            <p className="text-sm">Billing</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/settings"
            className="flex items-center space-x-2.5"
          >
            <Settings className="size-4" />
            <p className="text-sm">Settings</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/`,
            });
          }}
        >
          <div className="flex items-center space-x-2.5">
            <LogOut className="size-4" />
            <p className="text-sm">Log out </p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


