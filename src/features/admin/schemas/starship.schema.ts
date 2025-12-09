import { z } from 'zod'

export const cabinSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, 'El nombre de la cabina es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z
    .string()
    .min(1, 'La descripción es requerida')
    .min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z
    .number({ message: 'El precio debe ser un número' })
    .min(0, 'El precio debe ser mayor o igual a 0')
    .positive('El precio debe ser positivo'),
})

export const starshipSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre de la nave es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  class: z
    .string()
    .min(1, 'La clase de la nave es requerida')
    .min(3, 'La clase debe tener al menos 3 caracteres'),
  capacity: z
    .number({ message: 'La capacidad debe ser un número' })
    .min(1, 'La capacidad debe ser al menos 1')
    .positive('La capacidad debe ser positiva'),
  status: z.enum(['active', 'maintenance', 'unavailable'], {
    message:
      'El estado es requerido. Valores válidos: active, maintenance, unavailable',
  }),
  amenities: z
    .array(z.string())
    .min(1, 'Debe agregar al menos una amenidad')
    .refine(arr => arr.every(item => item.trim().length > 0), {
      message: 'Las amenidades no pueden estar vacías',
    }),
  cabins: z
    .array(cabinSchema)
    .min(1, 'Debe agregar al menos una cabina')
    .max(20, 'Máximo 20 cabinas por nave'),
})

export type StarshipFormData = z.infer<typeof starshipSchema>
export type CabinFormData = z.infer<typeof cabinSchema>
