import { ArrowRight } from 'lucide-react'

import {
  useTranslation,
} from 'react-i18next'

import Button from './Button'
import mapImage from '../assets/bulgaria-map-banner.png'
import mapRouteIcon from '../assets/map-route.png'

function InteractiveMapBanner() {
  const { t } = useTranslation()

  return (
    <section
      aria-labelledby="map-banner-title"
      className="
        group
        relative

        mx-auto
        w-full
        overflow-hidden

        rounded-lg
        border
        border-border-light
        bg-background-card

        px-4
        py-5

        shadow-default

        transition-shadow
        duration-200
        ease-out

        hover:shadow-hover

        sm:px-5
        sm:py-6

        md:px-6

        lg:min-h-[220px]
        lg:px-10
        lg:py-8
      "
    >
      {/* Decorative map */}
      <img
        src={mapImage}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="
          pointer-events-none
          absolute

          hidden

          max-w-none
          object-contain

          transition-opacity
          duration-200
          ease-out

          md:bottom-[-70px]
          md:right-[-80px]
          md:block
          md:w-[430px]
          md:opacity-[0.35]

          lg:bottom-[-65px]
          lg:right-[-20px]
          lg:w-[500px]
          lg:opacity-[0.6]

          lg:group-hover:opacity-[0.9]
        "
      />

      {/* Content */}
      <div
        className="
          relative
          z-10

          flex
          flex-col
          items-start
          gap-5

          md:max-w-[70%]

          lg:min-h-[156px]
          lg:max-w-none
          lg:flex-row
          lg:items-center
          lg:justify-between
          lg:gap-8
        "
      >
        {/* Icon + Text */}
        <div
          className="
            flex
            items-start
            gap-3

            lg:items-center
            lg:gap-5
          "
        >
          {/* Icon */}
          <img
            src={mapRouteIcon}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="
              h-10
              w-10
              shrink-0
              object-contain

              sm:h-12
              sm:w-12

              lg:h-16
              lg:w-16
            "
          />

          {/* Text */}
          <div>
            <h3
              id="map-banner-title"
              className="
                max-w-[260px]

                font-heading
                text-mobile-h2
                text-primary

                sm:max-w-[340px]

                lg:max-w-[430px]
                lg:text-h3
              "
            >
              {t(
                'interactiveMapBanner.title'
              )}
            </h3>

            <p
              className="
                mt-2
                max-w-[300px]

                font-body
                text-mobile-small
                text-text-secondary

                sm:max-w-[380px]

                lg:max-w-[430px]
                lg:text-body-regular
              "
            >
              {t(
                'interactiveMapBanner.description'
              )}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div
          className="
            self-start

            lg:mr-[180px]
            lg:shrink-0
          "
        >
          <Button
            to="/map"
            variant="primary"
            icon={ArrowRight}
            iconSize={16}
            className="
              whitespace-nowrap

              lg:group-hover:bg-accent-orange
              lg:group-hover:shadow-button
            "
          >
            {t(
              'interactiveMapBanner.openMap'
            )}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default InteractiveMapBanner