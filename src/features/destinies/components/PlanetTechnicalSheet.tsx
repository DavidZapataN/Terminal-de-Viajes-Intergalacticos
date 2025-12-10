import { Card } from '@/shared/components/Card'
import { Title } from '@/shared/components/Title'
import type { LucideIcon } from 'lucide-react'

export interface TechnicalData {
  label: string
  value: string
  icon: LucideIcon
}

interface Props {
  technicalData: TechnicalData[]
}

export const PlanetTechnicalSheet = ({ technicalData }: Props) => {
  return (
    <Card>
      <div className="flex w-full flex-col gap-3 p-4 md:gap-4 md:p-6">
        <Title className="text-base">Ficha Técnica Planetaria</Title>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:gap-4">
          {technicalData.map(data => {
            const Icon = data.icon
            return (
              <div
                key={data.label}
                className="flex items-center gap-2 rounded-lg bg-accent p-2 transition-colors hover:bg-accent/20 md:gap-3 md:p-3"
              >
                <Icon className="h-4 w-4 shrink-0 text-purple-400 md:h-5 md:w-5" />
                <div className="min-w-0">
                  <div className="truncate text-xs text-muted-foreground">
                    {data.label}
                  </div>
                  <div className="truncate text-xs font-medium md:text-sm">
                    {data.value}
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
