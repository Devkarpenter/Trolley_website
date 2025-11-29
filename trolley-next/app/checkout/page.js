"use client";

import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/cart-context";
import { useAuth } from "../../context/auth-context";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, updateQuantity } = useContext(CartContext);
  const { user } = useAuth();
  const router = useRouter();

  const [shipping, setShipping] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    line1: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });

  useEffect(() => {
    if (user) {
      setShipping((s) => ({ ...s, name: user.name || s.name }));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="text-center py-20 text-xl">
        ❌ You must login first
        <br />
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-xl mt-4"
          onClick={() => router.push("/sign-in")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  const total = cart.reduce((s, i) => s + Number(i.price) * Number(i.quantity || 1), 0);

  const handlePayment = async () => {
    if (!shipping.name || !shipping.phone || !shipping.line1 || !shipping.city || !shipping.postal_code) {
      return alert("Please fill shipping name, phone, address, city and postal code");
    }

    // create order on server (will create razorpay order and a DB order record)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ items: cart, shippingAddress: shipping }),
    });

    const data = await res.json();
    if (!data.success) return alert("Failed to create order: " + (data.message || "Unknown"));

    // Prepare Razorpay options
    const options = {
      key: data.key,
      amount: Math.round(data.amount * 100),
      currency: "INR",
      name: "Trolley Store",
      order_id: data.orderId,
      handler: async function (response) {
        // send verify to server
        const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          }),
        });

        const verifyData = await verifyRes.json();
        if (!verifyData.success) {
          alert("Payment verification failed");
          return;
        }

        router.push("/success");
      },
      prefill: {
        name: shipping.name,
        email: user.email,
        contact: shipping.phone,
      },
    };

    // Load Razorpay script if not present
    if (!window.Razorpay) {
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(s);
      s.onload = () => {
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      s.onerror = () => alert("Razorpay SDK failed to load.");
    } else {
      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* LEFT: Shipping Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

          <div className="space-y-3">
            <input
              className="w-full px-3 py-2 border rounded"
              placeholder="Full name"
              value={shipping.name}
              onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
            />
            <input
              className="w-full px-3 py-2 border rounded"
              placeholder="Phone"
              value={shipping.phone}
              onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
            />
            <input
              className="w-full px-3 py-2 border rounded"
              placeholder="Address line 1"
              value={shipping.line1}
              onChange={(e) => setShipping({ ...shipping, line1: e.target.value })}
            />
            <input
              className="w-full px-3 py-2 border rounded"
              placeholder="City"
              value={shipping.city}
              onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
            />
            <input
              className="w-full px-3 py-2 border rounded"
              placeholder="State"
              value={shipping.state}
              onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
            />
            <input
              className="w-full px-3 py-2 border rounded"
              placeholder="Postal code"
              value={shipping.postal_code}
              onChange={(e) => setShipping({ ...shipping, postal_code: e.target.value })}
            />
            <input
              className="w-full px-3 py-2 border rounded"
              placeholder="Country"
              value={shipping.country}
              onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
            />
          </div>
        </div>

        {/* RIGHT: Order summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-3 mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handlePayment}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
