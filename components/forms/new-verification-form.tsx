"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { login } from "@/actions/login"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"


import { userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/shared/icons"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/verification-token"


export function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");
 
  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token!");
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.message);
        setError(data.message);

        window.location.href = "/dashboard";
    })
    .catch(() => {
      setError("Something went wrong!");
    })
  }, [token])

  useEffect(() => {
    onSubmit();
  }, [onSubmit])

  return (
    <div className="flex items-center w-full justify-center">
      {!success && !error && ( <div>verifying</div> )}
      {success && ( <div>{success}</div> )}
      {error && ( <div>{error}</div> )}
    </div>
  )
}
