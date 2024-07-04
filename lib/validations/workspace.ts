import * as z from "zod"

export const workspaceSchema = z.object({
  name: z.string().min(3).max(32),
  description: z.string().min(0).max(255),
})
