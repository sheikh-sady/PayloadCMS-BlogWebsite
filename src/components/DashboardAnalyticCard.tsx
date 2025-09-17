import { ReactNode } from 'react'

export default function DashboardAnalyticCard({
  label,
  number,
  icon,
}: {
  label: string
  number: number
  icon: ReactNode
}) {
  return (
    <div className="flex-1 h-24 rounded-md shadow-xs bg-gray-200 flex justify-around items-center">
      <div className="flex flex-col gap-2 font-bold text-lg text-gray-600">
        <p>{label}</p>
        <p className="text-md">{number}</p>
      </div>
      <div>{icon}</div>
    </div>
  )
}
