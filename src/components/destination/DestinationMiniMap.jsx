import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

function DestinationMiniMap({
  position,
  title,
}) {
  return (
    <div
      className="
        h-[180px]
        w-full
        overflow-hidden
        rounded-md
      "
    >
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

        <Marker position={position}>
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