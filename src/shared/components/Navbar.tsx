import { type LucideIcon } from 'lucide-react'
import { Card } from './Card'
import clsx from 'clsx'

export interface Tab {
  name: string
  icon: LucideIcon
  path: string
}

interface Props {
  tabs: Tab[]
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const Navbar = ({ tabs, activeTab, setActiveTab }: Props) => {
  const changeTab = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <>
      <Card>
        <ul className="flex w-full gap-0.5 p-1 text-white">
          {tabs.map(tab => (
            <li
              onClick={() => changeTab(tab.name)}
              key={tab.name}
              className={clsx(
                'flex w-full cursor-pointer items-center justify-center gap-4 rounded-full p-2 transition-colors',
                activeTab === tab.name
                  ? 'bg-[#06B6D4] text-black'
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
