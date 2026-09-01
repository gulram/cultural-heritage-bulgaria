import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function MapHero({ image }) {
  const { t } = useTranslation()
  const [failedImage, setFailedImage] = useState(null)

  const hasValidImage =
    Boolean(image) && failedImage !== image

  return (
    <section
      className="
        relative min-h-[260px]
        overflow-hidden
        bg-primary

        md:min-h-[280px]
      "
    >
      {hasValidImage && (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          onError={() => setFailedImage(image)}
          className="
            absolute inset-0

            h-full w-full
            object-cover object-center
          "
        />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/40"
      />

      <div
        className="
          relative z-10 mx-auto

          flex min-h-[260px] w-full max-w-main
          items-center

          px-4 pt-[72px]

          sm:px-6

          md:min-h-[280px]
          md:px-4

          lg:px-5

          xl:px-0
        "
      >
        <div className="max-w-[700px] text-white">
          <h1
            className="
              font-heading
              text-mobile-h1

              md:text-h1
            "
          >
            {t('mapPage.title')}
          </h1>

          <p
            className="
              mt-3 max-w-[650px]

              font-body
              text-mobile-body

              md:text-body-regular
            "
          >
            {t('mapPage.description')}
          </p>
        </div>
      </div>
    </section>
  )
}

export default MapHero