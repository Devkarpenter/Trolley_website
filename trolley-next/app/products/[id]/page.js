"use client"
import { useParams } from "next/navigation"
import { useContext } from "react"
import { CartContext } from "../../../context/cart-context"
import { motion } from "framer-motion"
import { FiStar } from "react-icons/fi"
import { products } from "../../data/product"   // ⭐ SHARED DATA

export default function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useContext(CartContext)

  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-xl font-semibold">
        Product Not Found
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* ⭐ Product Section */}
      <div className="grid md:grid-cols-2 gap-16 items-center">

        {/* Product Emoji / Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 backdrop-blur-xl p-10 h-80 rounded-2xl text-9xl flex items-center justify-center shadow-xl border border-gray-200"
        >
          {product.emoji}
        </motion.div>

        {/* Product Information */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

          {/* ⭐ Ratings */}
          <div className="flex items-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className="text-yellow-500" />
            ))}
            <span className="text-gray-600 ml-2">(245 Reviews)</span>
          </div>

          {/* ⭐ Price */}
          <p className="mt-4">
            <span className="bg-blue-600 text-white px-5 py-2 rounded-full text-lg font-semibold shadow-md">
              ₹{product.price}
            </span>
          </p>

          {/* ⭐ Description */}
          <p className="text-gray-700 mt-6 text-lg leading-relaxed">
            {product.description}
          </p>

          {/* ⭐ Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-blue-300 transition hover:scale-105"
            >
              Add to Cart
            </button>

            <button className="flex-1 border border-gray-400 py-3 rounded-xl font-semibold hover:border-black hover:scale-105 transition">
              Buy Now
            </button>
          </div>
        </motion.div>
      </div>

      {/* ⭐ Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-16 bg-white/70 backdrop-blur-xl p-10 rounded-2xl shadow-xl border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Product Features
        </h2>

        <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
          {product.features.map((feat, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-blue-600 text-xl">✔</span>
              {feat}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}
