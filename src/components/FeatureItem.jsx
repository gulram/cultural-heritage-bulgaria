function FeatureItem({
  icon: Icon,
  title,
  description,
}) {
  return (
    <article
      className="
        flex items-center gap-3
        md:flex-1
      "
    >
      {/* Icon container */}
      <div
        className="
          flex h-[42px] w-[42px]
          shrink-0
          items-center justify-center

          rounded-sm
          border border-white/10
          bg-black/25
          text-white
          backdrop-blur-[6px]

          md:h-[50px]
          md:w-[50px]
        "
      >
        <Icon
          aria-hidden="true"
          size={24}
          strokeWidth={1.5}
        />
      </div>

      {/* Content */}
      <div className="min-w-0">
        <h2
          className="
            font-body
            text-mobile-section
            text-white

            md:text-section-small
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-0.5
            max-w-[290px]
            font-body
            text-mobile-small
            text-white/85

            md:mt-1
            md:max-w-none
            md:text-body-small
            md:leading-[18px]
          "
        >
          {description}
        </p>
      </div>
    </article>
  )
}

export default FeatureItem