// app/register/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    setError("")
    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    if (password.length < 6) {
      setError("Password needs to have at least 6 characters")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      })
      
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong")
        setLoading(false)
        return
      }

      // rejestracja ok -> przekieruj na login
      router.push("/login?registered=true")
    } catch (err) {
      console.log(err)
      setError("Error connection to the server")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 p-6 border rounded-lg">
        <h1 className="text-2xl font-bold">Rejestracja</h1>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Confirm password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white rounded py-2 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}