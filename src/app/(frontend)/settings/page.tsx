'use client'

import DeleteIcon from '@/components/DeleteIcon'
import DownloadIcon from '@/components/DownloadIcon'
import DropdownComponent from '@/components/DropdownComponent'
import ExitIcon from '@/components/ExitIcon'
import MoonIcon from '@/components/MoonIcon'
import NotificationIcon from '@/components/NotificationIcon'
import { CategoryType } from '@/components/PostCard'
import ShieldIcon from '@/components/ShieldIcon'
import SunIcon from '@/components/SunIcon'
import UploadIcon from '@/components/UploadIcon'
import { useCategories } from '@/context/categoryContext'
import { useUser } from '@/context/userContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SettingsPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()
  const themeItems = [
    { label: 'Dark', icon: <MoonIcon /> },
    {
      label: 'Light',
      icon: <SunIcon />,
    },
  ]
  const [theme, setTheme] = useState<string>('Light')
  const { user, refreshToken } = useUser()
  const { categories } = useCategories()
  const [clicked, setClicked] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedCategories, setSelectedCategories] = useState<CategoryType | null>(null)
  const handleLogout = async () => {
    setLoading(true)
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
    refreshToken()
    router.push('/')
    setLoading(false)
  }
  return (
    <div className="bg-gradient-to-r from-violet-50 to-cyan-50 p-4 flex flex-col gap-5 font-sans text-gray-600">
      <div className="p-2 flex flex-col gap-3">
        <p className="text-2xl font-bold">Settings</p>
        <p className="text-md text-gray-500">Manage your account preferences and data</p>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-5">
        <div className="flex-1 p-8 flex flex-col gap-5 rounded-md shadow-xl">
          <div className="flex items-center gap-2 font-semibold text-gray-600 text-2xl">
            <NotificationIcon color="gray" />
            <p>Preferences</p>
          </div>
          <div className="flex justify-between gap-6">
            <div className="flex flex-1 flex-col gap-2">
              <p className="text-sm font-medium text-gray-600">Notifications</p>
              <p className="text-sm text-gray-500">Receive task reminders and updates</p>
            </div>
            <div
              onClick={() => setClicked((prev) => !prev)}
              className={`p-0.5 w-11 h-6 ${
                clicked ? 'bg-gray-600' : 'bg-gray-300'
              }  rounded-xl hover:cursor-pointer`}
            >
              <div
                className={`w-5 h-5 ${
                  clicked
                    ? 'transform translate-x-full duration-200 '
                    : 'transform translate-x-0 duration-200'
                }  bg-white rounded-full`}
              ></div>
            </div>
          </div>
          <hr className="border-gray-300" />
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Theme</p>
            <div className="p-2 flex flex-1 flex-col gap-2 text-sm">
              {themeItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setTheme(item.label)}
                  className={`hover:cursor-pointer flex items-center justify-between gap-3 px-3 py-2 rounded-md font-medium transition-colors
                ${
                  theme === item.label ? 'bg-gray-600 text-white' : 'hover:bg-gray-200 text-gray-700'
                }`}
                >
                  <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Default Category</p>
            <DropdownComponent
              caption="Default Category"
              itemsArray={categories}
              selected={selectedCategories}
              onSelect={(value) => setSelectedCategories(value)}
            />
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col gap-3  items-start rounded-md shadow-xl">
          <div className="mt-5 flex items-center gap-3 font-semibold text-gray-600 text-2xl">
            <ShieldIcon />
            <p>Data Management</p>
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="text-sm flex flex-col gap-2">
              <p className="font-medium text-gray-600">Export Data</p>
              <p className="text-gray-500">Download all your tasks and categories</p>
            </div>
            <div className="p-2 border-1 border-gray-300 rounded-lg flex gap-3 justify-center items-center hover:cursor-pointer hover:bg-gray-100">
              <DownloadIcon />
              <p className="font-medium text-sm">Export Data</p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-1">
            <div className="text-sm flex flex-col gap-2">
              <p className="font-medium text-gray-600">Import Data</p>
              <p className="text-gray-500">Import tasks from a backup file</p>
            </div>
            <div className="p-2 border-1 border-gray-300 rounded-lg flex gap-3 justify-center items-center ">
              <UploadIcon />
              <p className="font-medium text-sm">Import Data (coming soon)</p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-1">
            <div className="text-sm flex flex-col gap-2">
              <p className="font-medium text-red-400">Clear All Data</p>
              <p className="text-gray-500">Remove all tasks and categories</p>
            </div>
            <div className="p-2 border-1 border-gray-300 rounded-lg flex gap-3 justify-center items-center hover:cursor-pointer hover:bg-red-100 hover:text-red-400">
              <DeleteIcon color="bg-red-400" />
              <p className="font-medium text-sm ">Clear All Data</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 w-full flex flex-col gap-4 rounded-lg shadow-xl bg-gradient-to-r from-white to-red-50">
        <div className="flex items-center gap-3 font-semibold text-gray-600 text-2xl">
          <ExitIcon color="gray" />
          <p>Account Action</p>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4">
          <div className="w-full flex flex-col gap-1">
            <div className="text-sm flex flex-col gap-2">
              <p className="font-medium text-gray-600">Sign Out</p>
              <p className="text-gray-500">Sign out of your account</p>
            </div>
            <div
              onClick={() => {
                handleLogout()
              }}
              className={`${loading ? 'pointer-events-none' : ''}p-2 border-1 border-gray-300 rounded-lg flex gap-3 justify-center items-center hover:cursor-pointer hover:bg-gray-100`}
            >
              <ExitIcon color="black" />
              <p className="font-medium text-sm">{loading?"Signing out":"Sign out"}</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="text-sm flex flex-col gap-2">
              <p className="font-medium text-red-400">Delete Account</p>
              <p className="text-gray-500">Permanently delete your account and all data</p>
            </div>
            <div className="p-2 border-1 border-gray-300 rounded-lg flex gap-3 justify-center items-center hover:cursor-pointer hover:bg-red-100 hover:text-red-400">
              <DeleteIcon />
              <p className="font-medium text-sm">Delete Account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SettingsPage
