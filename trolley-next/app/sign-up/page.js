"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../../context/auth-context"
import { motion } from "framer-motion"
import { FiMail, FiLock, FiUser } from "react-icons/fi"

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [error, setError] = useState("")
  const { signUp } = useAuth()
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      await signUp(formData.name, formData.email, formData.password)
      router.push("/dashboard")
    } catch (err) {
      setError(err.message || "Sign up failed")
    }
  }

  return (
    <section className="relative flex items-center justify-center px-6 py-20">

      {/* ⭐ Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-200 -z-10"></div>
      <div className="absolute top-10 left-10 w-60 h-60 bg-blue-400/20 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-indigo-400/20 blur-[120px] rounded-full -z-10"></div>

      {/* ⭐ Main Sign-Up Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-white/40"
      >
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-900">
          Create Account
        </h1>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 font-medium text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Terms Checkbox */}
          <label className="flex items-center text-sm">
            <input type="checkbox" required className="mr-2" />
            I agree to the Terms of Service and Privacy Policy
          </label>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-md hover:shadow-blue-300/40"
          >
            Create Account
          </motion.button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-sm text-gray-700 mt-6">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </section>
  )
}
