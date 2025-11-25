'use client'
import { useContext } from 'react'
import { CartContext } from '../context/cart-context'

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext)
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-gray-600">₹{product.price}</p>
      <button onClick={() => addToCart(product)} className="mt-3 bg-blue-600 text-white px-3 py-1 rounded">
        Add to cart
      </button>
    </div>
  )
}
