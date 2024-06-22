"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { login } from "@/actions/login"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { resetPasswordSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/shared/icons"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { resetPassword } from "@/actions/reset-password"


type FormData = z.infer<typeof resetPasswordSchema>

export function UserResetPasswordForm({ className }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const result = await resetPassword(data)

    setIsLoading(false)

    // TODO: replace shadcn toast by react-hot-toast
    if (result && !result.success) {
      return toast({
        title: "Something went wrong.",
        description: result.status,
        variant: "destructive",
      })
    }

    window.location.href = "/reset-password-success";
  }

  return (
    <div className={cn("grid gap-6", className)}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            Send reset email
          </button>
        </div>
      </form>
    </div>
  )
}
