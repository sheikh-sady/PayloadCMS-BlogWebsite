'use client'

import { useState } from 'react'
import PlusIcon from './PlusIcon'
import { Button } from './ui/button'
import CategoryModal from './CategorForm'
import ModalComponent from './ModalComponent'
import CategoryForm from './CategorForm'

const AddCategory = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleSubmit = async () => {}
  return (
    <div>
      {!isOpen && (
        <Button onClick={() => setIsOpen(true)} className="h-12 flex-1 bg-gray-600">
          <div className="flex gap-3 items-center">
            <PlusIcon color="white" />
            <p>Add Category</p>
          </div>
        </Button>
      )}
      {isOpen && (
        <ModalComponent isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <CategoryForm onClose={()=> setIsOpen(false)}/>
        </ModalComponent>
      )}
    </div>
  )
}
export default AddCategory
