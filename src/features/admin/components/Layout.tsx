import { Navbar } from './Navbar'

export const Layout = () => {
  return (
    <div className="flex h-screen w-full flex-col gap-2.5 p-5">
      <h2 className="text-cyan-400">Portal Administrativo TVI</h2>
      <h2 className="text-white">
        Centro de control para operaciones galácticas
      </h2>

      <Navbar />
    </div>
  )
}
