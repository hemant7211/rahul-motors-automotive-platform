
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("rahulCart") || "[]");
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart change hone par localStorage update hoga
  useEffect(() => {
    localStorage.setItem("rahulCart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Product ko cart mein add karna
  function addToCart(product) {
    if (product.stock <= 0) {
      alert("Sorry, this product is out of stock.");
      return;
    }

    const existing = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.category === product.category
    );

    if (existing) {
      if (existing.quantity >= product.stock) {
        alert("Maximum available stock already added.");
        return;
      }

      setCartItems((items) =>
        items.map((item) =>
          item.id === product.id &&
          item.category === product.category
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((items) => [
        ...items,
        { ...product, quantity: 1 },
      ]);
    }

    setIsCartOpen(true);
  }

  // Quantity increase/decrease karna
  function updateQuantity(id, category, change) {
    setCartItems((items) =>
      items
        .map((item) => {
          if (item.id === id && item.category === category) {
            const quantity = Math.min(
              item.stock,
              item.quantity + change
            );

            return { ...item, quantity };
          }

          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  }

  // Cart se product remove karna
  function removeFromCart(id, category) {
    setCartItems((items) =>
      items.filter(
        (item) =>
          !(item.id === id && item.category === category)
      )
    );
  }

  // Total quantity aur price
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
