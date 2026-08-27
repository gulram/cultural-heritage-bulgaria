import {
  ArrowRight,
  Clock3,
  ExternalLink,
  Ticket,
  X,
} from 'lucide-react'

import {
  useTranslation,
} from 'react-i18next'

import Button from '../ui/Button'
import DestinationMetadata from '../destination/DestinationMetadata'
import InfoRow from '../destination/InfoRow'

function SelectedDestinationPanel({
  destination,
  onClose,
}) {
  const { t } = useTranslation()

  if (!destination) {
    return null
  }

  const mapsUrl =
    `https://www.google.com/maps/search/?api=1&query=` +
    `${destination.coordinates[0]},` +
    `${destination.coordinates[1]}`

  return (
    <aside
      aria-labelledby="selected-destination-title"
      className="
        flex
        w-full
        flex-col

        rounded-lg
        border
        border-border-light
        bg-white

        p-2
        gap-2

        shadow-default

        lg:min-h-[820px]
        lg:w-(--map-panel-width)
        lg:flex-none
        lg:gap-3
        lg:p-3
      "
    >
      {/* HEADER */}
      <div
        className="
          flex
          items-center
          justify-between
          gap-1

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
          {t(
            'selectedDestinationPanel.selectedDestination'
          )}
        </p>

        <button
          type="button"
          onClick={onClose}
          aria-label={t(
            'selectedDestinationPanel.closeAriaLabel'
          )}
          className="
            flex
            h-3
            w-3
            shrink-0
            items-center
            justify-center

            text-accent-orange

            transition-colors
            duration-400
            ease-out

            hover:text-accent-antique

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-accent-orange
            focus-visible:ring-offset-2
          "
        >
          <X
            aria-hidden="true"
            className="
              h-(--icon-size-medium)
              w-(--icon-size-medium)
            "
            strokeWidth={1.8}
          />
        </button>
      </div>

      {/* IMAGE */}
      <div
        className="
          mt-1
          h-[190px]
          w-full
          shrink-0
          overflow-hidden
          rounded-md

          lg:mt-0
        "
      >
        <img
          src={destination.image}
          alt={destination.title}
          className="
            h-full
            w-full
            object-cover
          "
        />
      </div>

      {/* TITLE */}
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

      {/* METADATA */}
      <div
        className="
          mt-1

          lg:mt-0
        "
      >
        <DestinationMetadata
          location={destination.location}
          unescoYear={destination.unescoYear}
        />
      </div>

      {/* DESCRIPTION */}
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
        {destination.mapDescription ||
          destination.description ||
          destination.about}
      </p>

      {/* QUICK INFO ROWS */}
      <div
        className="
          mt-2

          grid
          grid-cols-2
          gap-1

          border-y
          border-border-light

          py-2

          lg:mt-0
          lg:shrink-0
        "
      >
        <InfoRow
          icon={Clock3}
          title={t(
            'selectedDestinationPanel.workingHours'
          )}
        >
          <p className="whitespace-pre-line">
            {destination.mapInfo?.workingHours ||
              t(
                'selectedDestinationPanel.viewPracticalInfo'
              )}
          </p>
        </InfoRow>

        <InfoRow
          icon={Ticket}
          title={t(
            'selectedDestinationPanel.admission'
          )}
        >
          <p className="whitespace-pre-line">
            {destination.mapInfo?.admission ||
              t(
                'selectedDestinationPanel.viewDestinationInfo'
              )}
          </p>
        </InfoRow>
      </div>

      {/* ACTIONS */}
      <div
        className="
          mt-2

          grid
          grid-cols-1
          gap-1

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
          {t(
            'selectedDestinationPanel.exploreDestination'
          )}
        </Button>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="
            inline-flex
            h-5
            w-full
            items-center
            justify-center
            gap-1

            whitespace-nowrap

            rounded-md
            border
            border-accent-orange

            px-2

            font-body
            text-button
            text-accent-orange

            transition-[border-color,color,box-shadow]
            duration-200
            ease-out

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