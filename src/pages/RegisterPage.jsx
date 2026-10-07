import { Link } from 'react-router'
import { useForm } from '../hooks/useForm'

const inputClasses =
  'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200'
const labelClasses = 'block text-sm font-medium text-slate-700'

const RegisterPage = () => {
  const { formState, handleInputChange } = useForm({
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

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <h1 className="text-center text-2xl font-bold text-slate-800">Crear cuenta</h1>
        <p className="mt-1 text-center text-sm text-slate-500">
          Completá tus datos para empezar a escribir
        </p>

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
            className="w-full rounded-lg bg-indigo-600 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
          >
            Registrarme
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
