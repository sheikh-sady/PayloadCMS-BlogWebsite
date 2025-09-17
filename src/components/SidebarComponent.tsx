'use client'
import { useState } from 'react'
import HamburgerMenu from './HamburgerMenu'
import LogoIcon from './LogoIcon'
import Link from 'next/link'
import SidebarHeader from './SidebarHeader'
import DashboardIcon from './DashboardIcon'
import SettingsIcon from './SettingsIcon'
import ChatIcon from './ChatIcon'
import ProfileIcon from './ProfileIcon'
import AuthButton from './AuthButton'
import SidebarRoute from './SidebarRoute'
import SidebarRouteGroup from './SidebarRouteGroup'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <div onClick={() => setIsOpen(true)} className="fixed z-10 lg:hidden">
        <HamburgerMenu />
      </div>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="z-25 fixed inset-0 w-screen h-screen bg-black/50"
        ></div>
      )}

      <div className={`z-30 fixed lg:flex  ${isOpen ? 'flex' : 'hidden'}`}>
        <div className="p-2 text-white bg-gray-600 w-60 h-screen flex flex-col justify-evenly">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <LogoIcon />
              <p className="text-xl font-bold">Blogger</p>
            </div>
            <SidebarHeader />
          </div>
          {/* <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <DashboardIcon color="white" />
              <Link href="/dashboard" passHref>
                Dashboard
              </Link>
            </div>

            <div className="flex gap-2 items-center">
              <SettingsIcon color="white" />
              <Link href="/dashboard" passHref>
                Settings
              </Link>
            </div>

           
            <SidebarRoute
              icon={<ProfileIcon color="white" />}
              pathName="dashboard"
              label="Profile"
            />

            <div className="flex gap-2 items-center">
              <ChatIcon color="white" />
              <Link href="/dashboard" passHref>
                Message
              </Link>
            </div>
          </div> */}
          <SidebarRouteGroup />
          <AuthButton />
        </div>
      </div>
    </>
  )
}
export default Sidebar
