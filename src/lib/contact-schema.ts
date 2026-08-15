import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  message: z.string().trim().min(10).max(2000),
})

export type ContactFormValues = z.infer<typeof contactSchema>
