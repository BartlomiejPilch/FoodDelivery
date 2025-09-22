import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  date: string;
  day: string;
}

interface CartContextProps {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string, quantity?: number) => void;
  clearItem: (id: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: ()=> void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);


export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const clearCart = () => setCartItems([]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems(prev => {
      const existing = prev.find(ci => ci.id === item.id);
      if (existing) {
        return prev.map(ci =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId:any, quantity:any) => {
  setCartItems((prevItems) =>
    prevItems.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    )
  );
};


  const removeFromCart = (id: string, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(ci => ci.id === id);
      if (!existing) return prev;

      if (existing.quantity <= quantity) {
        // Remove completely
        return prev.filter(ci => ci.id !== id);
      }

      return prev.map(ci =>
        ci.id === id ? { ...ci, quantity: ci.quantity - quantity } : ci
      );
    });
  };

  const clearItem = (id: string) => {
    setCartItems(prev => prev.filter(ci => ci.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        clearItem,
        updateCartQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
