interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

const baseStyle =
  'cursor-pointer rounded-md px-4 py-2 font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2'

const variants = {
  primary:
    'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 focus:ring-[#28c2de]',
  secondary: 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500',
}

export const Button = ({ variant = 'primary', ...props }: Props) => {
  return (
    <button className={`${baseStyle} ${variants[variant]}`} {...props}></button>
  )
}
