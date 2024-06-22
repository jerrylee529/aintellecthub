import Link from "next/link"

import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Reset password successfully",
  description: "Send you reset password successfully",
}

export default function ResetPasswordSuccessPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Forget your passoword
          </h1>
          <h2>Password Reset Email Sent</h2> 
          <p className="px-8 text-left text-sm">An email has been sent to your email address with instructions on how to reset your password.</p> 
          <p className="px-8 text-left text-sm">Please check your inbox (and spam folder) to complete the process.</p> 
          <p className="px-8 text-left text-sm">If you do not receive the email within a few minutes, please try the password reset process again or contact support.</p>
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
    </div>
  )
}
