import {
  ArrowRight,
  MapPin,
} from 'lucide-react'

import {
  useTranslation,
} from 'react-i18next'

import Button from './Button'

function MapMarkerPopup({
  destination,
}) {
  const { t } = useTranslation()

  return (
    <div
      className="
        h-[190px]
        w-[207px]
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
      {/* MOBILE TOP ROW */}
      <div
        className="
          flex
          min-w-0
          items-start
          p-1

          md:contents
        "
      >
        {/* IMAGE */}
        <div
          className="
            h-(--spacing-6)
            w-20
            shrink-0
            overflow-hidden
            rounded-sm

            md:h-auto
            md:w-8
          "
        >
          <img
            src={destination.image}
            alt={destination.title}
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
            "
          />
        </div>

        {/* CONTENT */}
        <div
          className="
            min-w-0
            flex-1

            px-1
            py-1

            md:flex
            md:flex-col
            md:justify-center
          "
        >
          <h3
            className="
              min-w-0
              max-w-full

              whitespace-normal
              wrap-break-words

              font-heading
              text-mobile-h3
              text-text-primary

              md:text-h3
            "
          >
            {destination.title}
          </h3>

          {/* DESKTOP LOCATION */}
          <div
            className="
              mt-1
              hidden
              min-w-0
              items-start
              gap-1

              font-body
              text-mobile-small
              text-text-secondary

              md:flex
            "
          >
            <MapPin
              aria-hidden="true"
              className="
                mt-[2px]
                h-(--icon-size-small)
                w-(--icon-size-small)
                shrink-0
                text-primary
              "
              strokeWidth={1.8}
            />

            <span
              className="
                min-w-0
                whitespace-normal
                wrap-break-word
              "
            >
              {destination.location}
            </span>
          </div>
        </div>
      </div>

      {/* MOBILE LOCATION */}
      <div
        className="
          mx-3
          mt-0.5

          flex
          min-h-4
          min-w-0
          items-start
          gap-2

          font-body
          text-mobile-small
          text-text-secondary

          md:hidden
        "
      >
        <MapPin
          aria-hidden="true"
          className="
            mt-[2px]
            h-(--icon-size-small)
            w-(--icon-size-small)
            shrink-0
            text-primary
          "
          strokeWidth={1.8}
        />

        <span
          className="
            min-w-0
            whitespace-normal
            wrap-break-words
          "
        >
          {destination.location}
        </span>
      </div>

      {/* MOBILE CTA */}
      <div
        className="
          mx-4
          mb-4
          mt-1

          md:hidden
        "
      >
        <Button
          to={`/destinations/${destination.slug}`}
          variant="filled"
          icon={ArrowRight}
          iconSize={16}
          className="
            w-full
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