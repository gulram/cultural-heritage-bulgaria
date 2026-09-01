import { MapPin } from 'lucide-react'

function MapDestinationItem({
  destination,
  isSelected = false,
  onClick,
}) {
  const borderClass = isSelected
    ? 'border-accent-orange shadow-hover'
    : 'border-border-light'

  const numberClass = isSelected
    ? 'bg-accent-terracotta'
    : 'bg-accent-orange'

  const handleClick = () => {
    onClick?.(destination)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isSelected}
      className={`
        group
        flex w-full min-w-0 items-center gap-2

        rounded-md
        border
        bg-background-card

        px-3 py-2
        text-left
        shadow-default

        transition-[border-color,box-shadow,transform]
        duration-200 ease-out

        hover:-translate-y-[1px]
        hover:border-accent-orange
        hover:shadow-hover

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-accent-orange
        focus-visible:ring-offset-2

        ${borderClass}
      `}
    >
      <span
        className={`
          flex h-4 w-4 shrink-0
          items-center justify-center

          rounded-md

          font-heading
          text-[18px] font-semibold
          text-white

          transition-colors duration-200

          ${numberClass}
        `}
      >
        {destination.number}
      </span>

      <span className="min-w-0 flex-1">
        <span
          className="
            block truncate

            font-heading
            text-mobile-h3
            text-text-primary
          "
        >
          {destination.title}
        </span>

        <span
          className="
            mt-1
            flex items-center gap-1

            font-body
            text-mobile-small
            text-text-secondary

            lg:text-body-small
          "
        >
          <MapPin
            aria-hidden="true"
            strokeWidth={1.8}
            className="
              h-(--icon-size-small)
              w-(--icon-size-small)
              shrink-0
              text-accent-orange
            "
          />

          <span className="truncate">
            {destination.location}
          </span>
        </span>
      </span>
    </button>
  )
}

export default MapDestinationItem