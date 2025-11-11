import { Input } from '@/shared/components/Input'

interface Props {
  label: string
  value: string
  editable?: boolean
  onChange?: (value: string) => void
}

export const ProfileField = ({ label, value, editable, onChange }: Props) => {
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
      <Input
        className="!px-4"
        value={value}
        onChange={e => onChange?.(e.target.value)}
        required
      />
    </div>
  )
}
