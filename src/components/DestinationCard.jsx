import {
  ArrowRight,
} from 'lucide-react'

import DestinationMetadata from './DestinationMetadata'
import Button from './Button'

function DestinationCard({
  number,
  title,
  description,
  location,
  unescoYear,
  image,
  watermark,
  slug,
  imagePosition = 'left',
}) {
  const isImageRight = imagePosition === 'right'

  return (
    <article
      className={`
        group
        relative
        flex w-full
        flex-col
        overflow-hidden

        rounded-lg
        border border-border-light
        bg-background-card
        shadow-default

        transition-shadow
        duration-[160ms]
        ease-in

        hover:shadow-hover
        hover:duration-200
        hover:ease-out

        md:h-[260px]

        xl:h-[230px]
        xl:max-w-[1200px]

        ${
          isImageRight
            ? 'md:flex-row-reverse'
            : 'md:flex-row'
        }
      `}
    >
      {/* IMAGE */}
      <div
        className="
          relative
          h-[180px]
          w-full
          shrink-0
          overflow-hidden

          md:h-full
          md:w-[45%]

          xl:w-[500px]
        "
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="
            h-full
            w-full
            object-cover

            transition-transform
            duration-[160ms]
            ease-in

            group-hover:scale-[1.03]
            group-hover:duration-200
            group-hover:ease-out
          "
        />

        {/* DEFAULT DARK OVERLAY */}
        <div
          aria-hidden="true"
          className="
            absolute inset-0
            bg-black/20

            opacity-100

            transition-opacity
            duration-[160ms]
            ease-in

            group-hover:opacity-0
            group-hover:duration-200
            group-hover:ease-out
          "
        />

        {/* DESTINATION NUMBER */}
        <div
          className={`
            absolute
            top-4

            flex h-[42px] w-[42px]
            items-center
            justify-center

            rounded-md
            border border-white
            bg-accent-orange
            shadow-button

            font-heading
            text-[24px]
            font-semibold
            leading-none
            text-white

            opacity-100

            transition-[opacity,transform]
            duration-[160ms]
            ease-in

            group-hover:scale-95
            group-hover:opacity-0
            group-hover:duration-200
            group-hover:ease-out

            ${
              isImageRight
                ? 'right-4'
                : 'left-4'
            }
          `}
        >
          {number}
        </div>
      </div>

      {/* CONTENT */}
      <div
        className="
          relative
          flex
          min-w-0
          flex-1
          flex-col
          overflow-hidden

          px-5
          py-4

          md:h-full
          md:flex-1
          md:justify-center
          md:px-5
          md:py-5

          xl:w-[700px]
          xl:flex-none
          xl:px-[30px]
          xl:py-8
        "
      >
        {/* WATERMARK */}
        {watermark && (
          <img
            src={watermark}
            alt=""
            aria-hidden="true"
            className={`
              pointer-events-none
              absolute

              bottom-[-35px]
              h-auto
              w-[550px]

              object-contain
              opacity-[0.2]

              ${
                isImageRight
                  ? 'left-[-45px]'
                  : 'right-[-85px]'
              }
            `}
          />
        )}

        {/* TOP CONTENT */}
        <div className="relative z-10">
          <h2
            className="
              font-heading
              text-mobile-h2
              font-semibold
              text-text-primary

              md:text-h3
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-2
              max-w-[560px]

              font-body
              text-mobile-body
              text-text-secondary

              md:mt-1.5
              md:text-body-small

              xl:mt-2
              
            "
          >
            {description}
          </p>
        </div>

        {/* BOTTOM CONTENT */}
        <div
          className="
            relative z-10

            mt-3
            flex
            flex-col
            gap-3

            md:mt-2

            lg:grid
            lg:grid-cols-[1fr_auto]
            lg:items-end
            lg:gap-4

            xl:mt-4
            xl:gap-5
          "
        >
          <DestinationMetadata
            location={location}
            unescoYear={unescoYear}
          />
          {/* CTA */}
          <div className="self-end lg:self-auto">
            <Button
              to={`/destinations/${slug}`}
              variant="filled"
              icon={ArrowRight}
              iconSize={16}
            >
              Разгледай
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default DestinationCard