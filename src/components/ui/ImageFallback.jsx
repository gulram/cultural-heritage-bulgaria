import {
  ImageOff,
} from 'lucide-react'

import {
  useTranslation,
} from 'react-i18next'

function ImageFallback({
  className = '',
  compact = false,
}) {
  const { t } = useTranslation()

  return (
    <div
      className={`
        flex
        w-full
        flex-col
        items-center
        justify-center

        rounded-lg
        border
        border-border-light
        bg-surface

        text-center

        shadow-default

        ${
          compact
            ? 'p-2'
            : 'p-5'
        }

        ${className}
      `}
    >
      {/* ICON */}
      <div
        className={`
          flex
          shrink-0
          items-center
          justify-center

          rounded-full
          bg-accent-orange/20
          text-accent-orange

          ${
            compact
              ? 'h-[36px] w-[36px]'
              : 'h-(--spacing-6) w-(--spacing-6)'
          }
        `}
      >
        <ImageOff
          aria-hidden="true"
          className={`
            ${
              compact
                ? 'h-[18px] w-[18px]'
                : `
                  h-(--icon-size-large)
                  w-(--icon-size-large)
                `
            }
          `}
          strokeWidth={1.6}
        />
      </div>

      {!compact && (
        <>
          {/* TITLE */}
          <p
            className="
              mt-4

              font-body
              text-mobile-h2
              text-text-primary

              md:text-h3
            "
          >
            {t(
              'feedback.noImage.title'
            )}
          </p>

          {/* DESCRIPTION */}
          <p
            className="
              mt-2
              max-w-[280px]

              font-body
              text-mobile-body
              text-text-secondary

              md:text-body-regular
            "
          >
            {t(
              'feedback.noImage.description'
            )}
          </p>
        </>
      )}
    </div>
  )
}

export default ImageFallback