import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  type: 'room' | 'dining' | 'spa'
  id: string
  name: string
  price: number
  quantity: number
  date?: string
  options?: Record<string, string>
}

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item: CartItem) => {
        const currentItems = get().items
        const existingItemIndex = currentItems.findIndex(
          (i) => i.id === item.id && i.type === item.type && i.date === item.date
        )

        if (existingItemIndex > -1) {
          const updatedItems = [...currentItems]
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + item.quantity,
          }
          set({ items: updatedItems })
        } else {
          set({ items: [...currentItems, item] })
        }
      },
      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })
      },
      clearCart: () => {
        set({ items: [] })
      },
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)
