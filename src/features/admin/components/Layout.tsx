import { Rocket, Activity, Users, MapPin } from 'lucide-react'
import { Navbar, type Tab } from '../../../shared/components/Navbar'
import { useState } from 'react'
import { Summary } from '../pages/Summary'
import { Starships } from '../pages/Starships'
import { Planets } from '../pages/Planets'
import { Passengers } from '../pages/Passsengers'

const tabs: Tab[] = [
  { name: 'Resumen', icon: Activity },
  { name: 'Naves', icon: Rocket },
  { name: 'Planetas', icon: MapPin },
  { name: 'Pasajeros', icon: Users },
]

export const Layout = () => {
  const [activeTab, setActiveTab] = useState<string>('Resumen')

  return (
    <div className="flex h-screen w-full flex-col gap-2.5 p-5">
      <h2 className="text-cyan-400">Portal Administrativo TVI</h2>
      <h2 className="text-white">
        Centro de control para operaciones galácticas
      </h2>
      <Navbar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'Resumen' && <Summary />}
      {activeTab === 'Naves' && <Starships />}
      {activeTab === 'Planetas' && <Planets />}
      {activeTab === 'Pasajeros' && <Passengers />}
    </div>
  )
}
