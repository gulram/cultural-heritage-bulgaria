import { LoaderCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function PageLoader() {
  const { t } = useTranslation()

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="
        flex
        min-h-screen
        w-full
        items-center
        justify-center

        bg-background-primary
      "
    >
      <LoaderCircle
        aria-hidden="true"
        className="
          h-(--icon-size-large)
          w-(--icon-size-large)

          animate-spin

          text-accent-orange
        "
        strokeWidth={1.8}
      />

      <span className="sr-only">
        {t('common.loading')}
      </span>
    </div>
  )
}

export default PageLoader