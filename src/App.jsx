// Componente raíz de la aplicación.
// Por ahora muestra un título para comprobar que Tailwind funciona;
// más adelante va a renderizar el router.
const App = () => {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">
      <h1 className="text-3xl font-bold text-indigo-600">Blog Personal</h1>
    </main>
  )
}

export default App
