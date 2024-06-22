import * as z from "zod"

export const userAuthSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(8, {
    message: "Password is required"
  })
})

export const resetPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
})

export const newPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Password is required"
  })
})

export const registerSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(8, {
    message: "Password is required"
  }),
  name: z.string().min(1, {
    message: "Name is required"
  })
})