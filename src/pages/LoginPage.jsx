import { Link } from 'react-router'
import { useForm } from '../hooks/useForm'

const LoginPage = () => {
  const { formState, handleInputChange } = useForm({
    email: '',
    password: '',
  })
  const { email, password } = formState

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <h1 className="text-center text-2xl font-bold text-slate-800">Iniciar sesión</h1>
        <p className="mt-1 text-center text-sm text-slate-500">Ingresá a tu blog personal</p>

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
            className="w-full rounded-lg bg-indigo-600 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
          >
            Ingresar
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
