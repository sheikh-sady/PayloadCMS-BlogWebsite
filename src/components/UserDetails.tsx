'use client'
import { getCookie, useUser } from '@/context/userContext'
import { Input } from './ui/input'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { MediaType } from './PostCard'
import imageCompression from 'browser-image-compression'
import {
  hasOnlyDigits,
  hasSpecialChars,
  isEmpty,
} from '@/app/(frontend)/services/validationService'
import ErrorMessage from './ErrorMessage'

export default function UserDetails() {
  const { user, setUser } = useUser()
  useEffect(() => {
    if (!user) return
    setFirstName(user.firstName)
    setLastName(user.lastName)
  }, [user])
  const token = getCookie('frontendToken')
  const [editable, setEditable] = useState<boolean>(false)
  const [firstName, setFirstName] = useState<string>(user?.firstName)
  const [lastName, setLastName] = useState<string>(user?.lastName)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [errorFirstName, setErrorFirstName] = useState<boolean>(false)
  const [errorLastName, setErrorLastName] = useState<boolean>(false)

  useEffect(() => {
    if (hasSpecialChars(firstName) || isEmpty(firstName) || hasOnlyDigits(firstName))
      setErrorFirstName(true)
    else setErrorFirstName(false)

    if (hasSpecialChars(lastName) || isEmpty(lastName) || hasOnlyDigits(lastName))
      setErrorLastName(true)
    else setErrorLastName(false)
  }, [firstName, lastName])

  const handleSave = async () => {
    setIsSaving(true)
    if (!firstName || !lastName) {
      alert('First name and last name are required')
      return
    }
    if (firstName === user?.firstName && lastName === user?.lastName && !selectedFile) {
      alert('Nothing changed')
      return
    }

    let imageData: MediaType | null = user?.avatar

    // ✅ Upload new image if selected
    if (selectedFile && selectedFile.size > 0) {
      const compressedImage = await imageCompression(selectedFile, {
        maxSizeMB: 0.2, // maximum size in MB
        maxWidthOrHeight: 1200, // resize if larger
        useWebWorker: true, // use a web worker for performance
      })
      const imageForm = new FormData()
      imageForm.append('file', selectedFile)
      const imageRes = await fetch('/api/media', {
        method: 'POST',
        headers: {
          Authorization: `JWT ${token}`,
        },
        body: imageForm,
      })
      const imageResponse = await imageRes.json()
      imageData = imageResponse.doc
      console.log('user update image response : ', imageResponse)
    }

    const userBody = {
      firstName,
      lastName,
      avatar: imageData?.id,
    }
    const res = await fetch(`api/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(userBody),
    })
    const response = await res.json()
    console.log('user update response : ', response)
    setUser(response.doc)

    setEditable(false)
    setSelectedFile(null)
    setIsSaving(false)
  }

  const handleCancel = () => {
    setFirstName(user?.firstName ?? '')
    setLastName(user?.lastName ?? '')
    setSelectedFile(null)
    setEditable(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <p className="text-2xl font-semibold text-gray-600">Profile Information</p>
        {!editable ? (
          <Button onClick={() => setEditable(true)} className="bg-gray-600">
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button disabled={isSaving} onClick={handleCancel} variant="destructive" type="button">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gray-600"
              disabled={isSaving || errorFirstName || errorLastName}
              type="button"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-col gap-2">
          <p className="text-xs text-gray-600 font-bold">First Name</p>
          <Input
            aria-label="First Name"
            className="flex-1 min-h-8 border-black"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={!editable}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs text-gray-600 font-bold">Last Name</p>
          <Input
            aria-label="Last Name"
            className="flex-1 min-h-8 border-black"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={!editable}
          />
        </div>
      </div>
      {(errorLastName || errorFirstName) && <ErrorMessage />}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-600 font-bold">Email</p>
        <Input
          aria-label="Email"
          className="flex-1 min-h-8 border-black"
          value={user?.email ?? ''}
          disabled
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-600 font-bold">Role</p>
        <Input
          aria-label="Role"
          className="flex-1 min-h-8 border-black"
          value={user?.role ?? ''}
          disabled
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-600 font-bold">Change Avatar</p>
        <Input
          type="file"
          name="avatar"
          accept="image/*"
          className="flex-1 min-h-8 border-black"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          disabled={!editable}
        />
      </div>
    </div>
  )
}
