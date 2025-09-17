import { useEffect, useState } from 'react'
import HomePageAction from './HomePageAction'
import { CategoryType, PostType } from './PostCard'
import PostsGroup from './PostsGroup'
import { usePosts } from '@/context/postContext'

export default function HomePageBody({}: {}) {
  const { publishedPosts } = usePosts()
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>([])
  const [searchInput, setSearchInput] = useState<string>('')
  const [filterCategory, setFilterCategory] = useState<CategoryType | any>({ name: 'All' })

  

  //console.log('FilteredPosts : ', filteredPosts)

  return (
    <div className="w-full flex flex-col gap-3">
      {/* <HomePageAction
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      /> */}

      <PostsGroup/>
    </div>
  )
}
