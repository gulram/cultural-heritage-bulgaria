import { useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  useMap,
} from 'react-leaflet'
import { useTranslation } from 'react-i18next'

import 'leaflet/dist/leaflet.css'

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
    if (!selectedDestination) {
      return
    }

    map.flyTo(
      selectedDestination.coordinates,
      8,
      {
        duration: 0.8,
      }
    )
  }, [map, selectedDestination])

  return null
}

// Keeps Leaflet correctly sized when the container changes.
function MapResizeHandler() {
  const map = useMap()

  useEffect(() => {
    const mapContainer = map.getContainer()

    const resizeObserver = new ResizeObserver(
      () => {
        map.invalidateSize({
          animate: false,
        })
      }
    )

    resizeObserver.observe(mapContainer)

    requestAnimationFrame(() => {
      map.invalidateSize({
        animate: false,
      })
    })

    return () => {
      resizeObserver.disconnect()
    }
  }, [map])

  return null
}

function MapExplorer({
  destinations,
  selectedDestination,
  onSelectDestination,
  className = '',
}) {
  const { t } = useTranslation()

  return (
    <div
      className={`
        relative
        w-full
        overflow-hidden
        rounded-lg

        ${className}
      `}
    >
      <style>
        {`
          .leaflet-tooltip.destination-map-tooltip {
            padding: 0;
            border: 0;
            background: transparent;
            box-shadow: none;
          }

          .leaflet-tooltip.destination-map-tooltip::before {
            display: none;
          }

          .destination-map-tooltip {
            pointer-events: auto;
          }

          .leaflet-popup.destination-map-popup .leaflet-popup-content-wrapper {
            padding: 0;
            border-radius: var(--radius-md);
            background: transparent;
            box-shadow: none;
          }

          .leaflet-popup.destination-map-popup .leaflet-popup-content {
            margin: 0;
            width: auto !important;
          }

          .leaflet-popup.destination-map-popup .leaflet-popup-tip-container {
            display: none;
          }
        `}
      </style>

      <MapContainer
        center={BULGARIA_CENTER}
        zoom={7}
        minZoom={6}
        maxZoom={16}
        maxBounds={BULGARIA_BOUNDS}
        maxBoundsViscosity={1.0}
        scrollWheelZoom
        className="
          h-full
          min-h-[420px]
          w-full

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
              selectedDestination?.slug ===
              destination.slug
            }
            onSelect={onSelectDestination}
          />
        ))}
      </MapContainer>

      <div
        className="
          absolute
          bottom-0
          left-0
          z-[400]

          flex
          h-6
          w-full
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