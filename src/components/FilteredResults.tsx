import FilteredItem from './FilteredItem'
import { PostType } from './PostCard'

const FilteredResults = ({ filteredPosts }: { filteredPosts: PostType[] }) => {
  return (
    <div className="p-2 flex flex-col gap-2">
      {filteredPosts.map((p: PostType) => (
        <FilteredItem post={p} />
      ))}
    </div>
  )
}
export default FilteredResults
