import { type LucideIcon } from 'lucide-react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: LucideIcon
  actionIcon?: LucideIcon
}

export const Input = ({
  label,
  icon: Icon,
  actionIcon: ActionIcon,
  ...props
}: Props) => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label className="text-sm text-gray-400">{label}</label>
      <div className="relative rounded-md border border-transparent [background:linear-gradient(#111120,#111120)_padding-box,linear-gradient(45deg,#06ffa5,#8b5cf6,#06b6d4)_border-box]">
        {Icon && (
          <Icon
            className="absolute top-1/2 left-2 -translate-y-1/2 transform text-gray-400"
            size={18}
          />
        )}
        <input
          {...props}
          className="w-full rounded-md px-9 py-2 text-white transition-all duration-300 ease-in-out focus:outline-[3px] focus:outline-[#28c2de]"
        />
        {ActionIcon && (
          <ActionIcon
            className="absolute top-1/2 right-2 -translate-y-1/2 transform cursor-pointer text-gray-400 transition-colors duration-300 ease-in-out hover:text-gray-300"
            size={18}
          />
        )}
      </div>
    </div>
  )
}
