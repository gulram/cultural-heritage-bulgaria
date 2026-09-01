import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import Button from '../ui/Button'

import mapImage from '../../assets/bulgaria-map-banner.webp'
import mapRouteIcon from '../../assets/map-route.png'

function InteractiveMapBanner() {
  const { t } = useTranslation()

  return (
    <section
      aria-labelledby="map-banner-title"
      className="
        group relative
        mx-auto h-[220px] w-full max-w-none
        overflow-hidden

        rounded-lg
        border border-border-light
        bg-background-highlight
        shadow-default

        transition-shadow duration-200 ease-out

        hover:shadow-hover
      "
    >
      <img
        src={mapImage}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="
          pointer-events-none absolute
          bottom-[-42px] left-1/2
          -translate-x-1/2

          w-[310px] max-w-none
          object-contain
          opacity-[0.28]

          transition-opacity duration-200 ease-out

          sm:w-[390px]

          md:left-auto md:right-[-5px]
          md:translate-x-0
          md:w-[460px]
          md:opacity-[0.45]

          lg:bottom-[-65px]
          lg:w-[500px]
          lg:opacity-[0.6]

          lg:group-hover:opacity-[0.9]
        "
      />

      <div
        className="
          absolute left-[18px] right-[18px] top-[18px] z-10

          flex items-start gap-2

          md:left-6 md:right-auto md:top-5

          lg:left-10 lg:top-1/2
          lg:-translate-y-1/2
          lg:items-center lg:gap-5
        "
      >
        <img
          src={mapRouteIcon}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="
            h-10 w-10 shrink-0
            object-contain

            lg:h-16 lg:w-16
          "
        />

        <div>
          <h3
            id="map-banner-title"
            className="
              max-w-[215px]

              font-heading
              text-mobile-h2
              text-primary

              sm:max-w-[300px]

              lg:max-w-none
              lg:text-h3
            "
          >
            {t('interactiveMapBanner.title')}
          </h3>

          <p
            className="
              mt-2
              max-w-[210px]

              font-body
              text-mobile-small
              text-text-secondary

              sm:max-w-[320px]

              lg:max-w-[430px]
              lg:text-body-regular
            "
          >
            {t('interactiveMapBanner.description')}
          </p>
        </div>
      </div>

      <div
        className="
          absolute bottom-[18px] left-1/2 z-20
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