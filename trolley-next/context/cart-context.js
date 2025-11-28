"use client";

import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "./auth-context";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // ⭐ Load saved cart from backend when user logs in
  useEffect(() => {
    if (!user) return;

    const fetchCart = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/get`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setCart(data.cart);
      }
    };

    fetchCart();
  }, [user]);


  // ⭐ Save to backend every time cart changes (if logged in)
  const syncToBackend = async (updatedCart) => {
    if (!user) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ items: updatedCart }),
    });
  };


  // ⭐ Add product
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      let updatedCart;
      if (exists) {
        updatedCart = prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prev, { ...product, quantity: 1 }];
      }

      syncToBackend(updatedCart);
      return updatedCart;
    });
  };


  // ⭐ Update quantity
  const updateQuantity = (id, quantity) => {
    let updatedCart;

    if (quantity <= 0) {
      updatedCart = cart.filter((item) => item.id !== id);
    } else {
      updatedCart = cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    }

    setCart(updatedCart);
    syncToBackend(updatedCart);
  };


  // ⭐ Remove item
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    syncToBackend(updatedCart);
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
