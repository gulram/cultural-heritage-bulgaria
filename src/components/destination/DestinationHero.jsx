import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'

import Button from '../ui/Button'
import DestinationMetadata from './DestinationMetadata'

function DestinationHero({
  title,
  image,
  location,
  unescoYear,
}) {
  const { t } = useTranslation()
  const [failedImage, setFailedImage] = useState(null)

  const hasValidImage =
    Boolean(image) && failedImage !== image

  const handleImageError = () => {
    setFailedImage(image)
  }

  return (
    <section
      className="
        relative min-h-[340px] overflow-hidden bg-primary
        md:min-h-[380px]
      "
    >
      {hasValidImage && (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          onError={handleImageError}
          className="
            absolute inset-0
            h-full w-full object-cover object-center
          "
        />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/45"
      />

      <div
        className="
          relative z-10 mx-auto
          
          flex min-h-[340px] w-full max-w-main flex-col justify-end
          
          px-4 pb-10 pt-[100px]
          
          sm:px-6
          md:min-h-[380px] md:px-4
          lg:px-5
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
          {t('destinationHero.allDestinations')}
        </Button>

        <h1
          className="
            font-heading text-mobile-h1 text-white
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