import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth()

  if (loading) return <p>Carregando...</p>
  if (!isAuthenticated) return <Navigate to="/login" />

  return <Outlet />
}

export default ProtectedRoute
