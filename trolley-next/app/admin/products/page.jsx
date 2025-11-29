"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth-context";
import { useRouter } from "next/navigation";

export default function AdminProducts() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user) return;
    if (user.role !== "admin") router.push("/");

    fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    const data = await res.json();
    setProducts(data.products || []);
  };

  const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");

    if (!confirm("Delete this product?")) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchProducts();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {products.map((p) => (
          <div key={p._id} className="bg-white p-5 border shadow rounded-xl">
            <h3 className="font-semibold text-xl">{p.name}</h3>
            <p>Price: ₹{p.price}</p>

            <button
              onClick={() => deleteProduct(p._id)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
