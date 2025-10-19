interface Props {
  title: string
  desciption?: string
  status: 'completed' | 'confirmed' | 'cancelled'
}

export const RecentActivityCard = ({ title, desciption, status }: Props) => {
  return (
    <div className="border-w flex items-center justify-between rounded-2xl bg-[#6365f122] p-4">
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-[#00d3f3]"></span>
        <div>
          <h3>{title}</h3>
          <h4 className="text-sm text-gray-400">{desciption}</h4>
        </div>
      </div>

      <span className="rounded-lg border border-gray-500 bg-gray-700 px-2.5 py-1.5 text-sm text-gray-300">
        {status}
      </span>
    </div>
  )
}
