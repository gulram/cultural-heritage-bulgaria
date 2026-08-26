import {
  useState,
} from 'react'

import { ArrowLeft } from 'lucide-react'

import {
  useTranslation,
} from 'react-i18next'

import Button from './Button'
import DestinationMetadata from './DestinationMetadata'
import ImageFallback from './ImageFallback'

function DestinationHero({
  title,
  image,
  location,
  unescoYear,
}) {
  const { t } = useTranslation()

  const [
    failedImage,
    setFailedImage,
  ] = useState(null)

  const hasValidImage =
    Boolean(image) &&
    failedImage !== image

  return (
    <section
      className="
        relative
        min-h-[340px]
        overflow-hidden

        md:min-h-[380px]
      "
    >
      {/* Hero image */}
      {hasValidImage ? (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          onError={() =>
            setFailedImage(image)
          }
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
          "
        />
      ) : (
        <ImageFallback
          className="
            absolute
            inset-0
            h-full

            rounded-none
            border-0
            shadow-none

            [&_h3]:hidden
            [&_p]:hidden
          "
        />
      )}

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-black/45
        "
      />

      {/* Content */}
      <div
        className="
          relative
          z-10

          mx-auto
          flex
          min-h-[340px]
          w-full
          max-w-main
          flex-col
          justify-end

          px-5
          pb-10
          pt-[100px]

          md:min-h-[380px]

          xl:px-0
        "
      >
        <Button
          to="/#destinations"
          variant="filled"
          icon={ArrowLeft}
          iconPosition="left"
          iconSize={16}
          className="mb-5 self-start"
        >
          {t(
            'destinationHero.allDestinations'
          )}
        </Button>

        <h1
          className="
            font-heading
            text-mobile-h1
            text-white

            lg:text-h1
          "
        >
          {title}
        </h1>

        <div className="mt-4">
          <DestinationMetadata
            location={location}
            unescoYear={unescoYear}
            variant="light"
          />
        </div>
      </div>
    </section>
  )
}

export default DestinationHero