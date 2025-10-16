import { Card } from '@/shared/components/Card'
import type { Tab } from '@/shared/components/Navbar'

interface Props {
  tabs: Tab[]
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const ProfileNavbar = ({ tabs, activeTab, setActiveTab }: Props) => {
  const changeTab = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <Card>
      <div className="flex w-[18rem] flex-col items-center gap-4 p-6">
        <div className="flex h-18 w-18 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 p-4 font-bold text-white">
          CS
        </div>

        <h2> Comandante Stellar </h2>
        <span className="text-sm text-gray-400">Commander</span>
        <span className="text-sm text-cyan-400">GAL-2024-7X9</span>

        <hr className="mb-4 h-px w-full border-[#6366f133]" />

        <ul className="flex w-full flex-col gap-2.5">
          {tabs.map(tab => (
            <li
              key={tab.name}
              onClick={() => changeTab(tab.name)}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-left transition-all duration-200 ${
                activeTab === tab.name
                  ? 'border border-[#06b6d4]/20 bg-[#06b6d4]/10 text-[#06b6d4]'
                  : 'text-muted-foreground hover:bg-[#6366f1]/10 hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                {<tab.icon size={18} />}
                {tab.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
