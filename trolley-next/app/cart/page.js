'use client'
import { useContext } from 'react'
import Link from 'next/link'
import { CartContext } from '../../context/cart-context'
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft } from 'react-icons/fi'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext)

  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)

  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Start shopping to add items to your cart!</p>
          <Link href="/products" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            <FiArrowLeft /> Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {cart.map((item) => (
              <div key={item.id} className="border-b last:border-b-0 p-6 flex gap-4">
                {/* Product Image Placeholder */}
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl">🧳</span>
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">₹{item.price.toLocaleString()}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                    >
                      <FiMinus className="w-5 h-5" />
                    </button>
                    <span className="w-10 text-center font-semibold text-lg">{item.quantity || 1}</span>
                    <button
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                    >
                      <FiPlus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Price & Remove */}
                <div className="text-right flex flex-col items-end justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="text-xl font-bold">₹{(item.price * (item.quantity || 1)).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                  >
                    <FiTrash2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Link href="/products" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mt-6">
            <FiArrowLeft /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-20">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-semibold">₹{Math.round(total * 0.1).toLocaleString()}</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-blue-600">₹{Math.round(total * 1.1).toLocaleString()}</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold mb-3">
              Proceed to Checkout
            </button>

            <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:border-gray-400">
              Continue Shopping
            </button>

            {/* Promo Code */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600 mb-2">Have a promo code?</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
