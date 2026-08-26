function KeyFactCard({
  icon: Icon,
  value,
  description,
}) {
  return (
    <article
      className="
        flex
        min-w-0
        shrink-0
        items-center
        gap-2
      "
    >
      {/* Icon */}
      <div
        className="
          flex
          h-(--spacing-5)
          w-(--spacing-5)
          shrink-0
          items-center
          justify-center

          text-primary
        "
      >
        <Icon
          aria-hidden="true"
          className="
            h-(--spacing-4)
            w-(--spacing-4)
          "
          strokeWidth={1.4}
        />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p
          className="
            whitespace-nowrap

            font-heading
            text-mobile-h3
            uppercase
            text-primary

            lg:text-h3
          "
        >
          {value}
        </p>

        <p
          className="
            mt-1
            max-w-[175px]

            font-body
            text-mobile-small
            text-text-secondary

            lg:text-body-small
          "
        >
          {description}
        </p>
      </div>
    </article>
  )
}

export default KeyFactCard