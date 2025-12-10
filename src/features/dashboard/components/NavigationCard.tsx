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
    <Card className="group hover:neon-glow h-full w-full cursor-pointer transition-all duration-300 hover:scale-[1.02]">
      <div
        className="flex h-full flex-col p-4 sm:p-6"
        onClick={() => onClick(id)}
      >
        <div
          className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr p-2 text-white shadow-lg ${color} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon size={20} />
        </div>
        <h3 className="mb-1 font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
    </Card>
  )
}
