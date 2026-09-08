import { divIcon } from 'leaflet'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import '../../styles/leaflet.css'

const miniMapIcon = divIcon({
  className: 'destination-marker-icon',
  iconSize: [46, 54],
  iconAnchor: [23, 54],
  popupAnchor: [0, -48],
  html: `
    <div class="destination-marker">
      <div class="destination-marker__pin"></div>
    </div>
  `,
})

function DestinationMiniMap({
  position,
  title,
}) {
  return (
    <div className="h-[180px] w-full overflow-hidden rounded-md">
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={position}
          icon={miniMapIcon}
        >
          <Popup>
            <span
              className="
                font-body
                text-mobile-small
                lg:text-body-small
              "
            >
              {title}
            </span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default DestinationMiniMap