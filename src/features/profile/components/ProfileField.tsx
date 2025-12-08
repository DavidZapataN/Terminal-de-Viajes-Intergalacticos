import { Input } from '@/shared/components/Input'
import { forwardRef } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  editable?: boolean
}

export const ProfileField = forwardRef<HTMLInputElement, Props>(
  ({ label, value, editable, ...props }, ref) => {
    if (!editable) {
      return (
        <div className="flex flex-col gap-1">
          <span className="text-gray-400">{label}</span>
          <span>{value}</span>
        </div>
      )
    }

    return (
      <div className="flex flex-col gap-0">
        <span className="text-gray-400">{label}</span>
        <Input className="!px-4" ref={ref} {...props} />
      </div>
    )
  }
)

ProfileField.displayName = 'ProfileField'
