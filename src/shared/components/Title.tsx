export const Title = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <h1
      className={`w-fit bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </h1>
  )
}
