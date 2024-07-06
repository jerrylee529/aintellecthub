"use client"

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { Workspace } from "@prisma/client"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { userNameSchema } from "@/lib/validations/user"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/shared/icons"
import { User } from "@prisma/client"
import * as z from "zod"
import { workspaceSchema } from "@/lib/validations/workspace";
import { createWorkspace } from "@/actions/create-workspace";
import { Textarea } from "../ui/textarea";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

type FormData = z.infer<typeof workspaceSchema>

interface CreateWorkspaceFormProps {
  user: Pick<User, "id" | "name">
  name: string,
  description: string
}

export function CreateWorkspaceForm({ user, name, description }: CreateWorkspaceFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "my workspace",
      description: "my workspace description",
    },
  })

  const onSubmit = handleSubmit(data => {
    startTransition(async () => {
      const result = await createWorkspace(user.id, data);

      if (!result) {
        toast({
          title: "Something went wrong.",
          description: "Your workspace was not created. Please try again.",
          variant: "destructive",
        })
      } else {
        toast({
          description: "Your workspace has been created.",
        })

        const url = `${DEFAULT_LOGIN_REDIRECT}/${result.workspaceId}`;
        window.location.href = url;
      }
    });

  });

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Workspace Name</CardTitle>
          <CardDescription>
            Please enter a new workspace name
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-full sm:w-[400px]"
              size={32}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
        </CardContent>
        <CardHeader>
          <CardTitle>Workspace Name</CardTitle>
          <CardDescription>
            Please enter a new workspace name
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="description">
              Name
            </Label>
            <Textarea
              id="description"
              className="w-full sm:w-[400px]"
              {...register("description")}
            />
            {errors?.description && (
              <p className="px-1 text-xs text-red-600">{errors.description.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            <span>{isPending ? "Creating" : "Create"}</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  )
}
