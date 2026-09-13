import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

import MapHero from '../components/map/MapHero'
import MapExplorer from '../components/map/MapExplorer'
import MapDestinationList from '../components/map/MapDestinationList'
import SelectedDestinationPanel from '../components/map/SelectedDestinationPanel'

import FeedbackState from '../components/ui/FeedbackState'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'

import useDestinations from '../hooks/useDestinations'

import heroImage from '../assets/rila-hero.webp'

function MapPage() {
  const { t, i18n } = useTranslation()

  const locale =
    i18n.resolvedLanguage === 'en' ? 'en' : 'bg'

  const {
    destinations,
    isLoading,
    error,
    retry,
  } = useDestinations(locale)

  const [selectedSlug, setSelectedSlug] = useState(null)

  const [
    isDestinationListVisible,
    setIsDestinationListVisible,
  ] = useState(false)

  const destinationListRef = useRef(null)

  useEffect(() => {
    const previousTitle = document.title

    document.title =
      locale === 'en'
        ? 'Interactive Map | Cultural Heritage Bulgaria'
        : 'Интерактивна карта | Културно наследство България'

    return () => {
      document.title = previousTitle
    }
  }, [locale])

  useEffect(() => {
    const destinationList = destinationListRef.current

    if (!destinationList) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDestinationListVisible(entry.isIntersecting)
      },
      {
        threshold: 0.15,
      }
    )

    observer.observe(destinationList)

    return () => {
      observer.disconnect()
    }
  }, [destinations.length])

  const selectedDestination =
    destinations.find(
      (destination) =>
        destination.slug === selectedSlug
    ) ?? null

  const activeHeroImage =
    selectedDestination?.image ?? heroImage

  const handleSelectDestination = (destination) => {
    setSelectedSlug(destination.slug)
  }

  const handleClearSelection = () => {
    setSelectedSlug(null)
  }

  const handleScrollToDestinations = () => {
    destinationListRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const sectionWidthClass = selectedDestination
    ? 'max-w-main'
    : 'max-w-map'

  const mapLayoutClass = selectedDestination
    ? `
        grid-cols-1 gap-3

        xl:min-h-(--map-panel-height)
        xl:grid-cols-[minmax(0,658px)_510px]
      `
    : 'grid-cols-1'

  const mapHeightClass = selectedDestination
    ? `
        xl:h-full
        xl:min-h-(--map-panel-height)
      `
    : `
        lg:mx-auto
        lg:h-[520px]
        lg:max-w-[1003px]
      `

  return (
    <>
      <Header />

      <main>
        <MapHero image={activeHeroImage} />

        <section
          aria-label={t('mapPage.destinations')}
          className={`
            mx-auto w-full
            ${sectionWidthClass}

            px-4 py-4

            sm:px-6

            md:px-4

            lg:px-5
            lg:py-6

            xl:px-0
          `}
        >
          {isLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <FeedbackState
              variant="error"
              title={t('feedback.error.title')}
              description={t('feedback.error.description')}
              actionLabel={t('feedback.error.retry')}
              onAction={retry}
            />
          ) : destinations.length === 0 ? (
            <FeedbackState
              variant="empty"
              title={t('feedback.noResults.title')}
              description={t('feedback.noResults.description')}
            />
          ) : (
            <>
              {!isDestinationListVisible && (
                <div
                  className="
                    sticky top-20 z-[500]

                    mb-2
                    flex justify-end

                    pointer-events-none

                    lg:hidden
                  "
                >
                  <button
                    type="button"
                    onClick={handleScrollToDestinations}
                    aria-controls="map-destination-list"
                    className="
                      pointer-events-auto

                      flex items-center gap-1

                      rounded-full
                      border border-border-light
                      bg-surface/95

                      px-3 py-2

                      font-body
                      text-mobile-small
                      text-accent-orange

                      shadow-md
                      backdrop-blur-sm

                      transition
                      duration-200

                      hover:border-accent-orange
                      hover:bg-background-highlight

                      active:scale-[0.97]
                    "
                  >
                    {t('mapPage.scrollToDestinations')}

                    <span
                      aria-hidden="true"
                      className="text-base leading-none"
                    >
                      ↓
                    </span>
                  </button>
                </div>
              )}

              <div
                className={`
                  grid w-full

                  ${mapLayoutClass}
                `}
              >
                <MapExplorer
                  destinations={destinations}
                  selectedDestination={selectedDestination}
                  onSelectDestination={handleSelectDestination}
                  className={`
                    h-[440px] min-w-0

                    ${mapHeightClass}
                  `}
                />

                {selectedDestination && (
                  <SelectedDestinationPanel
                    destination={selectedDestination}
                    onClose={handleClearSelection}
                  />
                )}
              </div>

              <div
                ref={destinationListRef}
                id="map-destination-list"
                className="scroll-mt-24"
              >
                <MapDestinationList
                  destinations={destinations}
                  selectedSlug={selectedSlug}
                  onSelectDestination={handleSelectDestination}
                />
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}

export default MapPage