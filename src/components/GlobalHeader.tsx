'use client'
import { useEffect, useState } from 'react'
import HomePageAction from './HomePageAction'
import { CategoryType, PostType } from './PostCard'
import PostsGroup from './PostsGroup'
import { usePosts } from '@/context/postContext'
import FilteredResults from './FilteredResults'
import { usePathname } from 'next/navigation'

const GlobalHeader = () => {
  const { publishedPosts } = usePosts()
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>([])
  const [searchInput, setSearchInput] = useState<string>('')
  const [filterCategory, setFilterCategory] = useState<CategoryType | any>({ name: 'All' })

  useEffect(() => {
    let filtered = publishedPosts

    if (filterCategory.name !== 'All') {
      filtered = filtered.filter((p: PostType) => p.categories?.name === filterCategory.name)
    }

    if (searchInput.trim() !== '') {
      filtered = filtered.filter((p: PostType) =>
        p.title.toLowerCase().includes(searchInput.toLowerCase()),
      )
    }
    setFilteredPosts(filtered)
  }, [searchInput, filterCategory, publishedPosts])

  //console.log('FilteredPosts : ', filteredPosts)
  const pathName = usePathname()
  return (
    <>
      {!pathName.startsWith('/posts') && !pathName.startsWith('/auth') && (
        <div className="w-full flex flex-col gap-3">
          <HomePageAction
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />

          {(searchInput || filterCategory.name !== 'All') && (
            <div className="bg-white rounded-md h-[400px">
              {/* <PostsGroup filteredPosts={filteredPosts} /> */}
              <FilteredResults filteredPosts={filteredPosts} />
            </div>
          )}
        </div>
      )}
    </>
  )
}
export default GlobalHeader
