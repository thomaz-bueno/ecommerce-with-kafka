import { createContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = localStorage.getItem('userId')
    const name = localStorage.getItem('userName')

    if (id && name) {
      setUser({ id, name })
    } else {
      setUser(null)
    }

    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}
