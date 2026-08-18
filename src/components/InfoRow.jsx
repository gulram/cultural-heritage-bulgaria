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
        grid-cols-[24px_minmax(0,1fr)]
        items-start
        gap-4
      "
    >
      {/* Icon */}
      <Icon
        aria-hidden="true"
        className="
          h-4
          w-4
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
            text-section-small
            text-text-primary
          "
        >
          {title}
        </h3>

        <div
          className="
            mt-1
            font-body
            text-body-small
            text-text-secondary
          "
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default InfoRow