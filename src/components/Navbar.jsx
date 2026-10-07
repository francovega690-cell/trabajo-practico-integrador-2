import { Link } from 'react-router'

const Navbar = () => {
  const handleLogout = () => {
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
            className="rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
