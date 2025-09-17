'use client'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import LoginPage from './LoginPage'
import { useUser } from '@/context/userContext'
import { a } from 'vitest/dist/chunks/suite.d.FvehnV49.js'
import ErrorMessage from '@/components/ErrorMessage'
import { hasOnlyDigits, hasSpecialChars } from '../services/validationService'
import Link from 'next/link'

const AuthPage = () => {
  const { refreshToken } = useUser()
  const [signInActive, setSignInActive] = useState(true)
  const [signUpActive, setSignUpActive] = useState(false)
  const [errorFirstName, setErrorFirstName] = useState<boolean>(false)
  const [errorLastName, setErrorLastName] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [secondName, setSecondName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  //const router = useRouter()

  useEffect(() => {
    if (hasSpecialChars(name) || hasOnlyDigits(name)) setErrorFirstName(true)
    else setErrorFirstName(false)
    if (hasSpecialChars(secondName) || hasOnlyDigits(secondName)) setErrorLastName(true)
    else setErrorLastName(false)
  }, [name, secondName])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const email = formData.get('email')
    const password = formData.get('password')

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    console.log('Response:', data)

    if (res.ok) {
      router.push('/')
    } else {
      alert('Error signing in...')
    }
    form.reset()
    setLoading(false)
    refreshToken()
  }
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const email = formData.get('email')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')
    if (password !== confirmPassword) {
      alert('passwords doesnot match')
      return
    }
    console.log(firstName, lastName, email, password, confirmPassword)
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    })
    const data = await res.json()
    console.log('Response:', data)

    if (res.ok) {
      alert('Succesfully signed up. Log in to your account')
      window.location.reload()
    } else alert('Error signing up...')
    form.reset()
    setLoading(false)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (signInActive) handleLogin(e)
    else handleRegister(e)
  }

  return (
    <div className="font-sans flex  justify-center">
      <div className="bg-white p-5 my-2 flex flex-col gap-6 items-center w-110 shadow-xl rounded-xl">
        <div className="p-2 flex flex-col gap-4 items-center">
          <div className="flex bg-gradient-to-r from-violet-600 to-cyan-600 justify-center items-center rounded-xl font-medium w-15 h-15 "></div>
          <p className="text-3xl text-gray-800 font-bold">Blogger</p>
          <p className=" text-gray-600">Write professional blogs,one at a time</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-2xl text-gray-800 font-bold">Welcome</p>
          <p className="text-sm text-gray-600">Sign to your account or create a new one</p>
        </div>
        <div className="px-0.5 w-full h-10 rounded-md flex justify-between items-center bg-gray-100 text-gray-600 font-medium text-sm">
          <div
            onClick={() => {
              setSignInActive(true)
              setSignUpActive(false)
            }}
            className={`p-2 h-9 rounded-sm hover:cursor-pointer flex flex-1 justify-center ${
              signInActive ? 'text-black bg-white' : ''
            }`}
          >
            Sign In
          </div>
          <div
            onClick={() => {
              setSignInActive(false)
              setSignUpActive(true)
            }}
            className={`p-2 h-9 rounded-sm hover:cursor-pointer flex flex-1 justify-center ${
              signUpActive ? 'text-black bg-white' : ''
            }`}
          >
            Sign Up
          </div>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col">
          {signInActive && (
            <div className="grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-800">Email</p>
                <Input
                  //   icon={<MessageIcon />}
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-800">Password</p>
                <Input
                  //   icon={<LockIcon />}
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                // label="Sign In"
                // properties="bg-gradient-to-r hover:from-violet-400 to-cyan-400 from-violet-600 to-cyan-600  text-sm font-medium"
              >
                {loading ? 'loading...' : 'Sign in'}
              </Button>
            </div>
          )}
          {signUpActive && (
            <div className="grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-800">First Name</p>
                <Input
                  //   icon={<ProfileIcon color="#94a3b8" />}
                  placeholder="Enter your first name"
                  type="text"
                  name="firstName"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errorFirstName && <ErrorMessage />}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-800">Last Name</p>
                <Input
                  //   icon={<ProfileIcon color="#94a3b8" />}
                  placeholder="Enter your last name"
                  type="text"
                  name="lastName"
                  value={secondName}
                  onChange={(e) => setSecondName(e.target.value)}
                  required
                />
                {errorLastName && <ErrorMessage />}
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-800">Email</p>
                <Input
                  //   icon={<MessageIcon />}
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-800">Create Password</p>
                <Input
                  //   icon={<LockIcon />}
                  placeholder="Enter a password"
                  type="password"
                  name="password"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-800">Confirm Password</p>
                <Input
                  //   icon={<LockIcon />}
                  placeholder="Confirm your password"
                  type="password"
                  name="confirmPassword"
                  required
                />
              </div>
              <Button
                onClick={(e) => console.log('clicked')}
                type="submit"
                disabled={errorFirstName || errorLastName || loading}
                // label="Create Account"
                // properties="bg-gradient-to-r hover:from-violet-400 to-cyan-400 from-violet-600 to-cyan-600  text-sm font-medium"
              >
                {loading ? 'loading...' : 'Sign up'}
              </Button>
            </div>
          )}
        </form>
        <p className="text-gray-600 text-sm text-center">
          Demo credentials: any email/password combination works for login after signup
        </p>
      </div>
    </div>
  )
}
export default AuthPage
