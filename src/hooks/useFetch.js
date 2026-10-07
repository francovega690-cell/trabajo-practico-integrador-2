import { useCallback, useEffect, useState } from 'react'

const getErrorMessage = (status, message) => {
  if (status === 401) return 'Sesión inexistente o expirada. Iniciá sesión nuevamente.'
  if (status === 403) return 'No tenés permisos para acceder a este recurso.'
  if (status >= 500) return 'Ocurrió un error en el servidor. Intentá más tarde.'
  return message || 'No se pudieron obtener los datos.'
}

export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url, { credentials: 'include' })
      const result = await response.json()

      if (!response.ok) {
        setData(null)
        setError(getErrorMessage(response.status, result.message))
        return
      }

      setData(result)
      setError(null)
    } catch {
      setData(null)
      setError('No se pudo conectar con el servidor.')
    } finally {
      setIsLoading(false)
    }
  }, [url])

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    fetchData()
  }, [fetchData])

  return { data, isLoading, error }
}
