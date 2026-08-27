import { ArrowRight, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import Button from '../ui/Button'

function MapMarkerPopup({ destination }) {
  const { t } = useTranslation()

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
          flex
          min-w-0
          items-start
          gap-2
          p-2

          md:contents
        "
      >
        <div
          className="
            h-14
            w-16
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

        <div
          className="
            min-w-0
            flex-1

            md:flex
            md:flex-col
            md:justify-center
            md:px-1
            md:py-1
          "
        >
          <h3
            className="
              min-w-0
              max-w-full

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

      <div
        className="
          mx-2
          mt-1

          flex
          min-w-0
          items-start
          gap-1

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
            wrap-break-word
          "
        >
          {destination.location}
        </span>
      </div>

      <div
        className="
          mx-2
          mb-2
          mt-3

          md:hidden
        "
      >
        <Button
          to={`/destinations/${destination.slug}`}
          variant="filled"
          icon={ArrowRight}
          iconSize={16}
          className="
            !h-10
            w-full
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