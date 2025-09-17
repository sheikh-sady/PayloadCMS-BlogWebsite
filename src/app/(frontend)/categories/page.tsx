import AddCategory from '@/components/AddCategory'
import CategoryGroup from '@/components/CategoryGroup'

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex justify-between gap-3">
        <p className="text-xl text-gray-600 font-semibold"> Categories</p>
        <AddCategory/>
      </div>
      <CategoryGroup />
    </div>
  )
}
