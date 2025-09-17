'use client'
import { useUser } from '@/context/userContext'
import SidebarRoute from './SidebarRoute'
import DashboardIcon from './DashboardIcon'
import ProfileIcon from './ProfileIcon'
import SettingsIcon from './SettingsIcon'
import MessageIcon from './MessageIcon'
import ChatIcon from './ChatIcon'

const SidebarRouteGroup = () => {
  const { user } = useUser()
  return (
    <>
      {user && (
        <div className="flex flex-col gap-3">
          {user.role === 'author' && (
            <SidebarRoute
              icon={<DashboardIcon color="white" />}
              pathName="dashboard"
              label="Dashboard"
            />
          )}

          <SidebarRoute icon={<ProfileIcon color="white" />} pathName="profile" label="Profile" />
          <SidebarRoute
            icon={<SettingsIcon color="white" />}
            pathName="settings"
            label="Settings"
          />
          <SidebarRoute icon={<ChatIcon color="white" />} pathName="message" label="Message" />
        </div>
      )}
    </>
  )
}
export default SidebarRouteGroup
