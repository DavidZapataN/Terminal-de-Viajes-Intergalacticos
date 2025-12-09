import type { Activity } from '@/app/types/Activity'
import { Card } from '@/shared/components/Card'
import { ImageWithFallback } from '@/shared/components/ImageWithFallback'
import { Title } from '@/shared/components/Title'
import {
  ActivityIcon,
  Clock,
  Droplets,
  Mountain,
  Sun,
  Trees,
  Wind,
} from 'lucide-react'

interface Props {
  detailedActivities: Activity[]
}

const difficultyConfig = {
  easy: 'Fácil',
  medium: 'Medio',
  hard: 'Difícil',
}

const categoryIcons = {
  mountain: Mountain,
  water: Droplets,
  air: Wind,
  forest: Trees,
  desert: Sun,
}

export const PlanetActivities = ({ detailedActivities }: Props) => {
  return (
    <Card>
      <div className="flex w-full flex-col gap-4 p-6">
        <Title>Actividades y experiencias</Title>

        <div className="grid gap-4">
          {detailedActivities.map((activity, index) => {
            const Icon = categoryIcons[activity.category]
            return (
              <div
                key={index}
                className="flex gap-4 rounded-lg border border-border bg-accent/5 p-4 transition-all duration-300 hover:border-cyan-400/30 hover:bg-accent/10"
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                  <ImageWithFallback
                    src={activity.image}
                    alt={activity.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="flex items-center gap-2">
                    <Icon size={16} className="text-purple-400" />
                    {activity.name}
                  </h4>

                  <p className="mb-2 text-sm text-muted-foreground">
                    {activity.description}
                  </p>

                  <div className="flex justify-between">
                    <div className="flex gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <ActivityIcon className="h-3 w-3" />
                        {difficultyConfig[activity.difficulty]}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.duration}
                      </span>
                    </div>
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
