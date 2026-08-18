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
        rounded-[14px]
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
            {title}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default DestinationMiniMap