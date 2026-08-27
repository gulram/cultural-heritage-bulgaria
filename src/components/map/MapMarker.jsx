import {
  useMemo,
  useState,
} from 'react'

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
  const [isHovered, setIsHovered] =
    useState(false)

  const isActive =
    isHovered || isSelected

  const markerNumber = Number(
    destination.number
  )

  const icon = useMemo(() => {
    const backgroundColor = isActive
      ? 'var(--color-accent-terracotta)'
      : 'var(--color-accent-orange)'

    return divIcon({
      className: '',

      iconSize: [46, 54],

      iconAnchor: [23, 54],

      tooltipAnchor: [0, -52],

      html: `
        <div
          style="
            position: relative;
            width: 46px;
            height: 54px;
            filter: drop-shadow(
              0 5px 5px rgba(0,0,0,0.22)
            );
          "
        >
          <div
            style="
              position: absolute;
              top: 2px;
              left: 6px;

              width: 34px;
              height: 34px;

              display: flex;
              align-items: center;
              justify-content: center;

              border-radius:
                50% 50% 50% 0;

              border:
                2px solid var(--color-white);

              background:
                ${backgroundColor};

              transform:
                rotate(-45deg);
            "
          >
            <span
              style="
                transform:
                  rotate(45deg);

                color:
                  var(--color-white);

                font-family:
                  var(--font-body);

                font-size:
                  var(--text-body-regular);

                font-weight: 600;
                line-height: 1;
              "
            >
              ${
                Number.isFinite(
                  markerNumber
                )
                  ? markerNumber
                  : ''
              }
            </span>
          </div>
        </div>
      `,
    })
  }, [
    isActive,
    markerNumber,
  ])

  return (
    <Marker
      position={
        destination.coordinates
      }
      icon={icon}
      title={destination.title}
      alt={destination.title}
      zIndexOffset={
        isSelected ? 1000 : 0
      }
      eventHandlers={{
        mouseover: () => {
          setIsHovered(true)
        },

        mouseout: () => {
          setIsHovered(false)
        },

        click: () => {
          onSelect?.(destination)
        },
      }}
    >
      {(isHovered || isSelected) && (
        <Tooltip
          permanent
          interactive
          direction="top"
          offset={[0, -4]}
          opacity={1}
          className="destination-map-tooltip"
        >
          <MapMarkerPopup
            destination={destination}
          />
        </Tooltip>
      )}
    </Marker>
  )
}

export default MapMarker