import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  membershipLevel: 'classic' | 'gold' | 'platinum' | 'diamond'
  points: number
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000))

          if (email && password) {
            const mockUser: User = {
              id: crypto.randomUUID(),
              name: email.split('@')[0],
              email,
              membershipLevel: 'gold',
              points: 15000,
            }
            set({ user: mockUser, isAuthenticated: true, isLoading: false })
          } else {
            throw new Error('Invalid credentials')
          }
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
