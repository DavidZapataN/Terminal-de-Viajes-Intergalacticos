interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text'
  className?: string
}

const baseStyle =
  'cursor-pointer rounded-md px-4 py-2 font-medium transition-all duration-300 ease-in-out flex items-center justify-center'

const variants = {
  primary:
    'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600',
  secondary: 'bg-transparent text-white hover:bg-gray-600 focus:ring-gray-500',
  text: 'bg-transparent text-gray-400 hover:bg-[#6366f1] focus:ring-gray-500 hover:text-white',
}

export const Button = ({ variant = 'primary', className, ...props }: Props) => {
  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    ></button>
  )
}
