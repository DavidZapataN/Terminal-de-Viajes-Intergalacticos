import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

const defaultStyle =
  'rounded-[15px] border border-transparent p-[1px] [background:linear-gradient(#111120,#111120)_padding-box,linear-gradient(45deg,#06ffa5,#8b5cf6,#06b6d4)_border-box]'

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={`${defaultStyle} ${className}`}>
      <div className="rounded-[15px] bg-[#111120] opacity-95">{children}</div>
    </div>
  )
}
