'use client'
import { getCookie } from '@/context/userContext'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useCategories } from '@/context/categoryContext'
import { CategoryType } from './PostCard'

const CategoryForm = ({
  name,
  description,
  onClose,
  id,
}: {
  name?: string
  description?: string
  onClose: any
  id?: string
}) => {
  const token = getCookie('frontendToken')
  const { setCategories } = useCategories()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name')
    const desc = formData.get('description')
    const res = await fetch(`${id ? `/api/categories/${id}` : '/api/categories/'}`, {
      method: `${id ? 'PATCH' : 'POST'}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({ name, description: desc }),
    })
    const response = await res.json()
    console.log('post of category : ', response)
    if (res.ok) {
      if (!id) {
        alert('Category created')
        setCategories((prev: CategoryType[]) => [response.doc, ...prev])
      } else {
        alert('Category updated')
        setCategories((prev: CategoryType[]) =>
          prev.map((c: CategoryType) => (c.id === response.doc.id ? response.doc : c)),
        )
      }
    } else alert('Error creating category')

    form.reset()
    onClose()
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="p-2 bg-gray-200 shadow-xl rounded-md flex flex-col gap-3"
    >
      <p className="text-gray-600 text-lg font-semibold">
        {id ? 'Edit Category' : 'Create new category'}
      </p>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-gray-600">Name</p>
        <Input defaultValue={name} name="name" placeholder="Enter category name" />
      </div>

      <div className=" flex flex-col gap-2">
        <p className="text-xs font-semibold text-gray-600">Description</p>
        <Input
          defaultValue={description}
          name="description"
          placeholder="Enter category description"
        />
      </div>

      <div className=" flex gap-2">
        <Button type="submit" className="bg-gray-600 flex-1">
          Save
        </Button>
        <Button
          onClick={onClose}
          type="button"
          className="bg-gray-200 flex-1 hover:text-gray-100 text-gray-600"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
export default CategoryForm
