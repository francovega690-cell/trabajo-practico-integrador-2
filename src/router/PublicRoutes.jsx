import { Navigate, Outlet } from 'react-router'

const PublicRoutes = () => {
  const isLogged = localStorage.getItem('isLogged') === 'true'

  if (isLogged) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default PublicRoutes
