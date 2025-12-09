import { z } from 'zod'

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .max(100, 'El nombre es demasiado largo'),
    email: z.email('Formato de email inválido').min(1, 'El email es requerido'),
    password: z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
      .regex(/[a-z]/, 'Debe contener al menos una minúscula')
      .regex(/[0-9]/, 'Debe contener al menos un número')
      .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial'),
    confirmPassword: z.string().min(1, 'Debes confirmar la contraseña'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export type RegisterFormData = z.infer<typeof registerSchema>
