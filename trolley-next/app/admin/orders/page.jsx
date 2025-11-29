"use client";

import { useAuth } from "../../../context/auth-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminOrders() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    if (user.role !== "admin") router.push("/");

    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setOrders(data.orders || []);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      {orders.length === 0 && <p>No orders found.</p>}

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="p-5 bg-white shadow rounded-xl border">
            
            {/* Order ID */}
            <p className="font-semibold text-lg">
              Order ID: <span className="text-blue-600">{order._id}</span>
            </p>

            {/* User */}
            <p className="mt-1">
              <strong>User:</strong>{" "}
              {order.user ? `${order.user.name} (${order.user.email})` : "Guest"}
            </p>

            {/* Amount */}
            <p>
              <strong>Total Amount:</strong> ₹{order.amount}
            </p>

            {/* Status */}
            <p>
              <strong>Status:</strong> {order.status}
            </p>

            {/* Items */}
            <div className="mt-3">
              <h3 className="font-medium mb-1">Items:</h3>
              {order.items.map((item, idx) => (
                <p key={idx}>
                  {item.name} × {item.quantity} — ₹{item.price}
                </p>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
