import { z } from 'zod'

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, 'La contraseña actual es requerida')
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    newPassword: z
      .string()
      .min(1, 'La nueva contraseña es requerida')
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
      .regex(/[a-z]/, 'Debe contener al menos una minúscula')
      .regex(/[0-9]/, 'Debe contener al menos un número')
      .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial'),
    confirmPassword: z.string().min(1, 'Debes confirmar la nueva contraseña'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })
  .refine(data => data.currentPassword !== data.newPassword, {
    message: 'La nueva contraseña debe ser diferente a la actual',
    path: ['newPassword'],
  })

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
