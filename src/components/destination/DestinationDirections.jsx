import { useTranslation } from 'react-i18next'
import {
  ExternalLink,
  MapPin,
} from 'lucide-react'

import DestinationMiniMap from './DestinationMiniMap'

function DestinationDirections({
  destination,
  googleMapsUrl,
}) {
  const { t } = useTranslation()

  return (
    <section
      aria-labelledby="directions-title"
      className="
        mt-6

        border-t border-border-light
        pt-6
      "
    >
      <h2
        id="directions-title"
        className="
          font-heading
          text-mobile-h2
          uppercase
          text-primary

          md:text-h3
        "
      >
        {t('destination.directions')}
      </h2>

      <div
        className="
          mt-5

          grid grid-cols-1 gap-5

          md:grid-cols-[220px_minmax(0,1fr)]
          md:items-stretch
          md:gap-3

          xl:grid-cols-[300px_minmax(0,1fr)]
        "
      >
        <div
          className="
            flex w-full flex-col

            rounded-md
            border border-border-light
            bg-background-card

            px-2 py-4
          "
        >
          <div
            className="
              flex items-center gap-1

              font-body
              text-mobile-small
              text-text-secondary

              md:text-body-small
            "
          >
            <MapPin
              aria-hidden="true"
              size={15}
              strokeWidth={1.8}
              className="shrink-0 text-accent-orange"
            />

            <span>{destination.location}</span>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-3

              inline-flex h-12 w-fit
              items-center justify-center gap-2

              rounded-md
              border border-accent-orange
              px-4

              font-body
              text-button
              text-accent-orange

              transition-[border-color,color,box-shadow]
              duration-200 ease-out

              hover:border-accent-antique
              hover:text-accent-antique
              hover:shadow-button
            "
          >
            {t('destination.openGoogleMaps')}

            <ExternalLink
              aria-hidden="true"
              size={16}
              strokeWidth={1.8}
            />
          </a>
        </div>

        <DestinationMiniMap
          position={destination.coordinates}
          title={destination.title}
        />
      </div>
    </section>
  )
}

export default DestinationDirections