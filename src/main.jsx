// Solo importamos lo que usamos: no hace falta importar React
// porque el JSX transform moderno lo resuelve automáticamente
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// createRoot monta la app en el <div id="root"> del index.html.
// StrictMode activa chequeos extra en desarrollo (por ejemplo, ejecuta
// los efectos dos veces para detectar efectos mal escritos).
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
