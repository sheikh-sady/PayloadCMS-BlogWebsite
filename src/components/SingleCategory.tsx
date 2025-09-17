'use client'
import { CategoryType } from './PostCard'
import PlusIcon from './PlusIcon'
import EditIcon from './EditIcon'
import DeleteIcon from './DeleteIcon'
import TagIcon from './TagIcon'
import { useState } from 'react'
import ModalComponent from './ModalComponent'
import CategoryForm from './CategorForm'
import { getCookie } from '@/context/userContext'
import { useCategories } from '@/context/categoryContext'
export default function SingleCategory({ category }: { category: CategoryType }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const token = getCookie('frontendToken')
  const { setCategories } = useCategories()
  const handleDelete = async () => {
    const res = await fetch(`/api/categories/${category.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })
    if (res.ok) {
      alert('Category deleted')
      setCategories((prev: CategoryType[]) =>
        prev.filter((c: CategoryType) => c.id !== category.id),
      )
    }
  }
  return (
    <>
      {isOpen ? (
        <ModalComponent isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <CategoryForm
            onClose={() => setIsOpen(false)}
            name={category.name}
            description={category.description}
            id={category.id}
          />
        </ModalComponent>
      ) : (
        <div className="p-4 bg-gray-200 rounded-md items-center flex flex-col gap-2">
          <div className="w-full flex gap-2">
            <div className="flex-1">
              {/* <PlusIcon color="gray" /> */}
              <TagIcon width='35px' height='35px' color='gray'/>
            </div>
            <p className="flex-1 text-gray-600 text-lg font-semibold">{category.name}</p>
            <div className=" flex items-center justify-between gap-2">
              <div onClick={() => setIsOpen(true)} className="flex-1">
                <EditIcon color="gray" />
              </div>

              <div onClick={() => handleDelete()} className="flex-1">
                <DeleteIcon color="red" />
              </div>
            </div>
          </div>
          <div className="w-full flex-1 text-gray-600 text-sm font-medium">
            {category.description}
          </div>
        </div>
      )}
    </>
  )
}
