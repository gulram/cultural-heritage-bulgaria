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
          h-10
          w-10
          shrink-0
          items-center
          justify-center

          text-primary

          lg:h-11
          lg:w-11
        "
      >
        <Icon
          aria-hidden="true"
          className="
            h-8
            w-8
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
            text-body-small
            leading-3
            text-text-secondary
          "
        >
          {description}
        </p>
      </div>
    </article>
  )
}

export default KeyFactCard