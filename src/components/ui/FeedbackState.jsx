import {
  Search,
  TriangleAlert,
} from 'lucide-react'

import Button from './Button'

const VARIANTS = {
  error: {
    icon: TriangleAlert,
  },
  empty: {
    icon: Search,
  },
}

function FeedbackState({
  variant = 'error',
  title,
  description,
  actionLabel,
  onAction,
  to,
  className = '',
}) {
  const { icon: Icon } =
    VARIANTS[variant] ?? VARIANTS.error

  const hasAction = Boolean(
    actionLabel && (onAction || to)
  )

  return (
    <div
      className={`
        flex w-full flex-col
        items-center justify-center

        rounded-lg
        border border-border-light
        bg-surface
        p-5
        text-center
        shadow-default

        ${className}
      `}
    >
      <div
        className="
          flex h-(--spacing-6) w-(--spacing-6)
          items-center justify-center

          rounded-full
          bg-accent-orange/20
          text-accent-orange
        "
      >
        <Icon
          aria-hidden="true"
          className="
            h-(--icon-size-large)
            w-(--icon-size-large)
          "
          strokeWidth={1.6}
        />
      </div>

      <p
        className="
          mt-3

          font-body
          text-mobile-h3
          text-text-primary

          lg:text-section
        "
      >
        {title}
      </p>

      {description && (
        <p
          className="
            mt-2 max-w-[320px]

            font-body
            text-mobile-small
            text-text-secondary

            lg:text-body-small
          "
        >
          {description}
        </p>
      )}

      {hasAction && (
        <Button
          to={to}
          variant="filled"
          onClick={onAction}
          className="mt-3"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default FeedbackState