import { logout } from '@/app/services/auth.service'
import { useAuthStore } from '@/app/stores/auth-store'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import type { Tab } from '@/shared/components/Navbar'
import { useNavigate } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'

interface Props {
  tabs: Tab[]
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const ProfileNavbar = ({ tabs, activeTab, setActiveTab }: Props) => {
  const navigate = useNavigate()
  const user = useAuthStore(state => state.user)

  const avatarInitials = () => {
    if (!user) return 'NA'
    const names = user.name.split(' ')
    const initials =
      names.length === 1
        ? names[0].charAt(0)
        : names[0].charAt(0) + names[1].charAt(0)
    return initials.toUpperCase()
  }

  const changeTab = (tab: string) => {
    setActiveTab(tab)
  }

  const handleLogout = () => {
    logout()
    navigate({ to: '/' })
  }

  return (
    <Card>
      <div className="flex w-[18rem] flex-col items-center gap-4 p-6">
        <div className="flex h-18 w-18 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 p-4 font-bold text-white">
          {avatarInitials()}
        </div>

        <h2> {user?.name} </h2>
        <span className="text-sm text-gray-400">Commander</span>
        <span className="text-sm text-cyan-400"> {user?.id} </span>

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

        <hr className="mb-4 h-px w-full border-[#6366f133]" />

        <Button
          variant="text"
          className="w-full gap-5 !text-destructive hover:!bg-destructive/10 hover:!text-destructive"
          onClick={handleLogout}
        >
          Cerrar Sesión
          <LogOut />
        </Button>
      </div>
    </Card>
  )
}
