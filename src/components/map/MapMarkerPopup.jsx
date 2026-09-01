import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight,
  MapPin,
} from 'lucide-react'

import Button from '../ui/Button'
import ImageFallback from '../ui/ImageFallback'

function LocationRow({
  location,
  className = '',
}) {
  return (
    <div
      className={`
        min-w-0
        items-start gap-1

        font-body
        text-mobile-small
        text-text-secondary

        ${className}
      `}
    >
      <MapPin
        aria-hidden="true"
        strokeWidth={1.8}
        className="
          mt-[2px]
          h-(--icon-size-small)
          w-(--icon-size-small)
          shrink-0
          text-primary
        "
      />

      <span
        className="
          min-w-0
          whitespace-normal
          wrap-break-word
        "
      >
        {location}
      </span>
    </div>
  )
}

function MapMarkerPopup({ destination }) {
  const { t } = useTranslation()
  const [failedImage, setFailedImage] = useState(null)

  const hasValidImage =
    Boolean(destination.image) &&
    failedImage !== destination.image

  return (
    <div
      className="
        w-[190px]
        overflow-hidden

        rounded-md
        bg-white

        md:flex
        md:h-auto
        md:w-[360px]
        md:items-stretch
        md:p-0
      "
    >
      <div
        className="
          flex min-w-0
          items-start gap-2
          p-2

          md:contents
        "
      >
        <div
          className="
            h-14 w-16 shrink-0
            overflow-hidden
            rounded-sm

            md:h-auto
            md:w-8
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

        <div
          className="
            min-w-0 flex-1

            md:flex
            md:flex-col
            md:justify-center
            md:px-1
            md:py-1
          "
        >
          <h3
            className="
              min-w-0 max-w-full
              whitespace-normal
              wrap-break-word

              font-heading
              text-mobile-h3
              text-text-primary

              md:text-h3
            "
          >
            {destination.title}
          </h3>

          <LocationRow
            location={destination.location}
            className="mt-1 hidden md:flex"
          />
        </div>
      </div>

      <LocationRow
        location={destination.location}
        className="mx-2 mt-1 flex md:hidden"
      />

      <div className="mx-2 mb-2 mt-3 md:hidden">
        <Button
          to={`/destinations/${destination.slug}`}
          variant="filled"
          icon={ArrowRight}
          iconSize={16}
          className="
            !h-10 w-full
            !px-3
            !text-white

            [&_svg]:!text-white
          "
        >
          {t('destinationCard.explore')}
        </Button>
      </div>
    </div>
  )
}

export default MapMarkerPopup