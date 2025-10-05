// hosting/src/router/RoleRoute.jsx
import { useAuth } from '@/contexts'
import { Navigate } from 'react-router-dom'

export default function RoleRoute({ allowed = [], children }) {
  const { role } = useAuth()

  if (!allowed.includes(role)) return <Navigate to="/pos" replace />

  return children
}