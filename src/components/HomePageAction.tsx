'use client'
import { useEffect, useState } from 'react'
import FilterIcon from './FilterIcon'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { usePosts } from '@/context/postContext'
import { CategoryType, PostType } from './PostCard'
import DropdownComponent from './DropdownComponent'
import { useCategories } from '@/context/categoryContext'

export default function HomePageAction({
  searchInput,
  setSearchInput,
  filterCategory,
  setFilterCategory,
}: {
  searchInput: string
  setSearchInput: any
  filterCategory: CategoryType
  setFilterCategory: any
}) {
  const { categories } = useCategories()

  return (
    <div className="w-full flex gap-2">
      <Input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="flex-1 text-center"
        placeholder="Search blogs"
      />
      <div className="hidden p-1 rounded-md bg-gray-100 sm:flex items-center gap-2">
        <FilterIcon />
        <p className='text-md font-medium text-gray-600'>Category : </p>
      </div>
      <DropdownComponent 
          caption="Filter by category"
          itemsArray={[{name:"All"},...categories]}
          onSelect={(value) => setFilterCategory(value)}
          selected={filterCategory}
          color="gray"
        />
    </div>
  )
}
