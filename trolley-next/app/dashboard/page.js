"use client"
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../../context/auth-context'
import { motion } from "framer-motion"

import {
  FiLogOut,
  FiUser,
  FiPackage,
  FiMapPin,
  FiCreditCard,
  FiEdit
} from 'react-icons/fi'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You must be logged in to view your dashboard.</p>
          <Link href="/sign-in" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
            Sign In
          </Link>
        </motion.div>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  // Sample Orders
  const orders = [
    { id: 1, date: '2025-11-20', total: 5499, status: 'Delivered', items: 2 },
    { id: 2, date: '2025-11-15', total: 2999, status: 'In Transit', items: 1 },
    { id: 3, date: '2025-11-10', total: 7998, status: 'Delivered', items: 3 },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 relative">

      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-white blur-sm"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-extrabold text-gray-900"
        >
          My Dashboard
        </motion.h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-xl shadow hover:bg-red-700"
        >
          <FiLogOut /> Logout
        </motion.button>
      </div>

      {/* Profile + Stats */}
      <div className="grid md:grid-cols-3 gap-10 mb-16">

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-gray-200"
        >
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-md mb-4">
              <FiUser className="text-white text-4xl" />
            </div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>

            <button className="mt-5 w-full bg-blue-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition">
              <FiEdit /> Edit Profile
            </button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="md:col-span-2 grid grid-cols-2 gap-6">

          {/* Total Orders */}
          <StatBox
            icon={<FiPackage className="w-7 h-7 text-blue-600" />}
            label="Total Orders"
            value="3"
            bg="bg-blue-100"
          />

          {/* Total Spent */}
          <StatBox
            icon={<FiCreditCard className="w-7 h-7 text-green-600" />}
            label="Total Spent"
            value="₹16,496"
            bg="bg-green-100"
          />

          {/* Addresses */}
          <StatBox
            icon={<FiMapPin className="w-7 h-7 text-purple-600" />}
            label="Addresses Saved"
            value="1"
            bg="bg-purple-100"
          />

          {/* In Transit */}
          <StatBox
            icon={<span className="text-3xl">📦</span>}
            label="In Transit"
            value="1"
            bg="bg-orange-100"
          />

        </div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 mb-16"
      >
        <div className="p-6 border-b">
          <h3 className="text-2xl font-bold">Recent Orders</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                {["Order ID", "Date", "Items", "Total", "Status", "Action"].map((head) => (
                  <th key={head} className="px-6 py-3 text-sm font-semibold text-gray-700">{head}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-semibold">#{order.id}</td>
                  <td className="px-6 py-4 text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 text-gray-600">{order.items} item(s)</td>
                  <td className="px-6 py-4 font-semibold">₹{order.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'In Transit'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 font-semibold">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Account Settings */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* Shipping Address */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-gray-200"
        >
          <h3 className="text-2xl font-bold mb-4">Shipping Address</h3>

          <div className="space-y-2 mb-5">
            <p className="font-semibold">{user.name}</p>
            <p className="text-gray-600">123 Travel Street</p>
            <p className="text-gray-600">City, State 12345</p>
            <p className="text-gray-600">+1 234 567 890</p>
          </div>

          <button className="w-full border-2 border-blue-600 text-blue-600 py-2 rounded-xl hover:bg-blue-50 font-semibold">
            Edit Address
          </button>
        </motion.div>

        {/* Account Settings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-gray-200"
        >
          <h3 className="text-2xl font-bold mb-4">Account Settings</h3>

          <div className="space-y-3">
            {["Change Password", "Email Preferences", "Security Settings"].map((label) => (
              <button
                key={label}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 font-medium"
              >
                {label}
              </button>
            ))}

            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 font-medium">
              Delete Account
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ⭐ Reusable StatBox Component */
function StatBox({ icon, label, value, bg }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/80 backdrop-blur-xl rounded-xl p-6 flex items-center gap-5 border border-gray-200 shadow"
    >
      <div className={`w-14 h-14 ${bg} rounded-lg flex items-center justify-center`}>
        {icon}
      </div>

      <div>
        <p className="text-gray-600 text-sm">{label}</p>
        <h4 className="text-2xl font-bold">{value}</h4>
      </div>
    </motion.div>
  )
}
