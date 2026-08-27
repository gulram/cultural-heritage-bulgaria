import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import Button from '../ui/Button'
import ImageFallback from '../ui/ImageFallback'

function RelatedDestinationCard({
  title,
  image,
  slug,
}) {
  const { t } = useTranslation()
  const [failedImage, setFailedImage] = useState(null)

  const hasValidImage =
    Boolean(image) &&
    failedImage !== image

  return (
    <article
      className="
        group
        relative
        min-h-[220px]
        w-full
        overflow-hidden

        rounded-md
        border
        border-accent-orange

        shadow-default

        transition-shadow
        duration-200
        ease-out

        hover:shadow-hover
      "
    >
      {hasValidImage ? (
        <img
          src={image}
          alt=""
          loading="lazy"
          onError={() => setFailedImage(image)}
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
      ) : (
        <ImageFallback
          compact
          className="
            absolute
            inset-0

            h-full
            rounded-none
            border-0
            shadow-none
          "
        />
      )}

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
          {t('destinationCard.explore')}
        </Button>
      </div>
    </article>
  )
}

export default RelatedDestinationCard