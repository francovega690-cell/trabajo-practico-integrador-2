import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

const LOGOUT_URL = 'http://localhost:5501/api/auth/logout'

const Navbar = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogout = async () => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const response = await fetch(LOGOUT_URL, {
        method: 'POST',
        credentials: 'include',
      })

      if (response.ok || response.status === 401) {
        localStorage.removeItem('isLogged')
        navigate('/login', {
          replace: true,
          state: { successMessage: 'Cerraste sesión correctamente.' },
        })
        return
      }

      if (response.status === 403) {
        setErrorMessage('No tenés permisos para realizar esta acción.')
        return
      }

      setErrorMessage('No se pudo cerrar la sesión. Intentá más tarde.')
    } catch {
      setErrorMessage('No se pudo conectar con el servidor.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="text-lg font-bold text-indigo-600 sm:text-xl">
          Blog Personal
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Inicio
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading && (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            {isLoading ? 'Saliendo...' : 'Cerrar sesión'}
          </button>
        </div>
      </nav>

      {errorMessage && (
        <p className="border-t border-red-200 bg-red-50 px-4 py-2 text-center text-sm text-red-700">
          {errorMessage}
        </p>
      )}
    </header>
  )
}

export default Navbar
