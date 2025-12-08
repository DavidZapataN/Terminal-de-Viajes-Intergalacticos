import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('Formato de email inválido').min(1, 'El email es requerido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

export type LoginFormData = z.infer<typeof loginSchema>
