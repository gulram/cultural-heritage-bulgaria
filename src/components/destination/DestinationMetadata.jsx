import {
  MapPin,
  Star,
} from 'lucide-react'

import {
  useTranslation,
} from 'react-i18next'

function DestinationMetadata({
  location,
  unescoYear,
  variant = 'default',
}) {
  const { t } = useTranslation()

  const isLight = variant === 'light'

  return (
    <div
      className="
        flex
        min-w-0
        flex-col
        gap-1
      "
    >
      {/* Location */}
      <div
        className={`
          flex
          items-center
          gap-1

          font-body
          text-mobile-small

          lg:text-body-small

          ${
            isLight
              ? 'text-white/90'
              : 'text-text-secondary'
          }
        `}
      >
        <MapPin
          aria-hidden="true"
          className={`
            h-(--icon-size-small)
            w-(--icon-size-small)
            shrink-0

            ${
              isLight
                ? 'text-white'
                : 'text-accent-orange'
            }
          `}
          strokeWidth={1.8}
        />

        <span>{location}</span>
      </div>

      {/* UNESCO */}
      <div
        className={`
          flex
          items-start
          gap-1

          font-body
          text-mobile-small

          lg:text-body-small

          ${
            isLight
              ? 'text-white/90'
              : 'text-text-secondary'
          }
        `}
      >
        <Star
          aria-hidden="true"
          className={`
            mt-0.5
            h-(--icon-size-small)
            w-(--icon-size-small)
            shrink-0

            ${
              isLight
                ? 'text-white'
                : 'text-accent-orange'
            }
          `}
          strokeWidth={1.8}
        />

        <span>
          {t(
            'destinationMetadata.unescoSince',
            {
              year: unescoYear,
            }
          )}
        </span>
      </div>
    </div>
  )
}

export default DestinationMetadata