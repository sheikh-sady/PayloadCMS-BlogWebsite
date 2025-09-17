'use client'
import { useUser } from '../../../context/userContext' // adjust the path

const LoginPage = () => {
  const { refreshToken } = useUser() // get the refresh function

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
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

    if (data.success) {
      // ✅ Update token and user state after login
      
    }

    form.reset()
    refreshToken()
  }

  return (
    <form
      onSubmit={handleLogin}
      className="p-1 flex flex-col gap-3 border-2 border-black w-50 h-80"
    >
      <input name="email" placeholder="Enter Email" />
      <input name="password" placeholder="Enter Password" type="password" />

      <button type="submit">Login</button>
    </form>
  )
}

export default LoginPage
