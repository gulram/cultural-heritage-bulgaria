import { useMemo, useState } from 'react'
import { divIcon } from 'leaflet'
import {
  Marker,
  Tooltip,
} from 'react-leaflet'

import MapMarkerPopup from './MapMarkerPopup'

function MapMarker({
  destination,
  isSelected = false,
  onSelect,
}) {
  const [isHovered, setIsHovered] = useState(false)

  const isActive = isHovered || isSelected
  const markerNumber = Number(destination.number)

  const icon = useMemo(() => {
    const activeClass = isActive
      ? 'destination-marker--active'
      : ''

    const number = Number.isFinite(markerNumber)
      ? markerNumber
      : ''

    return divIcon({
      className: 'destination-marker-icon',
      iconSize: [64, 72],
      iconAnchor: [32, 72],
      tooltipAnchor: [0, -62],
      html: `
        <div class="destination-marker-touch-target">
          <div class="destination-marker ${activeClass}">
            <div class="destination-marker__pin">
              <span class="destination-marker__number">
                ${number}
              </span>
            </div>
          </div>
        </div>
      `,
    })
  }, [isActive, markerNumber])

  const handleSelect = () => {
    setIsHovered(false)
    onSelect?.(destination)
  }

  return (
    <Marker
      position={destination.coordinates}
      icon={icon}
      title={destination.title}
      alt={destination.title}
      zIndexOffset={isSelected ? 1000 : 0}
      eventHandlers={{
        mouseover: () => setIsHovered(true),
        mouseout: () => setIsHovered(false),
        click: handleSelect,
      }}
    >
      {isActive && (
        <Tooltip
          permanent
          interactive
          direction="top"
          offset={[0, -4]}
          opacity={1}
          className="destination-map-tooltip"
        >
          <MapMarkerPopup destination={destination} />
        </Tooltip>
      )}
    </Marker>
  )
}

export default MapMarker