'use client'

import LoginPage from "./LoginPage"

const RegisterPage = () => {
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const email = formData.get('email')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')
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
    form.reset()
    if(res.ok)
    {
      return(
        <LoginPage/>
      )
    }
  }
  return (
    <form
      onSubmit={handleRegister}
      className="p-1 flex flex-col gap-3 border-2 border-black w-50 h-80"
    >
      <input name="firstName" placeholder="Enter First Name" />
      <input name="lastName" placeholder="Enter Last Name" />
      <input name="email" placeholder="Enter Email" />
      <input name="password" placeholder="Enter Password" />
      <input name="confirmPassword" placeholder="Confirm Password" />

      <button type="submit">Register</button>
    </form>
  )
}
export default RegisterPage
