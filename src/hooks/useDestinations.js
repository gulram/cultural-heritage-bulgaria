import { useEffect, useState } from 'react'

import { getDestinations } from '../services/destinationService'

function useDestinations(locale = 'bg') {
  const [destinations, setDestinations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let isCancelled = false

    async function loadDestinations() {
      setIsLoading(true)
      setError(null)

      try {
        const data = await getDestinations(locale)

        if (isCancelled) {
          return
        }

        setDestinations(data)
      } catch (error) {
        console.error(error)

        if (isCancelled) {
          return
        }

        setDestinations([])
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to load destinations.'
        )
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    loadDestinations()

    return () => {
      isCancelled = true
    }
  }, [locale, retryCount])

  const retry = () => {
    setRetryCount((current) => current + 1)
  }

  return {
    destinations,
    isLoading,
    error,
    retry,
  }
}

export default useDestinations