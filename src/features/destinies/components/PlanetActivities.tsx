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
      <div className="flex w-full flex-col gap-3 p-4 md:gap-4 md:p-6">
        <Title className="text-base">Actividades y experiencias</Title>

        <div className="grid gap-3 md:gap-4">
          {detailedActivities.map((activity, index) => {
            const Icon = categoryIcons[activity.category]
            return (
              <div
                key={index}
                className="flex flex-col gap-3 rounded-lg border border-border bg-accent/5 p-3 transition-all duration-300 hover:border-cyan-400/30 hover:bg-accent/10 sm:flex-row sm:gap-4 sm:p-4"
              >
                {/* Activity Image */}
                <div className="h-32 w-full shrink-0 overflow-hidden rounded-lg sm:h-16 sm:w-16">
                  <ImageWithFallback
                    src={activity.image}
                    alt={activity.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Activity Details */}
                <div className="flex-1">
                  <h4 className="flex items-center gap-2 text-sm md:text-base">
                    <Icon
                      size={14}
                      className="shrink-0 text-purple-400 md:h-4 md:w-4"
                    />
                    {activity.name}
                  </h4>

                  <p className="mb-2 text-xs text-muted-foreground md:text-sm">
                    {activity.description}
                  </p>

                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="flex items-center gap-1 rounded-full bg-purple-500/10 px-2 py-1">
                      <ActivityIcon className="h-3 w-3" />
                      {difficultyConfig[activity.difficulty]}
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-cyan-500/10 px-2 py-1">
                      <Clock className="h-3 w-3" />
                      {activity.duration}
                    </span>
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
