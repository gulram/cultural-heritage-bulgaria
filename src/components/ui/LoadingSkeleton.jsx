import { MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function LoadingSkeleton({
  className = '',
}) {
  const { t } = useTranslation()

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`
        w-full

        rounded-lg
        border
        border-border-light
        bg-surface

        p-5

        shadow-default

        ${className}
      `}
    >
      <div
        className="
          flex
          h-[180px]
          w-full
          items-center
          justify-center

          rounded-md
          bg-black/10

          animate-pulse
        "
      >
        <MapPin
          aria-hidden="true"
          className="
            h-(--icon-size-large)
            w-(--icon-size-large)

            text-black/25
          "
          strokeWidth={1.5}
        />
      </div>

      <div
        className="
          mt-4
          flex
          flex-col
          gap-2
        "
      >
        <div
          aria-hidden="true"
          className="
            h-(--spacing-2)
            w-2/3

            rounded-sm
            bg-black/10

            animate-pulse
          "
        />

        <div
          aria-hidden="true"
          className="
            h-(--spacing-1)
            w-4/5

            rounded-sm
            bg-black/10

            animate-pulse
          "
        />

        <div
          aria-hidden="true"
          className="
            h-(--spacing-1)
            w-3/5

            rounded-sm
            bg-black/10

            animate-pulse
          "
        />

        <div
          aria-hidden="true"
          className="
            h-(--spacing-1)
            w-1/2

            rounded-sm
            bg-black/10

            animate-pulse
          "
        />
      </div>

      <div
        aria-hidden="true"
        className="
          mt-4
          h-(--spacing-5)
          w-(--spacing-8)

          rounded-md
          bg-black/15

          animate-pulse
        "
      />

      <span className="sr-only">
        {t('common.loading')}
      </span>
    </div>
  )
}

export default LoadingSkeleton