import Link from "next/link"

import { Metadata } from "next"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/shared/icons"
import { Suspense } from "react"
import { UserResetPasswordForm } from "@/components/forms/user-reset-password-form"


export const metadata: Metadata = {
  title: "Reset password",
  description: "Reset your password",
}

export default function ResetPasswordPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto size-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Forget your passoword
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to reset your password
          </p>
        </div>
        <Suspense>
          <UserResetPasswordForm />
        </Suspense>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/login"
            className="hover:text-brand underline underline-offset-4"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  )
}
