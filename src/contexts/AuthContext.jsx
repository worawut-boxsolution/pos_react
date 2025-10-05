// hosting/src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '@/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined) // undefined = ยังโหลด
  const [role, setRole] = useState(null)
  const [branchId, setBranchId] = useState(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        // ดึง role & branch จาก Firestore (หรือ claims)
        const token = await u.getIdTokenResult()
        setRole(token.claims.role || 'cashier')
        setBranchId(token.claims.branchId || '')
        setUser(u)
      } else {
        setUser(null)
        setRole(null)
        setBranchId(null)
      }
    })
    return unsub
  }, [])

  const logout = () => signOut(auth)

  return (
    <AuthContext.Provider value={{ user, role, branchId, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)