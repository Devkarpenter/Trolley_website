"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../../context/auth-context"
import { motion } from "framer-motion"
import { FiMail, FiLock } from "react-icons/fi"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }
    try {
      await signIn(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError(err.message || "Sign in failed")
    }
  }

  return (
    <section className="relative flex items-center justify-center px-6 py-20">

      {/* ⭐ Background Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-200 -z-10"></div>
      <div className="absolute top-10 left-10 w-60 h-60 bg-blue-400/20 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-indigo-400/20 blur-[120px] rounded-full -z-10"></div>

      {/* ⭐ Sign-in Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-10 border border-white/40"
      >
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Welcome Back 👋
        </h1>

        {/* Error Box */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm font-medium"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email Input */}
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError("")
              }}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError("")
              }}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              required
            />
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              Remember me
            </label>

            <Link
              href="#"
              className="text-blue-600 hover:underline font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-blue-300/30 transition"
          >
            Sign In
          </motion.button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-700 mt-6 text-sm">
          Don't have an account?{" "}
          <Link
            href="/sign-up"
            className="text-blue-600 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </motion.div>
    </section>
  )
}
