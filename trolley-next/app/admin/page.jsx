"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  // Wait for user to load
  useEffect(() => {
    // Wait 200ms to allow AuthProvider to load localStorage
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl">
        Loading...
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="text-center py-20 text-xl">
        ❌ You must login first  
        <br />
        <button
          onClick={() => router.push("/sign-in")}
          className="mt-5 px-6 py-3 bg-blue-600 text-white rounded-xl"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Logged in but not admin
  if (user.role !== "admin") {
    return (
      <div className="text-center py-20 text-2xl">
        ❌ Access Denied — Admin Only
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        {/* Orders */}
        <div
          onClick={() => router.push("/admin/orders")}
          className="p-8 bg-blue-600 text-white rounded-xl cursor-pointer hover:bg-blue-700 transition shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-3">📦 Orders</h2>
          <p>Manage all customer orders</p>
        </div>

        {/* Users */}
        <div
          onClick={() => router.push("/admin/users")}
          className="p-8 bg-purple-600 text-white rounded-xl cursor-pointer hover:bg-purple-700 transition shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-3">👤 Users</h2>
          <p>View and manage users</p>
        </div>

        {/* Products */}
        <div
          onClick={() => router.push("/admin/products")}
          className="p-8 bg-green-600 text-white rounded-xl cursor-pointer hover:bg-green-700 transition shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-3">🛒 Products</h2>
          <p>Manage your product listings</p>
        </div>
      </div>
    </div>
  );
}
