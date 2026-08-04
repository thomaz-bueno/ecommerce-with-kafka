import { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';

interface CartItem {
  id: number
  product_id: number
  name: string
  price: string
  color: string
  size: string
  quantity: number
  is_liked: boolean
  image_url: string
}

interface CartContextType {
  items: CartItem[]
  fetchCart: () => void
}

const CartContext = createContext<CartContextType>({
    items: [],
    fetchCart: () => {},
})

export function CartProvider({ children }: { children: ReactNode }) {
    const { isAuthenticated } = useAuth()
    const [items, setItems] = useState<CartItem[]>([])

    function fetchCart() {
        const userId = localStorage.getItem('userId')
        if (!userId) return

        fetch('http://localhost:3000/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ id: userId }),
        })
            .then((res) => res.json())
            .then((data) => setItems(data))
            .catch(() => setItems([]))
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart()
        } else {
            setItems([])
        }
    }, [isAuthenticated])

    return (
        <CartContext.Provider value={{ items, fetchCart }}>
            { children }
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}
