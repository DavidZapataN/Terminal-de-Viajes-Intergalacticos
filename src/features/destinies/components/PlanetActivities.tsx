import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { ImageWithFallback } from '@/shared/components/ImageWithFallback'
import { Title } from '@/shared/components/Title'
import { Activity, Clock, type LucideIcon } from 'lucide-react'

export interface Activity {
  name: string
  description: string
  difficulty: string
  duration: string
  price: number
  image: string
  icon: LucideIcon
}

interface Props {
  detailedActivities: Activity[]
}

export const PlanetActivities = ({ detailedActivities }: Props) => {
  return (
    <Card>
      <div className="flex w-full flex-col gap-4 p-6">
        <Title>Actividades y experiencias</Title>

        <div className="grid gap-4">
          {detailedActivities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <div
                key={index}
                className="flex gap-4 rounded-lg border border-border bg-accent/5 p-4 transition-all duration-300 hover:border-cyan-400/30 hover:bg-accent/10"
              >
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                  <ImageWithFallback
                    src={activity.image}
                    alt={activity.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="flex items-center gap-2">
                      <Icon size={16} className="text-cyan-400" />
                      {activity.name}
                    </h4>
                    <span className="text-sm text-cyan-400">
                      {activity.price.toLocaleString()} GC
                    </span>
                  </div>

                  <p className="mb-2 text-sm text-muted-foreground">
                    {activity.description}
                  </p>

                  <div className="flex justify-between">
                    <div className="flex gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <Activity className="h-3 w-3" />
                        {activity.difficulty}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.duration}
                      </span>
                    </div>

                    <Button className="text-xs">Agregar a mi viaje</Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
