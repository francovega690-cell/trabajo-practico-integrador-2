import { useFetch } from '../hooks/useFetch'

const ARTICLES_URL = 'http://localhost:5501/api/articles'

const HomePage = () => {
  const { data: articles, isLoading, error } = useFetch(ARTICLES_URL)

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Artículos publicados</h1>
          <p className="mt-1 text-slate-500">Lo último que se escribió en el blog</p>
        </header>

        {isLoading && (
          <div className="flex items-center justify-center gap-3 py-16 text-slate-500">
            <span className="h-6 w-6 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
            Cargando artículos...
          </div>
        )}

        {!isLoading && error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </p>
        )}

        {!isLoading && !error && articles?.length === 0 && (
          <p className="rounded-lg border border-slate-200 bg-white px-4 py-10 text-center text-slate-500">
            Todavía no hay artículos publicados.
          </p>
        )}

        {!isLoading && !error && articles?.length > 0 && (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <li
                key={article.id}
                className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
              >
                <h2 className="text-lg font-semibold text-slate-800">{article.title}</h2>

                <p className="mt-2 flex-1 text-sm text-slate-600">
                  {article.excerpt || 'Este artículo no tiene resumen.'}
                </p>

                <p className="mt-4 text-sm font-medium text-indigo-600">
                  Por {article.author?.username ?? 'Autor desconocido'}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}

export default HomePage
