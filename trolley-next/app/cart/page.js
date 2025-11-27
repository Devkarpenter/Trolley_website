"use client"
import { useContext } from "react"
import Link from "next/link"
import { CartContext } from "../../context/cart-context"
import { motion } from "framer-motion"

import {
  FiTrash2,
  FiPlus,
  FiMinus,
  FiArrowLeft,
} from "react-icons/fi"

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext)

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  )

  // Empty Cart UI
  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-10 text-center">
        <div className="text-7xl mb-4">🛒</div>
        <h1 className="text-4xl font-extrabold mb-3">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Start shopping to fill your cart!</p>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          <FiArrowLeft /> Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* Page Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold mb-12"
      >
        Shopping Cart
      </motion.h1>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* ⭐ Cart Items Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl overflow-hidden">

            {cart.map((item) => (
              <div
                key={item.id}
                className="border-b last:border-b-0 p-6 flex gap-5"
              >
                {/* Product image / emoji */}
                <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <span className="text-5xl">{item.emoji || "🧳"}</span>
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-600 mb-4">
                    ₹{item.price.toLocaleString()}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, (item.quantity || 1) - 1)
                      }
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                    >
                      <FiMinus className="w-5 h-5" />
                    </button>

                    <span className="text-lg font-bold w-10 text-center">
                      {item.quantity || 1}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, (item.quantity || 1) + 1)
                      }
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                    >
                      <FiPlus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Subtotal + Remove */}
                <div className="text-right flex flex-col justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Subtotal</p>
                    <p className="text-xl font-bold">
                      ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <FiTrash2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mt-6"
          >
            <FiArrowLeft /> Continue Shopping
          </Link>
        </motion.div>

        {/* ⭐ Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl p-8 sticky top-24">

            <h2 className="text-3xl font-bold mb-8">Order Summary</h2>

            {/* Summary Values */}
            <div className="space-y-4 mb-6">
              <SummaryRow label="Subtotal" value={`₹${total.toLocaleString()}`} />
              <SummaryRow label="Shipping" value="Free" highlight />
              <SummaryRow label="Tax (10%)" value={`₹${Math.round(total * 0.1).toLocaleString()}`} />
            </div>

            {/* Final Total */}
            <div className="border-t pt-5 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">Total</span>
                <span className="text-3xl font-extrabold text-blue-600">
                  ₹{Math.round(total * 1.1).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 mb-4 shadow">
              Proceed to Checkout
            </button>

            <Link
              href="/products"
              className="block w-full text-center border border-gray-300 py-3 rounded-xl font-semibold hover:border-gray-400"
            >
              Continue Shopping
            </Link>

            {/* ⭐ Promo Code */}
            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-gray-600 mb-2">Have a promo code?</p>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold">
                  Apply
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ⭐ Reusable Summary Row Component */
function SummaryRow({ label, value, highlight }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className={`font-semibold ${highlight ? "text-green-600" : ""}`}>
        {value}
      </span>
    </div>
  )
}
