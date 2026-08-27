import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import DestinationMetadata from '../destination/DestinationMetadata'
import Button from '../ui/Button'
import ImageFallback from '../ui/ImageFallback'

function DestinationCard({
  number,
  title,
  description,
  location,
  unescoYear,
  image,
  slug,
  imagePosition = 'left',
}) {
  const { t } = useTranslation()
  const [failedImage, setFailedImage] = useState(null)

  const isImageRight =
    imagePosition === 'right'

  const hasValidImage =
    Boolean(image) &&
    failedImage !== image

  return (
    <article
      className={`
        group
        relative

        flex
        w-full
        flex-col
        overflow-hidden

        rounded-lg
        border
        border-border-light
        bg-background-card

        shadow-default

        transition-shadow
        duration-[160ms]
        ease-in

        hover:shadow-hover
        hover:duration-200
        hover:ease-out

        md:min-h-[300px]

        lg:h-[300px]

        xl:h-[230px]
        xl:min-h-0
        xl:max-w-main

        ${
          isImageRight
            ? 'md:flex-row-reverse'
            : 'md:flex-row'
        }
      `}
    >
      <div
        className="
          relative

          h-[180px]
          w-full
          shrink-0
          overflow-hidden

          rounded-lg

          md:h-auto
          md:w-[45%]
          md:self-stretch

          xl:w-[500px]
        "
      >
        {hasValidImage ? (
          <>
            <img
              src={image}
              alt={title}
              loading="lazy"
              onError={() => setFailedImage(image)}
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

            <div
              aria-hidden="true"
              className="
                absolute
                inset-0

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
          </>
        ) : (
          <ImageFallback
            className="
              h-full

              rounded-none
              border-0

              p-0

              shadow-none
            "
          />
        )}

        <div
          className={`
            absolute
            top-2

            flex
            h-[42px]
            w-[42px]
            items-center
            justify-center

            rounded-md
            border
            border-white
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
                ? 'right-2'
                : 'left-2'
            }
          `}
        >
          {number}
        </div>
      </div>

      <div
        className="
          relative

          flex
          min-w-0
          flex-1
          flex-col
          overflow-hidden

          px-4
          py-2

          sm:px-5

          md:h-full
          md:flex-1
          md:justify-center
          md:px-4
          md:py-[20px]

          lg:px-5

          xl:w-[700px]
          xl:flex-none
          xl:px-4
          xl:py-2
        "
      >
        <div
          className="
            relative
            z-10
          "
        >
          <h3
            className="
              font-heading
              text-mobile-h2
              text-text-primary

              lg:text-h3
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-1
              max-w-[560px]

              font-body
              text-mobile-body
              text-text-secondary

              md:mt-2

              lg:text-body-small

              xl:mt-1
            "
          >
            {description}
          </p>
        </div>

        <div
          className="
            relative
            z-10

            mt-3

            flex
            flex-col
            gap-3

            md:mt-2

            lg:grid
            lg:grid-cols-[1fr_auto]
            lg:items-end
            lg:gap-2

            xl:mt-2
            xl:gap-5
          "
        >
          <DestinationMetadata
            location={location}
            unescoYear={unescoYear}
          />

          <div
            className="
              self-end

              lg:self-auto
            "
          >
            <Button
              to={`/destinations/${slug}`}
              variant="filled"
              icon={ArrowRight}
              iconSize={16}
            >
              {t('destinationCard.explore')}
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default DestinationCard