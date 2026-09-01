import { useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  useMap,
} from 'react-leaflet'
import { useTranslation } from 'react-i18next'

import 'leaflet/dist/leaflet.css'
import '../../styles/leaflet.css'

import MapMarker from './MapMarker'

const BULGARIA_CENTER = [42.7339, 25.4858]

const BULGARIA_BOUNDS = [
  [41.2, 22.3],
  [44.3, 28.7],
]

function MapViewController({
  selectedDestination,
}) {
  const map = useMap()

  useEffect(() => {
    if (!selectedDestination) return

    map.flyTo(
      selectedDestination.coordinates,
      8,
      { duration: 0.8 }
    )
  }, [map, selectedDestination])

  return null
}

function MapResizeHandler() {
  const map = useMap()

  useEffect(() => {
    const mapContainer = map.getContainer()

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize({ animate: false })
    })

    resizeObserver.observe(mapContainer)

    const frame = requestAnimationFrame(() => {
      map.invalidateSize({ animate: false })
    })

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
    }
  }, [map])

  return null
}

function MapExplorer({
  destinations = [],
  selectedDestination = null,
  onSelectDestination,
  className = '',
}) {
  const { t } = useTranslation()

  return (
    <div
      className={`
        relative w-full
        overflow-hidden
        rounded-lg

        ${className}
      `}
    >
      <MapContainer
        center={BULGARIA_CENTER}
        zoom={7}
        minZoom={6}
        maxZoom={16}
        maxBounds={BULGARIA_BOUNDS}
        maxBoundsViscosity={1}
        scrollWheelZoom
        className="
          h-full min-h-[420px] w-full

          lg:min-h-[560px]
        "
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapResizeHandler />

        <MapViewController
          selectedDestination={selectedDestination}
        />

        {destinations.map((destination) => (
          <MapMarker
            key={destination.slug}
            destination={destination}
            isSelected={
              selectedDestination?.slug === destination.slug
            }
            onSelect={onSelectDestination}
          />
        ))}
      </MapContainer>

      <div
        className="
          absolute bottom-0 left-0 z-[400]

          flex h-6 w-full
          items-center

          bg-[#dcdcdc]
          px-1

          font-body
          text-mobile-small
          text-text-primary

          lg:text-body-small
        "
      >
        {t('mapPage.instruction')}
      </div>
    </div>
  )
}

export default MapExplorer