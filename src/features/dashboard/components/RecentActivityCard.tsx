import { Badge } from "@/shared/components/Bagde"

interface Props {
  title: string
  description?: string
  status: 'confirmed' | 'in_transit' | 'completed' | 'cancelled'
}

const statusStyles = {
  confirmed: {
    name: 'Confirmada',
    style: 'text-xs bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  },
  in_transit: {
    name: 'En tránsito',
    style: 'text-xs bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  },
  completed: {
    name: 'Completada',
    style: 'text-xs bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
  cancelled: {
    name: 'Cancelada',
    style: 'text-xs bg-red-500/20 text-red-400 border-red-500/30',
  },
}

export const RecentActivityCard = ({ title, description, status }: Props) => {
  return (
    <div className="border-w flex items-center justify-between rounded-2xl bg-[#6365f122] p-4">
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-[#00d3f3]"></span>
        <div>
          <h3 className="text-sm">{title}</h3>
          <h4 className="text-xs text-gray-400">{description}</h4>
        </div>
      </div>

      <Badge className={statusStyles[status].style}>
        {statusStyles[status].name}
      </Badge>
    </div>
  )
}
