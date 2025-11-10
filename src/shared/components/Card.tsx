import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

const defaultStyle = 'rounded-2xl holo-border p-[1px]'

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={`${defaultStyle} ${className}`}>
      <div className="rounded-2xl bg-[#111120] opacity-95">{children}</div>
    </div>
  )
}
