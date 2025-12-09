import type { LucideIcon } from 'lucide-react'
import { Card } from '../../../shared/components/Card'

interface Props {
  title: string
  count: number
  icon: LucideIcon
  color: string
}

export const SummaryCard = ({ title, count, icon: Icon, color }: Props) => {
  return (
    <Card className="h-max w-full!">
      <div className="flex w-full items-center justify-between p-6">
        <div className="flex flex-col gap-2.5">
          <h1 className="text-md">{title}</h1>
          <h1 className="text-2xl" style={{ color }}>
            {count.toLocaleString()}
          </h1>
        </div>

        {<Icon style={{ color }} size={36} />}
      </div>
    </Card>
  )
}
