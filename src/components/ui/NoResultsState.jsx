import { ArrowRight, Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import Button from './Button'

function NoResultsState({
  className = '',
}) {
  const { t } = useTranslation()

  return (
    <div
      className={`
        flex
        h-fit
        w-full
        flex-col
        items-center
        justify-center

        rounded-lg
        border
        border-border-light
        bg-surface

        p-5
        text-center

        shadow-default

        ${className}
      `}
    >
      <Search
        aria-hidden="true"
        className="
          h-(--spacing-5)
          w-(--spacing-5)

          text-accent-orange
        "
        strokeWidth={1.5}
      />

      <p
        className="
          mt-4

          font-body
          text-mobile-h2
          text-text-primary

          md:text-h3
        "
      >
        {t('feedback.noResults.title')}
      </p>

      <p
        className="
          mt-2
          max-w-[430px]

          font-body
          text-mobile-body
          text-text-secondary

          md:text-body-regular
        "
      >
        {t('feedback.noResults.description')}
      </p>

      <Button
        to="/map"
        variant="filled"
        icon={ArrowRight}
        iconPosition="right"
        iconSize={16}
        className="mt-4"
      >
        {t('feedback.noResults.openMap')}
      </Button>
    </div>
  )
}

export default NoResultsState