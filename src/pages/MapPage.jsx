import { useEffect, useState } from 'react'
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

import heroImage from '../assets/rila-hero.png'

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

              <MapDestinationList
                destinations={destinations}
                selectedSlug={selectedSlug}
                onSelectDestination={handleSelectDestination}
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