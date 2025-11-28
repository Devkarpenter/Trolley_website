"use client";
import { useContext } from "react";
import Link from "next/link";
import { CartContext } from "../../context/cart-context";
import { AuthContext } from "../../context/auth-context";
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation" 

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const router = useRouter(); 

  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Start shopping now!</p>
          <Link href="/products" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg">
            <FiArrowLeft /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // ⭐ Prevent checkout if NOT logged in
  const handleCheckout = () => {
    if (!user) {
      alert("Please login before checking out");
      window.location.href = "/sign-in";
      return;
    }
    window.location.href = "/checkout?mode=cart";
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">

          {cart.map((item) => (
            <div key={item.id} className="border-b p-6 flex gap-4">

              {/* product image */}
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg"></div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>

                {/* Quantity */}
                <div className="flex items-center gap-2 mt-4">
                  <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}>
                    <FiMinus />
                  </button>

                  <span className="w-10 text-center font-semibold">{item.quantity || 1}</span>

                  <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}>
                    <FiPlus />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-xl font-bold">₹{item.price * (item.quantity || 1)}</p>

                <button onClick={() => removeFromCart(item.id)} className="text-red-600 mt-2">
                  <FiTrash2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}

        </div>

        <div className="bg-white rounded-lg shadow p-6 sticky top-20">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
          </div>

          <div className="flex justify-between border-t pt-4 text-xl font-bold mb-6">
            <span>Total</span>
            <span className="text-blue-600">₹{total}</span>
          </div>

          {/* ⭐ Checkout Button with Login Check */}
                    <button
            onClick={() => router.push("/checkout")}  // ⭐ FIX
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold mb-3"
          >
            Proceed to Checkout
          </button>


        </div>
      </div>
    </div>
  );
}
