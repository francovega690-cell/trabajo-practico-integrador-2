import { Navigate, Outlet } from 'react-router'
import Navbar from '../components/Navbar'

const PrivateRoutes = () => {
  const isLogged = localStorage.getItem('isLogged') === 'true'

  if (!isLogged) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default PrivateRoutes
