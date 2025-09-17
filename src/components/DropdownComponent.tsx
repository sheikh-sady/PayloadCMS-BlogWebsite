'use client'

import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Check } from 'lucide-react'
import { CategoryType } from './PostCard'

export default function DropdownComponent({
  caption,
  itemsArray,
  onSelect,
  selected,
  color,
}: {
  caption: string
  itemsArray: CategoryType[]
  onSelect: (value: CategoryType) => void
  selected?: CategoryType | null
  color?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={`min-w-20 sm:min-w-36 px-3 py-2 rounded-md ${color ? 'bg-gray-600 hover:bg-gray-700 text-gray-100' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} text-sm  `}
      >
        {selected?.name || caption}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Category</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {itemsArray.map((item) => (
          <DropdownMenuItem
            key={item.id}
            onClick={() => {
              onSelect(item)
              setOpen(false) // ✅ close dropdown after selecting
            }}
            className="flex items-center justify-between"
          >
            {item.name}
            {selected?.id === item.id && <Check className="h-4 w-4 text-green-600" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
