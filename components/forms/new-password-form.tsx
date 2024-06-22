"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { newPasswordSchema, resetPasswordSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/shared/icons"
import { newPassword } from "@/actions/new-password"
import { useState } from "react"

type FormData = z.infer<typeof newPasswordSchema>

export function NewPasswordForm({ className }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(newPasswordSchema),
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const searchParams = useSearchParams();

  const token = searchParams.get("token");
 
  async function onSubmit(data: FormData) {
    setIsLoading(true);

    if (!token) {
      setError("Missing token!");
    }

    const result = await newPassword(data, token);

    setIsLoading(false);

    // TODO: replace shadcn toast by react-hot-toast
    if (result && !result.success) {
      return toast({
        title: "Something went wrong.",
        description: result.status,
        variant: "destructive",
      })
    }

    // 成功重置密码后的逻辑 
    toast({ 
      title: "Password reset success.", 
      description: "You will be redirected to login.", 
      variant: "default", // 改为 'success' 来更准确地反映这是个成功的通知 
    }); 
    
    // 延时跳转，3000毫秒后 
    return setTimeout(() => { 
      window.location.href = "/login"; 
    }, 3000); 
  }

  return (
    <div className={cn("grid gap-6", className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            Reset password
          </button>
        </div>
      </form>
    </div>
  )
}
