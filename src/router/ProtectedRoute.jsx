// hosting/src/router/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <p className="p-4">กำลังตรวจสิทธิ์...</p>
  if (!user) return <Navigate to="/login" replace />

  return children
}