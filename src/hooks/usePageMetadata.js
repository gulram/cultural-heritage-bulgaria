import { useEffect } from 'react'

function usePageMetadata(destination, locale) {
  useEffect(() => {
    if (!destination) {
      return
    }

    const siteName =
      locale === 'en'
        ? 'Cultural Heritage Bulgaria'
        : 'Културно наследство България'

    const previousTitle = document.title

    const descriptionMeta =
      document.querySelector(
        'meta[name="description"]'
      )

    const previousDescription =
      descriptionMeta?.getAttribute(
        'content'
      )

    document.title =
      `${destination.title} | ${siteName}`

    if (descriptionMeta) {
      descriptionMeta.setAttribute(
        'content',
        destination.description ?? ''
      )
    }

    return () => {
      document.title = previousTitle

      if (
        descriptionMeta &&
        previousDescription !== null
      ) {
        descriptionMeta.setAttribute(
          'content',
          previousDescription
        )
      }
    }
  }, [destination, locale])
}

export default usePageMetadata