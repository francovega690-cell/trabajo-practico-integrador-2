import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from '../hooks/useForm'

const LOGIN_URL = 'http://localhost:5501/api/auth/login'

const fieldMessages = {
  email: 'Ingresá un email válido.',
  password: 'Ingresá tu contraseña.',
}

const LoginPage = () => {
  const navigate = useNavigate()

  const { formState, handleInputChange } = useForm({
    email: '',
    password: '',
  })
  const { email, password } = formState

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [validationErrors, setValidationErrors] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsLoading(true)
    setErrorMessage('')
    setValidationErrors([])

    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formState),
      })
      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('isLogged', 'true')
        navigate('/', { replace: true })
        return
      }

      if (response.status === 400 && data.errors) {
        const fields = [...new Set(data.errors.map((error) => error.path))]
        setValidationErrors(
          fields.map((field) => ({
            field,
            message: fieldMessages[field] ?? `El campo ${field} no es válido.`,
          })),
        )
        return
      }

      if (response.status === 401) {
        setErrorMessage('Email o contraseña incorrectos.')
        return
      }

      if (response.status === 403) {
        setErrorMessage('No tenés permisos para realizar esta acción.')
        return
      }

      setErrorMessage('Ocurrió un error en el servidor. Intentá más tarde.')
    } catch {
      setErrorMessage('No se pudo conectar con el servidor.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <h1 className="text-center text-2xl font-bold text-slate-800">Iniciar sesión</h1>
        <p className="mt-1 text-center text-sm text-slate-500">Ingresá a tu blog personal</p>

        {errorMessage && (
          <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        {validationErrors.length > 0 && (
          <ul className="mt-6 list-inside list-disc space-y-1 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {validationErrors.map((error) => (
              <li key={error.field}>{error.message}</li>
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              autoComplete="email"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              autoComplete="current-password"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          ¿No tenés cuenta?{' '}
          <Link to="/register" className="font-semibold text-indigo-600 hover:underline">
            Registrate
          </Link>
        </p>
      </section>
    </main>
  )
}

export default LoginPage
