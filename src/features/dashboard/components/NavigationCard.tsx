import { Card } from '@/shared/components/Card'
import type { LucideIcon } from 'lucide-react'

interface Props {
  id: string
  title: string
  subtitle: string
  icon: LucideIcon
  color: string
  onClick: (id: string) => void
}

export const NavigationCard = ({
  id,
  title,
  subtitle,
  icon: Icon,
  color,
  onClick,
}: Props) => {
  return (
    <Card className="group hover:neon-glow h-max w-full min-w-[14rem] cursor-pointer transition-all duration-300">
      <div className="p-6" onClick={() => onClick(id)}>
        <div
          className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr p-2 text-white ${color} transition-transform duration-300 group-hover:scale-110`}
        >
          {<Icon size={20} />}
        </div>
        <span className="mb-2">{title}</span>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </Card>
  )
}
