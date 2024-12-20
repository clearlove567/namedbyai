"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

type AuthContextType = {
  user: User | null
  remainingUsage: number
  signOut: () => Promise<void>
  updateRemainingUsage: () => Promise<number | null>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  remainingUsage: 0,
  signOut: async () => {},
  updateRemainingUsage: async () => null
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [remainingUsage, setRemainingUsage] = useState(0)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const updateRemainingUsage = async () => {
    try {
      if (!user?.id) {
        return null
      }

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const { count, error } = await supabase
        .from('usage_records')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id)
        .gte('used_at', today.toISOString())

      if (error) {
        console.error('Error getting usage count:', error)
        return null
      }

      const limit = Number(process.env.NEXT_PUBLIC_DAILY_LIMIT) || 3
      const remaining = Math.max(0, limit - (count || 0))
      setRemainingUsage(remaining)
      return remaining
    } catch (error) {
      console.error('Error updating usage:', error)
      return null
    }
  }

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const newUser = session?.user ?? null
        setUser(newUser)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (user) {
      updateRemainingUsage()
    }
  }, [user])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setRemainingUsage(0)
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, remainingUsage, signOut, updateRemainingUsage }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
} 