'use client'
import Link from 'next/link'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
const SidebarRoute = ({
  icon,
  pathName,
  label,
}: {
  icon: ReactNode
  pathName: string
  label: string
}) => {
  const path = usePathname()
  return (
    <div
      className={`p-1 hover:bg-gray-400 flex gap-5 items-center rounded-md ${`/${pathName}` === path ? 'bg-gray-400' : ''}`}
    >
      <div className="w-6 h-6">{icon}</div>
      <Link href={`/${pathName}`} passHref>
        <div>{label}</div>
      </Link>
    </div>
  )
}
export default SidebarRoute
