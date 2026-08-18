// 


import {
  MapPin,
  Star,
} from 'lucide-react'

function DestinationMetadata({
  location,
  unescoYear,
  variant = 'default',
}) {
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
          gap-2

          font-body
          text-body-small

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
            h-[15px]
            w-[15px]
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
          gap-2

          font-body
          text-body-small

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
            h-[15px]
            w-[15px]
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
          В Списъка на световното наследство на ЮНЕСКО от{' '}
          <span className="whitespace-nowrap">
            {unescoYear} г.
          </span>
        </span>
      </div>
    </div>
  )
}

export default DestinationMetadata