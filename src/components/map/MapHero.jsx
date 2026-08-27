import {
  useTranslation,
} from 'react-i18next'

function MapHero({
  image,
}) {
  const { t } = useTranslation()

  return (
    <section
      className="
        relative
        min-h-[260px]
        overflow-hidden

        bg-cover
        bg-center

        md:min-h-[280px]
      "
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {/* Overlay */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-black/40
        "
      />

      {/* Content */}
      <div
        className="
          relative
          z-10

          mx-auto
          flex
          min-h-[260px]
          w-full
          max-w-main
          items-center

          px-4
          pt-[72px]

          sm:px-6

          md:min-h-[280px]
          md:px-8

          lg:px-5

          xl:px-0
        "
      >
        <div
          className="
            max-w-[700px]
            text-white
          "
        >
          <h1
            className="
              font-heading
              text-mobile-h1

              md:text-h1
            "
          >
            {t(
              'mapPage.title'
            )}
          </h1>

          <p
            className="
              mt-3
              max-w-[650px]

              font-body
              text-mobile-body

              md:text-body-regular
            "
          >
            {t(
              'mapPage.description'
            )}
          </p>
        </div>
      </div>
    </section>
  )
}

export default MapHero