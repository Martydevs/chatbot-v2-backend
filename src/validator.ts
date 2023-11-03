import { z } from "zod"

const schema = z.object({
  prompt: z.string().min(10).max(50)
})

export type Input = z.infer<typeof schema>;