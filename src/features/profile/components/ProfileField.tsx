import { Input } from '@/shared/components/Input'

interface Props {
  label: string
  value: string
  editable?: boolean
}

export const ProfileField = ({ label, value, editable }: Props) => {
  const fieldGap = editable ? 'gap-0' : 'gap-1'
  return (
    <div className={`flex flex-col ${fieldGap}`}>
      <span className='text-gray-400'>{label}</span>
      {editable ? (
        <Input className="!px-4" defaultValue={value} />
      ) : (
        <span>{value}</span>
      )}
    </div>
  )
}
