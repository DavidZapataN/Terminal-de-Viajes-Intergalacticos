import { Input } from '@/shared/components/Input'

interface Props {
  label: string
  value: string
  editable?: boolean
  onChange?: (value: string) => void
}

export const ProfileField = ({ label, value, editable, onChange }: Props) => {
  const fieldGap = editable ? 'gap-0' : 'gap-1'
  return (
    <div className={`flex flex-col ${fieldGap}`}>
      <span className="text-gray-400">{label}</span>
      {editable ? (
        <Input
          className="!px-4"
          value={value}
          onChange={e => onChange?.(e.target.value)}
          required
        />
      ) : (
        <span>{value}</span>
      )}
    </div>
  )
}
