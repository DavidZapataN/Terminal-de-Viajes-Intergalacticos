import { Rocket, Activity, Users, MapPin, type LucideIcon } from 'lucide-react'
import { Card } from '../../../shared/components/Card'
import { useState } from 'react'
import clsx from 'clsx'

interface Tab {
  name: string
  icon: LucideIcon
}

const tabs: Tab[] = [
  { name: 'Resumen', icon: Activity },
  { name: 'Naves', icon: Rocket },
  { name: 'Planetas', icon: MapPin },
  { name: 'Pasajeros', icon: Users },
]

export const Navbar = () => {
  const [activeTab, setActiveTab] = useState<string>('Resumen')

  return (
    <>
      <Card>
        <ul className="flex w-full gap-0.5 p-1 text-white">
          {tabs.map(tab => (
            <li
              onClick={() => setActiveTab(tab.name)}
              key={tab.name}
              className={clsx(
                'flex w-full cursor-pointer items-center justify-center gap-4 rounded-full p-2 transition-colors',
                activeTab === tab.name
                  ? 'bg-[#06B6D4] text-black hover:bg-[#06B6D4]'
                  : 'text-white hover:bg-white/10'
              )}
            >
              {<tab.icon size={18} />}
              {tab.name}
            </li>
          ))}
        </ul>
      </Card>
    </>
  )
}
