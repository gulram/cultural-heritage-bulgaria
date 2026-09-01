import { useTranslation } from 'react-i18next'

import MapDestinationItem from './MapDestinationItem'

function getItemLayoutClass(index) {
  if (index < 3) {
    return 'lg:col-span-2'
  }

  if (index === 3) {
    return 'lg:col-start-2 lg:col-span-2'
  }

  if (index === 4) {
    return 'lg:col-span-2'
  }

  return ''
}

function MapDestinationList({
  destinations = [],
  selectedSlug = null,
  onSelectDestination,
}) {
  const { t } = useTranslation()

  return (
    <section
      aria-labelledby="map-destinations-title"
      className="mt-6 lg:mt-9"
    >
      <p
        className="
          font-body
          text-section
          uppercase
          tracking-[0.12em]
          text-accent-orange
        "
      >
        {t('mapPage.destinations')}
      </p>

      <h2
        id="map-destinations-title"
        className="
          mt-1

          font-body
          text-body-regular
          text-text-secondary
        "
      >
        {t('mapPage.selectDestination')}
      </h2>

      <div
        className="
          mt-4

          grid grid-cols-1 gap-3

          sm:grid-cols-2

          lg:grid-cols-6
        "
      >
        {destinations.map((destination, index) => {
          const isSelected =
            selectedSlug === destination.slug

          return (
            <div
              key={destination.slug}
              className={getItemLayoutClass(index)}
            >
              <MapDestinationItem
                destination={destination}
                isSelected={isSelected}
                onClick={onSelectDestination}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default MapDestinationList