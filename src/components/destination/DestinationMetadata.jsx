import {
  MapPin,
  Star,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

function DestinationMetadata({
  location,
  unescoYear,
  variant = 'default',
}) {
  const { t } = useTranslation()

  const isLight = variant === 'light'

  const textClass = isLight
    ? 'text-white/90'
    : 'text-text-secondary'

  const iconClass = isLight
    ? 'text-white'
    : 'text-accent-orange'

  return (
    <div className="flex min-w-0 flex-col gap-1">
      <div
        className={`
          flex items-center gap-1
          font-body text-mobile-small
          lg:text-body-small
          ${textClass}
        `}
      >
        <MapPin
          aria-hidden="true"
          strokeWidth={1.8}
          className={`
            h-(--icon-size-small) w-(--icon-size-small) shrink-0
            ${iconClass}
          `}
        />

        <span>{location}</span>
      </div>

      <div
        className={`
          flex items-start gap-1
          font-body text-mobile-small
          lg:text-body-small
          ${textClass}
        `}
      >
        <Star
          aria-hidden="true"
          strokeWidth={1.8}
          className={`
            mt-0.5
            h-(--icon-size-small) w-(--icon-size-small) shrink-0
            ${iconClass}
          `}
        />

        <span>
          {t('destinationMetadata.unescoSince', {
            year: unescoYear,
          })}
        </span>
      </div>
    </div>
  )
}

export default DestinationMetadata