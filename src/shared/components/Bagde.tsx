export interface Props {
  children?: React.ReactNode
  className?: string
}

export const Badge = ({ children, className }: Props) => {
  return (
    <div
      className={`inline-flex w-fit shrink-0 items-center justify-center rounded-sm border px-2.5 py-0.5 text-sm font-medium whitespace-nowrap ${className}`}
    >
      {children}
    </div>
  )
}
