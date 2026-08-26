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
        h-[220px]
        w-full
        max-w-none
        overflow-hidden

        rounded-lg
        border
        border-border-light
        bg-background-card

        shadow-default

        transition-shadow
        duration-200
        ease-out

        hover:shadow-hover

        md:max-w-none
        lg:max-w-[1094px]
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

          bottom-[-65px]
          right-[-50px]

          w-[440px]
          max-w-none
          object-contain

          opacity-[0.6]

          transition-opacity
          duration-200
          ease-out

          md:left-auto
          md:right-[-5px]

          lg:bottom-[-65px]
          
          lg:w-[500px]
          lg:opacity-[0.6]

          lg:group-hover:opacity-[0.9]
        "
      />

      {/* Content */}
      <div
        className="
          absolute
          left-4
          top-4
          z-10

          flex
          items-start
          gap-2

          lg:left-10
          lg:top-1/2
          lg:-translate-y-1/2
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

            lg:h-16
            lg:w-16
          "
        />

        {/* Text */}
        <div>
          <h2
            id="map-banner-title"
            className="
              max-w-[220px]

              font-heading
              text-mobile-h2
              text-primary

              lg:max-w-none
              lg:text-h3
            "
          >
            {t('interactiveMapBanner.title')}
          </h2>

          <p
            className="
              mt-1
              max-w-[220px]

              font-body
              text-mobile-small
              text-text-secondary

              lg:mt-2
              lg:max-w-[430px]
              lg:text-body-regular
            "
          >
            {t('interactiveMapBanner.description')}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div
        className="
          absolute
          bottom-3
          left-1/2
          z-20
          -translate-x-1/2

          lg:bottom-auto
          lg:left-auto
          lg:right-[190px]
          lg:top-1/2
          lg:translate-x-0
          lg:-translate-y-1/2
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
          {t('interactiveMapBanner.openMap')}
        </Button>
      </div>
    </section>
  )
}

export default InteractiveMapBanner