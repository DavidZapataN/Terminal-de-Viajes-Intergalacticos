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
      <div className="flex w-full flex-col gap-4 p-6">
        <Title>Ficha Técnica Planetaria</Title>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {technicalData.map(data => {
            const Icon = data.icon
            return (
              <div
                key={data.label}
                className="flex items-center gap-3 rounded-lg bg-accent p-3 transition-colors hover:bg-accent/20"
              >
                <Icon className="h-5 w-5 shrink-0 text-purple-400" />
                <div>
                  <div className="text-sm text-muted-foreground">
                    {data.label}
                  </div>
                  <div className="text-sm">{data.value}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
