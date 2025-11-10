import { type LucideIcon } from 'lucide-react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: LucideIcon
  actionIcon?: LucideIcon
  className?: string
}

export const Input = ({
  label,
  icon: Icon,
  actionIcon: ActionIcon,
  className,
  ...props
}: Props) => {
  const fieldGap = label ? 'gap-1.5' : 'gap-0'

  return (
    <div className={`flex w-full flex-col ${fieldGap}`}>
      <label className="text-sm text-gray-400">{label}</label>
      <div className="relative rounded-md holo-border">
        {Icon && (
          <Icon
            className="absolute top-1/2 left-2 -translate-y-1/2 transform text-gray-400"
            size={18}
          />
        )}
        <input
          {...props}
          className={`w-full rounded-md px-9 py-2 text-white transition-all duration-300 ease-in-out focus:outline-[3px] focus:outline-[#28c2de] ${className}`}
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
