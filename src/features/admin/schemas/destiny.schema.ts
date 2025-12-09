import { z } from 'zod'

export const activitySchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, 'El nombre de la actividad es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z
    .string()
    .min(1, 'La descripción es requerida')
    .min(10, 'La descripción debe tener al menos 10 caracteres'),
  difficulty: z.enum(['easy', 'medium', 'hard'], {
    message: 'La dificultad es requerida',
  }),
  duration: z.string().min(1, 'La duración es requerida'),
  category: z.enum(['mountain', 'water', 'air', 'forest', 'desert'], {
    message: 'La categoría es requerida',
  }),
  image: z
    .string()
    .min(1, 'La imagen es requerida')
    .url('Debe ser una URL válida'),
})

export const destinySchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre del destino es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  description: z
    .string()
    .min(1, 'La descripción es requerida')
    .min(20, 'La descripción debe tener al menos 20 caracteres')
    .max(500, 'La descripción es demasiado larga'),
  images: z
    .array(z.string().url('Debe ser una URL válida'))
    .min(1, 'Debe agregar al menos una imagen')
    .max(10, 'Máximo 10 imágenes'),
  gravity: z
    .number({ message: 'La gravedad debe ser un número' })
    .min(0, 'La gravedad debe ser mayor o igual a 0')
    .max(100, 'La gravedad no puede ser mayor a 100'),
  system: z
    .string()
    .min(1, 'El sistema estelar es requerido')
    .min(3, 'El sistema debe tener al menos 3 caracteres'),
  dayNightCycle: z
    .number({ message: 'El ciclo día/noche debe ser un número' })
    .min(0, 'El ciclo debe ser mayor o igual a 0')
    .max(1000, 'El ciclo no puede ser mayor a 1000 horas'),
  atmosphere: z.enum(['breathable', 'not breathable', 'toxic', 'none'], {
    message: 'El tipo de atmósfera es requerido',
  }),
  population: z
    .number({ message: 'La población debe ser un número' })
    .min(0, 'La población debe ser mayor o igual a 0'),
  averageTemperature: z
    .number({ message: 'La temperatura debe ser un número' })
    .min(-273, 'La temperatura no puede ser menor a -273°C'),
  distance: z
    .number({ message: 'La distancia debe ser un número' })
    .min(0, 'La distancia debe ser mayor o igual a 0'),
  position: z.object({
    x: z.number().min(0).max(100),
    y: z.number().min(0).max(100),
  }),
  price: z
    .number({ message: 'El precio debe ser un número' })
    .min(0, 'El precio debe ser mayor o igual a 0')
    .positive('El precio debe ser positivo'),
  activities: z
    .array(activitySchema)
    .min(1, 'Debe agregar al menos una actividad')
    .max(20, 'Máximo 20 actividades por destino'),
})

export type DestinyFormData = z.infer<typeof destinySchema>
export type ActivityFormData = z.infer<typeof activitySchema>
