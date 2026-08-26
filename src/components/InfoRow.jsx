function InfoRow({
  icon: Icon,
  title,
  children,
}) {
  return (
    <div
      className="
        grid
        w-full
        grid-cols-[var(--spacing-3)_minmax(0,1fr)]
        items-start
        gap-2
      "
    >
      {/* Icon */}
      <Icon
        aria-hidden="true"
        className="
          h-3
          w-3
          shrink-0
          text-accent-orange
        "
        strokeWidth={1.5}
      />

      {/* Text */}
      <div className="min-w-0">
        <h3
          className="
            font-body
            text-mobile-section
            text-text-primary

            lg:text-section-small
          "
        >
          {title}
        </h3>

        <div
          className="
            mt-1
            font-body
            text-mobile-small
            text-text-secondary

            lg:text-body-small
          "
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default InfoRow