import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ProfileType } from '@/data/types';
import { getProduct } from '@/data/mock';

interface CartItem {
  productId: string;
  qty: number;
}

interface User {
  name: string;
  email: string;
  profile: ProfileType;
}

interface StoreState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;

  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;

  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const StoreContext = createContext<StoreState | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>(['pr4']);
  const [cart, setCart] = useState<CartItem[]>([]);

  const login = useCallback((u: User) => setUser(u), []);
  const logout = useCallback(() => setUser(null), []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);
  const toggleFavorite = useCallback(
    (id: string) =>
      setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id])),
    []
  );

  const addToCart = useCallback((productId: string, qty: number) => {
    setCart((prev) => {
      const found = prev.find((c) => c.productId === productId);
      if (found) {
        return prev.map((c) => (c.productId === productId ? { ...c, qty: c.qty + qty } : c));
      }
      return [...prev, { productId, qty }];
    });
  }, []);

  const removeFromCart = useCallback(
    (productId: string) => setCart((prev) => prev.filter((c) => c.productId !== productId)),
    []
  );
  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = useMemo(() => cart.reduce((s, c) => s + c.qty, 0), [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((s, c) => s + getProduct(c.productId).price * c.qty, 0),
    [cart]
  );

  const value: StoreState = {
    user,
    login,
    logout,
    favorites,
    isFavorite,
    toggleFavorite,
    cart,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
