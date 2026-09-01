import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight,
  Clock3,
  ExternalLink,
  Ticket,
  X,
} from 'lucide-react'

import Button from '../ui/Button'
import ImageFallback from '../ui/ImageFallback'
import DestinationMetadata from '../destination/DestinationMetadata'
import InfoRow from '../destination/InfoRow'

import { getGoogleMapsUrl } from '../../utils/destinationUtils'

function SelectedDestinationPanel({
  destination,
  onClose,
}) {
  const { t } = useTranslation()
  const [failedImage, setFailedImage] = useState(null)

  if (!destination) {
    return null
  }

  const hasValidImage =
    Boolean(destination.image) &&
    failedImage !== destination.image

  const mapsUrl = getGoogleMapsUrl(destination.coordinates)

  const description =
    destination.mapDescription || destination.description

  return (
    <aside
      aria-labelledby="selected-destination-title"
      className="
        flex w-full flex-col gap-2

        rounded-lg
        border border-border-light
        bg-white
        p-2
        shadow-default

        lg:gap-3
        lg:p-3

        xl:min-h-(--map-panel-height)
        xl:w-(--map-panel-width)
        xl:flex-none
      "
    >
      <div
        className="
          flex items-center justify-between gap-1

          lg:h-3
          lg:shrink-0
        "
      >
        <p
          className="
            font-body
            text-mobile-section
            uppercase
            tracking-[0.12em]
            text-accent-orange

            lg:text-section-small
          "
        >
          {t('selectedDestinationPanel.selectedDestination')}
        </p>

        <button
          type="button"
          onClick={onClose}
          aria-label={t('selectedDestinationPanel.closeAriaLabel')}
          className="
            flex h-3 w-3 shrink-0
            items-center justify-center

            text-accent-orange

            transition-colors duration-200 ease-out

            hover:text-accent-antique

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-accent-orange
            focus-visible:ring-offset-2
          "
        >
          <X
            aria-hidden="true"
            strokeWidth={1.8}
            className="
              h-(--icon-size-medium)
              w-(--icon-size-medium)
            "
          />
        </button>
      </div>

      <div
        className="
          mt-1 h-[190px] w-full shrink-0
          overflow-hidden
          rounded-md

          lg:mt-0
        "
      >
        {hasValidImage ? (
          <img
            src={destination.image}
            alt={destination.imageAlt || destination.title}
            loading="lazy"
            onError={() => setFailedImage(destination.image)}
            className="
              h-full w-full
              object-cover
            "
          />
        ) : (
          <ImageFallback
            compact
            className="
              h-full
              rounded-none
              border-0
              shadow-none
            "
          />
        )}
      </div>

      <h2
        id="selected-destination-title"
        className="
          mt-1

          font-heading
          text-mobile-h1
          text-text-primary

          lg:mt-0
          lg:text-h2
        "
      >
        {destination.title}
      </h2>

      <div className="mt-1 lg:mt-0">
        <DestinationMetadata
          location={destination.location}
          unescoYear={destination.unescoYear}
        />
      </div>

      {description && (
        <p
          className="
            mt-2

            font-body
            text-mobile-body
            text-text-secondary

            lg:mt-0
            lg:text-body-regular
          "
        >
          {description}
        </p>
      )}

      <div
        className="
          mt-2

          grid grid-cols-2 gap-1

          border-y border-border-light
          py-2

          lg:mt-0
          lg:shrink-0
        "
      >
        <InfoRow
          icon={Clock3}
          title={t('selectedDestinationPanel.workingHours')}
        >
          <p className="whitespace-pre-line">
            {destination.mapInfo?.workingHours ||
              t('selectedDestinationPanel.viewPracticalInfo')}
          </p>
        </InfoRow>

        <InfoRow
          icon={Ticket}
          title={t('selectedDestinationPanel.admission')}
        >
          <p className="whitespace-pre-line">
            {destination.mapInfo?.admission ||
              t('selectedDestinationPanel.viewDestinationInfo')}
          </p>
        </InfoRow>
      </div>

      <div
        className="
          mt-2

          grid grid-cols-1 gap-1

          sm:grid-cols-2
          sm:gap-2

          lg:mt-auto
          lg:shrink-0
        "
      >
        <Button
          to={`/destinations/${destination.slug}`}
          variant="filled"
          icon={ArrowRight}
          iconSize={16}
          className="
            w-full

            lg:h-5
            lg:px-2
          "
        >
          {t('selectedDestinationPanel.exploreDestination')}
        </Button>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex h-5 w-full
            items-center justify-center gap-1
            whitespace-nowrap

            rounded-md
            border border-accent-orange
            px-2

            font-body
            text-button
            text-accent-orange

            transition-[border-color,color,box-shadow]
            duration-200 ease-out

            hover:border-accent-antique
            hover:text-accent-antique
            hover:shadow-button

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-accent-orange
            focus-visible:ring-offset-2
          "
        >
          {t('destination.openGoogleMaps')}

          <ExternalLink
            aria-hidden="true"
            size={15}
            strokeWidth={1.8}
          />
        </a>
      </div>
    </aside>
  )
}

export default SelectedDestinationPanel