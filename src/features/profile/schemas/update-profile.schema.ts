import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  email: z.email('Formato de email inválido').min(1, 'El email es requerido'),
})

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>
