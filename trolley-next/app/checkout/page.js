"use client";

import { useContext } from "react";
import { CartContext } from "../../context/cart-context";
import { useAuth } from "../../context/auth-context";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart } = useContext(CartContext);
  const { user } = useAuth();
  const router = useRouter();

  // 🔐 If not logged in
  if (!user) {
    return (
      <div className="text-center py-20 text-xl">
        ❌ You must login first  
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-xl mt-4"
          onClick={() => router.push("/sign-in")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const handlePayment = async () => {
    // ⭐ 1. Razorpay SDK check
    if (typeof window === "undefined" || !window.Razorpay) {
      alert("Payment SDK not loaded. Please wait 1–2 seconds and try again.");
      return;
    }

    // ⭐ 2. Create order in backend
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/create-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ items: cart }),
      }
    );

    const data = await res.json();
    if (!data.success) {
      alert("Order creation failed.");
      return;
    }

    // ⭐ 3. Start Razorpay popup
    const options = {
      key: data.key, // razorpay test key
      amount: data.amount, // already in paise (backend returns correct value)
      currency: "INR",
      name: "Trolley Store",
      description: "Complete Secure Payment",
      order_id: data.orderId,

      handler: async function (response) {
        // ⭐ 4. Verify payment
        const verifyRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payment/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              items: cart,
              amount: total,
            }),
          }
        );

        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          router.push("/success");
        } else {
          alert("Payment verification failed!");
        }
      },

      theme: {
        color: "#0066ff",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-6">Total: ₹{total}</h2>

      <button
        onClick={handlePayment}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700"
      >
        Pay Now
      </button>
    </div>
  );
}
