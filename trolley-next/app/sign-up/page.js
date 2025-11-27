"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { FiMail, FiLock, FiUser } from "react-icons/fi"
import { useAuth } from "../../context/auth-context"

export default function SignUp() {
  const router = useRouter()
  const { signUp, googleLogin } = useAuth()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword)
      return setError("Passwords do not match")

    try {
      await signUp(formData.name, formData.email, formData.password)
      router.push("/dashboard")
    } catch (err) {
      setError(err.message)
    }
  }

  const handleGoogleResponse = async (res) => {
    try {
      await googleLogin(res.credential)
      router.push("/dashboard")
    } catch {
      setError("Google login failed")
    }
  }

  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      })

      google.accounts.id.renderButton(
        document.getElementById("googleSignUpDiv"),
        { theme: "filled_blue", size: "large", width: "100%" }
      )
    }
  }, [])

  return (
    <section className="flex items-center justify-center px-6 py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/80 p-10 rounded-2xl shadow-xl backdrop-blur-xl"
      >
        <h1 className="text-4xl font-extrabold text-center mb-8">Create Account</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 rounded-xl border"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-xl border"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>

          <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="px-4 text-gray-500">OR</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>

        {/* ⭐ GOOGLE SIGN UP */}
        <div id="googleSignUpDiv" className="w-full flex justify-center"></div>

        <p className="text-center text-gray-700 mt-6">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-600 font-semibold">
            Sign In
          </Link>
        </p>
      </motion.div>
    </section>
  )
}
