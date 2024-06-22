import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/shared/icons"
import { UserRegisterForm } from "@/components/forms/user-register-form"
import { Suspense } from "react"
import { NewPasswordForm } from "@/components/forms/new-password-form"


export default function NewPasswordPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Reset your passoword
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your new password
        </p>
      </div>
      <Suspense>
        <NewPasswordForm></NewPasswordForm>
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
