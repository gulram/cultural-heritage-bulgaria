import { ArrowRight } from 'lucide-react'

import Button from './Button'

function RelatedDestinationCard({
  title,
  image,
  slug,
}) {
  return (
    <article
      className="
        group
        relative
        min-h-[220px]
        w-full
        overflow-hidden

        rounded-[14px]
        border
        border-accent-orange

        shadow-default

        transition-shadow
        duration-200
        ease-out

        hover:shadow-hover
      "
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="
          absolute
          inset-0

          h-full
          w-full
          object-cover

          transition-transform
          duration-200
          ease-out

          group-hover:scale-[1.03]
        "
      />

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0

          bg-gradient-to-t
          from-black/75
          via-black/25
          to-black/5
        "
      />

      {/* Content */}
      <div
        className="
          relative
          z-10

          flex
          min-h-[220px]
          flex-col
          items-start
          justify-end

          p-4
        "
      >
        <h3
          className="
            font-heading
            text-mobile-h3
            font-semibold
            text-white

            lg:text-h3
          "
        >
          {title}
        </h3>

        <Button
          to={`/destinations/${slug}`}
          variant="filled"
          icon={ArrowRight}
          iconSize={16}
          className="mt-3"
        >
          Разгледай
        </Button>
      </div>
    </article>
  )
}

export default RelatedDestinationCard