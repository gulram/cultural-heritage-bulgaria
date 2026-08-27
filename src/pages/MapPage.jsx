import {
  useEffect,
  useState,
} from 'react'

import {
  useTranslation,
} from 'react-i18next'

import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

import MapExplorer from '../components/map/MapExplorer'
import MapDestinationList from '../components/map/MapDestinationList'
import SelectedDestinationPanel from '../components/map/SelectedDestinationPanel'

import FeedbackState from '../components/ui/FeedbackState'
import NoResultsState from '../components/ui/NoResultsState'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'

import {
  getDestinations,
} from '../services/destinationService'

import heroImage from '../assets/rila-hero.png'

function MapPage() {
  const { t, i18n } = useTranslation()

  const locale =
    i18n.resolvedLanguage === 'en'
      ? 'en'
      : 'bg'

  const [
    destinations,
    setDestinations,
  ] = useState([])

  const [
    selectedSlug,
    setSelectedSlug,
  ] = useState(null)

  const [
    error,
    setError,
  ] = useState(null)

  const [
    retryCount,
    setRetryCount,
  ] = useState(0)

  const [
    resolvedRequest,
    setResolvedRequest,
  ] = useState({
    locale: null,
    retryCount: -1,
  })

  const isLoading =
    resolvedRequest.locale !== locale ||
    resolvedRequest.retryCount !==
      retryCount

  useEffect(() => {
    let isCancelled = false

    getDestinations(locale)
      .then((data) => {
        if (isCancelled) {
          return
        }

        setDestinations(data)
        setError(null)
      })
      .catch((err) => {
        console.error(err)

        if (isCancelled) {
          return
        }

        setError(err.message)
      })
      .finally(() => {
        if (isCancelled) {
          return
        }

        setResolvedRequest({
          locale,
          retryCount,
        })
      })

    return () => {
      isCancelled = true
    }
  }, [
    locale,
    retryCount,
  ])

  const selectedDestination =
    destinations.find(
      (destination) =>
        destination.slug === selectedSlug
    ) || null

  const activeHeroImage =
    selectedDestination?.image || heroImage

  const handleSelectDestination = (
    destination
  ) => {
    setSelectedSlug(destination.slug)
  }

  const handleClearSelection = () => {
    setSelectedSlug(null)
  }

  const handleRetry = () => {
    setRetryCount(
      (current) => current + 1
    )
  }

  return (
    <>
      <Header />

      <main>
        {/* MAP HERO */}
        <section
          className="
            relative
            min-h-[260px]
            overflow-hidden

            bg-cover
            bg-center

            md:min-h-[280px]
          "
          style={{
            backgroundImage: `url(${activeHeroImage})`,
          }}
        >
          {/* Overlay */}
          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              bg-black/40
            "
          />

          {/* Hero content */}
          <div
            className="
              relative
              z-10

              mx-auto
              flex
              min-h-[260px]
              w-full
              max-w-main
              items-center

              px-4
              pt-[72px]

              sm:px-6

              md:min-h-[280px]
              md:px-4

              lg:px-5

              xl:px-0
            "
          >
            <div
              className="
                max-w-[700px]
                text-white
              "
            >
              <h1
                className="
                  font-heading
                  text-mobile-h1

                  md:text-h1
                "
              >
                {t('mapPage.title')}
              </h1>

              <p
                className="
                  mt-3
                  max-w-[650px]

                  font-body
                  text-mobile-body

                  md:text-body-regular
                "
              >
                {t('mapPage.description')}
              </p>
            </div>
          </div>
        </section>

        {/* MAP PAGE CONTENT */}
        <section
          aria-label={t('mapPage.destinations')}
          className="
            mx-auto
            w-full
            max-w-map

            px-4
            py-4

            sm:px-6
            md:px-4

            lg:px-5
            lg:py-6

            xl:px-0
          "
        >
          {/* LOADING */}
          {isLoading && (
            <LoadingSkeleton />
          )}

          {/* ERROR */}
          {!isLoading && error && (
            <FeedbackState
              variant="error"
              title={t(
                'feedback.error.title'
              )}
              description={t(
                'feedback.error.description'
              )}
              actionLabel={t(
                'feedback.error.retry'
              )}
              onAction={handleRetry}
            />
          )}

          {/* NO RESULTS */}
          {!isLoading &&
            !error &&
            destinations.length === 0 && (
              <NoResultsState />
            )}

          {/* MAP CONTENT */}
          {!isLoading &&
            !error &&
            destinations.length > 0 && (
              <>
                {/* MAP + SELECTED DESTINATION */}
                <div
                  className={`
                    grid
                    w-full

                    ${
                      selectedDestination
                        ? `
                          grid-cols-1
                          gap-3

                          lg:min-h-[802px]
                          lg:grid-cols-[minmax(0,658px)_510px]
                          lg:gap-3
                        `
                        : `
                          grid-cols-1
                        `
                    }
                  `}
                >
                  {/* MAP */}
                  <MapExplorer
                    destinations={
                      destinations
                    }
                    selectedDestination={
                      selectedDestination
                    }
                    onSelectDestination={
                      handleSelectDestination
                    }
                    className={`
                      min-w-0
                      h-[440px]

                      ${
                        selectedDestination
                          ? `
                            lg:h-full
                            lg:min-h-[802px]
                          `
                          : `
                            lg:mx-auto
                            lg:h-[520px]
                            lg:max-w-[1003px]
                          `
                      }
                    `}
                  />

                  {/* SELECTED DESTINATION PANEL */}
                  {selectedDestination && (
                    <SelectedDestinationPanel
                      destination={
                        selectedDestination
                      }
                      onClose={
                        handleClearSelection
                      }
                    />
                  )}
                </div>

                <MapDestinationList
                  destinations={destinations}
                  selectedSlug={selectedSlug}
                  onSelectDestination={
                    handleSelectDestination
                  }
                />
              </>
            )}
        </section>
      </main>

      <Footer />
    </>
  )
}

export default MapPage