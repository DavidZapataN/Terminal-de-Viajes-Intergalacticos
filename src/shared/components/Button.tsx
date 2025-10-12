interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  className?: string
}

const baseStyle =
  'cursor-pointer rounded-md px-4 py-2 font-medium transition-all duration-300 ease-in-out'

const variants = {
  primary:
    'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600',
  secondary: 'bg-transparent text-white hover:bg-gray-600 focus:ring-gray-500',
}

export const Button = ({ variant = 'primary', className, ...props }: Props) => {
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}></button>
  )
}
