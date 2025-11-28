"use client";

import React, { createContext, useState, useContext } from "react";
import { AuthContext } from "./auth-context";
import { useRouter } from "next/navigation";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  // ⭐ ADD TO CART (with login check)
  const addToCart = (product) => {
    if (!user) {
      alert("Please login before adding items to cart");
      router.push("/sign-in");
      return;
    }

    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found)
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ⭐ REMOVE ITEM
  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  // ⭐ UPDATE QUANTITY
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
