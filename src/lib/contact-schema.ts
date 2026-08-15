import { z } from 'zod'

const MESSAGES = {
  es: {
    name: 'El nombre debe tener al menos 2 caracteres',
    email: 'Email inválido',
    message: 'El mensaje debe tener al menos 10 caracteres',
  },
  en: {
    name: 'Name must be at least 2 characters',
    email: 'Invalid email',
    message: 'Message must be at least 10 characters',
  },
}

export function createContactSchema(language: 'es' | 'en' = 'es') {
  const t = MESSAGES[language]

  return z.object({
    name: z.string().trim().min(2, { message: t.name }).max(100),
    email: z.string().trim().email({ message: t.email }),
    message: z.string().trim().min(10, { message: t.message }).max(2000),
  })
}

export const contactSchema = createContactSchema('es')

export type ContactFormValues = z.infer<typeof contactSchema>
