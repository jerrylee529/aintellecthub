"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { registerSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/shared/icons"
import { signUp } from "@/actions/register"

type FormData = z.infer<typeof registerSchema>

export function UserRegisterForm({ className }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ 
    resolver: zodResolver(registerSchema), 
    defaultValues: { 
      name: "", 
      email: "", 
      password: "", 
    }, 
  });
  
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams() 
  
  async function onSubmit(values: FormData) { 
    setIsLoading(true) 
    try { 
      const data = await signUp(values) 
      // handle success, potentially setting error messages or directing the user 
      if (data.success) {
        toast({ 
          title: "Success", 
          description: "You've successfully registered. Check your email to verify your account.", 
        }) 
      } else {
        toast({ 
          title: "Error", 
          description: data.status, 
          variant: "destructive",
        })
      }
    } catch (error) { 
      toast({ 
        title: "Something went wrong.", 
        description: "Your sign in request failed. Please try again.", 
        variant: "destructive",
      }) 
    } finally { 
      setIsLoading(false) 
    }
  }

  return (
    <div className={cn("grid gap-6", className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
        <div className="grid gap-1">
            <Label htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Jerry Wong"
              disabled={isLoading || isGoogleLoading}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>
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
              disabled={isLoading || isGoogleLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              disabled={isLoading || isGoogleLoading}
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
            Create an account
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGoogleLoading(true)
          signIn("google")
        }}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 size-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 size-4" />
        )}{" "}
        Google
      </button>
    </div>
  )
}
