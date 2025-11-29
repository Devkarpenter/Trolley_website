"use client";

import { useAuth } from "../../context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    // ⭐ REDIRECT ADMINS
    if (user.role === "admin") {
      router.push("/admin");
    }
  }, [user]);

  if (!user) return <p className="p-10 text-center">Loading...</p>;

  if (user.role === "admin") {
    return <p className="p-10 text-center">Redirecting to Admin Panel...</p>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">My Dashboard</h1>

      {/* Your user dashboard UI here */}
    </div>
  );
}
