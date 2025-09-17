'use client'
import { ReactNode, useEffect } from 'react'

const ModalComponent = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean
  onClose: any
  children: ReactNode
}) => {
//   useEffect(() => {
//     if (isOpen) document.body.style.overflow = 'hidden'
//     else document.body.style.overflow = ''
//     return () => (document.body.style.overflow = '')
//   }, [isOpen])
  return (
    <>
      {isOpen && (
        <div
          role="region"
          onClick={onClose}
          className="fixed flex justify-center items-center inset-0 w-screen h-screen bg-black/50 z-50 overflow-hidden"
        >
          <div
            role="dialog"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 relative z-10 max-w-[500px] p-4 rounded-lg shadow-xl bg-gray-200"
          >
            {children}
          </div>
        </div>
      )}
    </>
  )
}
export default ModalComponent
