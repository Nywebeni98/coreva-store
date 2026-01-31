import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { CartItemWithProduct } from "@shared/schema";

interface CartContextType {
  items: CartItemWithProduct[];
  addToCart: (productId: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isLoading: boolean;
  totalItems: number;
  totalPrice: number;
  sessionId: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function getOrCreateSessionId(): string {
  const key = "coreva_session_id";
  let sessionId = localStorage.getItem(key);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(key, sessionId);
  }
  return sessionId;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItemWithProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(getOrCreateSessionId);

  const fetchCart = async () => {
    try {
      const res = await fetch(`/api/cart?sessionId=${sessionId}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [sessionId]);

  const addToCart = async (productId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, productId, quantity: 1 }),
      });
      if (res.ok) {
        await fetchCart();
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/cart/${cartItemId}`, { method: "DELETE" });
      if (res.ok) {
        await fetchCart();
      }
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(cartItemId);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`/api/cart/${cartItemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      if (res.ok) {
        await fetchCart();
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/cart/clear?sessionId=${sessionId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setItems([]);
      }
    } catch (error) {
      console.error("Failed to clear cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isLoading,
        totalItems,
        totalPrice,
        sessionId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
