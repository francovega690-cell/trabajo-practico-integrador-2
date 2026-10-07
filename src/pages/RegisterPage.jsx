import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from '../hooks/useForm'

const REGISTER_URL = 'http://localhost:5501/api/auth/register'

const fieldMessages = {
  username: 'El nombre de usuario debe tener entre 3 y 20 caracteres, solo letras y números.',
  email: 'Ingresá un email válido.',
  password:
    'La contraseña debe tener al menos 8 caracteres, con mayúscula, minúscula, número y símbolo.',
  firstName: 'El nombre debe tener entre 2 y 50 letras.',
  lastName: 'El apellido debe tener entre 2 y 50 letras.',
  birthDate: 'La fecha de nacimiento no es válida.',
  avatarUrl: 'La URL del avatar no es válida.',
  biography: 'La biografía no puede superar los 500 caracteres.',
}

const optionalFields = ['birthDate', 'avatarUrl', 'biography']

const inputClasses =
  'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200'
const labelClasses = 'block text-sm font-medium text-slate-700'

const RegisterPage = () => {
  const navigate = useNavigate()

  const { formState, handleInputChange, handleReset } = useForm({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    avatarUrl: '',
    biography: '',
  })
  const { username, email, password, firstName, lastName, birthDate, avatarUrl, biography } =
    formState

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [validationErrors, setValidationErrors] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsLoading(true)
    setErrorMessage('')
    setValidationErrors([])

    const body = Object.fromEntries(
      Object.entries(formState).filter(
        ([field, value]) => !(optionalFields.includes(field) && value.trim() === ''),
      ),
    )

    try {
      const response = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      })
      const data = await response.json()

      if (response.ok) {
        handleReset()
        navigate('/login', {
          replace: true,
          state: { successMessage: '¡Cuenta creada con éxito! Ya podés iniciar sesión.' },
        })
        return
      }

      if (response.status === 400) {
        if (data.errors) {
          const fields = [...new Set(data.errors.map((error) => error.path))]
          setValidationErrors(
            fields.map((field) => ({
              field,
              message: fieldMessages[field] ?? `El campo ${field} no es válido.`,
            })),
          )
          return
        }

        setErrorMessage(data.message)
        return
      }

      if (response.status === 401) {
        setErrorMessage('No autorizado. Volvé a intentarlo.')
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
      <section className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <h1 className="text-center text-2xl font-bold text-slate-800">Crear cuenta</h1>
        <p className="mt-1 text-center text-sm text-slate-500">
          Completá tus datos para empezar a escribir
        </p>

        {errorMessage && (
          <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        {validationErrors.length > 0 && (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <p className="font-semibold">Revisá los siguientes campos:</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              {validationErrors.map((error) => (
                <li key={error.field}>{error.message}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-6">
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              Cuenta
            </legend>

            <div>
              <label htmlFor="username" className={labelClasses}>
                Nombre de usuario
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={username}
                onChange={handleInputChange}
                autoComplete="username"
                className={inputClasses}
              />
              <p className="mt-1 text-xs text-slate-500">Entre 3 y 20 letras o números.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className={labelClasses}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="password" className={labelClasses}>
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  autoComplete="new-password"
                  className={inputClasses}
                />
                <p className="mt-1 text-xs text-slate-500">
                  Mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo.
                </p>
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              Perfil
            </legend>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className={labelClasses}>
                  Nombre
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleInputChange}
                  autoComplete="given-name"
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="lastName" className={labelClasses}>
                  Apellido
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleInputChange}
                  autoComplete="family-name"
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="birthDate" className={labelClasses}>
                  Fecha de nacimiento <span className="text-slate-400">(opcional)</span>
                </label>
                <input
                  id="birthDate"
                  type="date"
                  name="birthDate"
                  value={birthDate}
                  onChange={handleInputChange}
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="avatarUrl" className={labelClasses}>
                  URL del avatar <span className="text-slate-400">(opcional)</span>
                </label>
                <input
                  id="avatarUrl"
                  type="url"
                  name="avatarUrl"
                  value={avatarUrl}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className={inputClasses}
                />
              </div>
            </div>

            <div>
              <label htmlFor="biography" className={labelClasses}>
                Biografía <span className="text-slate-400">(opcional)</span>
              </label>
              <textarea
                id="biography"
                name="biography"
                value={biography}
                onChange={handleInputChange}
                rows={3}
                maxLength={500}
                className={inputClasses}
              />
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            {isLoading ? 'Registrando...' : 'Registrarme'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:underline">
            Iniciá sesión
          </Link>
        </p>
      </section>
    </main>
  )
}

export default RegisterPage
