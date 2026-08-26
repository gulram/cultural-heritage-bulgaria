import {
  useEffect,
  useState,
} from 'react'

import {
  useTranslation,
} from 'react-i18next'

import {
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  X,
} from 'lucide-react'

import GalleryHeroImage from './GalleryHeroImage'
import GalleryThumbnail from './GalleryThumbnail'

function DestinationGallery({
  gallery = [],
  destinationTitle,
}) {
  const { t } = useTranslation()

  const [
    isGalleryModalOpen,
    setIsGalleryModalOpen,
  ] = useState(false)

  const [
    activeGalleryIndex,
    setActiveGalleryIndex,
  ] = useState(0)

  const galleryLength =
    gallery.length

  const openGallery = (
    index = 0
  ) => {
    if (galleryLength === 0) {
      return
    }

    setActiveGalleryIndex(index)
    setIsGalleryModalOpen(true)
  }

  const closeGallery = () => {
    setIsGalleryModalOpen(false)
  }

  const showPreviousImage = () => {
    if (galleryLength === 0) {
      return
    }

    setActiveGalleryIndex(
      (currentIndex) =>
        currentIndex === 0
          ? galleryLength - 1
          : currentIndex - 1
    )
  }

  const showNextImage = () => {
    if (galleryLength === 0) {
      return
    }

    setActiveGalleryIndex(
      (currentIndex) =>
        currentIndex ===
        galleryLength - 1
          ? 0
          : currentIndex + 1
    )
  }

  /*
   * GALLERY MODAL
   * - Escape затваря галерията
   * - ArrowLeft / ArrowRight сменят снимките
   * - блокиране на scroll-а на страницата
   */
  useEffect(() => {
    if (
      !isGalleryModalOpen ||
      galleryLength === 0
    ) {
      return
    }

    const handleKeyDown = (
      event
    ) => {
      if (
        event.key === 'Escape'
      ) {
        setIsGalleryModalOpen(
          false
        )
      }

      if (
        event.key === 'ArrowLeft'
      ) {
        setActiveGalleryIndex(
          (currentIndex) =>
            currentIndex === 0
              ? galleryLength - 1
              : currentIndex - 1
        )
      }

      if (
        event.key === 'ArrowRight'
      ) {
        setActiveGalleryIndex(
          (currentIndex) =>
            currentIndex ===
            galleryLength - 1
              ? 0
              : currentIndex + 1
        )
      }
    }

    const previousOverflow =
      document.body.style.overflow

    document.body.style.overflow =
      'hidden'

    window.addEventListener(
      'keydown',
      handleKeyDown
    )

    return () => {
      document.body.style.overflow =
        previousOverflow

      window.removeEventListener(
        'keydown',
        handleKeyDown
      )
    }
  }, [
    isGalleryModalOpen,
    galleryLength,
  ])

  return (
    <>
      {/* GALLERY */}
      <section
        aria-labelledby="gallery-title"
        className="
          mt-6

          border-t
          border-border-light

          pt-6
        "
      >
        <h2
          id="gallery-title"
          className="
            font-heading
            text-mobile-h2
            uppercase
            text-primary

            md:text-h3
          "
        >
          {t(
            'destination.gallery'
          )}
        </h2>

        <div
          className="
            mt-6

            grid
            grid-cols-1
            gap-2

            sm:grid-cols-2

            lg:grid-cols-4
          "
        >
          {gallery
            .slice(0, 3)
            .map(
              (
                image,
                index
              ) => (
                <GalleryHeroImage
                  key={image.id}
                  src={image.url}
                  alt={image.alt}
                  onClick={() =>
                    openGallery(
                      index
                    )
                  }
                  className="
                    h-[180px]

                    lg:h-[160px]
                  "
                />
              )
            )}

          {/* VIEW MORE */}
          {galleryLength > 0 && (
            <button
              type="button"
              onClick={() =>
                openGallery(0)
              }
              className="
                flex
                min-h-[160px]
                flex-col
                items-center
                justify-center
                gap-3

                rounded-md

                border
                border-border-light

                bg-background-card

                px-4

                shadow-default

                transition-[border-color,box-shadow]
                duration-200
                ease-out

                hover:border-accent-orange
                hover:shadow-hover

                focus-visible:outline-none
                focus-visible:shadow-focus
              "
            >
              <ImageIcon
                aria-hidden="true"
                size={24}
                strokeWidth={1.6}
                className="text-accent-orange"
              />

              <span
                className="
                  font-body
                  text-mobile-small
                  text-text-primary
                  md:text-body-small
                "
              >
                {t(
                  'destination.viewAllPhotos'
                )}
              </span>
            </button>
          )}
        </div>
      </section>

      {/* GALLERY MODAL */}
      {isGalleryModalOpen &&
        galleryLength > 0 && (
          <div
            className="
              fixed
              inset-0
              z-[9999]

              flex
              items-center
              justify-center

              bg-black/35

              px-4
              py-6
            "
            onMouseDown={(
              event
            ) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closeGallery()
              }
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="gallery-modal-title"
              className="
                relative

                w-full
                max-w-[1180px]
                max-h-[92vh]
                overflow-y-auto

                rounded-lg

                border
                border-border-light

                bg-background-card

                px-4
                py-4

                shadow-hover

                md:px-6
                md:py-4
              "
            >
              {/* GALLERY HEADER */}
              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-6
                "
              >
                <div>
                  <h2
                    id="gallery-modal-title"
                    className="
                      font-heading
                      text-mobile-h2
                      text-text-primary

                      md:text-h3
                    "
                  >
                    {destinationTitle}
                  </h2>

                  <p
                    className="
                      mt-1

                      font-body
                      text-mobile-small
                      text-text-secondary

                      md:text-body-small
                    "
                  >
                    {t(
                      'destination.photoCounter',
                      {
                        current:
                          activeGalleryIndex +
                          1,
                        total:
                          galleryLength,
                      }
                    )}
                  </p>
                </div>

                {/* CLOSE */}
                <button
                  type="button"
                  aria-label={t(
                    'destination.closeGallery'
                  )}
                  onClick={
                    closeGallery
                  }
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center

                    text-text-primary

                    transition-colors
                    duration-200
                    ease-out

                    hover:text-accent-orange

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-accent-orange
                    focus-visible:ring-offset-2
                  "
                >
                  <X
                    aria-hidden="true"
                    size={22}
                    strokeWidth={1.7}
                  />
                </button>
              </div>

              {/* ACTIVE IMAGE */}
              <div
                className="
                  relative
                  mt-4

                  overflow-hidden
                  rounded-lg

                  bg-black/5
                "
              >
                <img
                  src={
                    gallery[
                      activeGalleryIndex
                    ].url
                  }
                  alt={
                    gallery[
                      activeGalleryIndex
                    ].alt
                  }
                  className="
                    h-[250px]
                    w-full
                    object-contain

                    sm:h-[380px]

                    lg:h-[460px]
                  "
                />

                {/* PREVIOUS */}
                <button
                  type="button"
                  aria-label={t(
                    'destination.previousPhoto'
                  )}
                  onClick={
                    showPreviousImage
                  }
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2

                    flex
                    h-11
                    w-11
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-white/70

                    bg-black/25
                    text-white

                    backdrop-blur-sm

                    transition-colors
                    duration-200
                    ease-out

                    hover:bg-black/45
                  "
                >
                  <ChevronLeft
                    aria-hidden="true"
                    size={28}
                    strokeWidth={1.7}
                  />
                </button>

                {/* NEXT */}
                <button
                  type="button"
                  aria-label={t(
                    'destination.nextPhoto'
                  )}
                  onClick={
                    showNextImage
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2

                    flex
                    h-11
                    w-11
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-white/70

                    bg-black/25
                    text-white

                    backdrop-blur-sm

                    transition-colors
                    duration-200
                    ease-out

                    hover:bg-black/45
                  "
                >
                  <ChevronRight
                    aria-hidden="true"
                    size={28}
                    strokeWidth={1.7}
                  />
                </button>
              </div>

              {/* THUMBNAILS */}
              <div
                className="
                  mt-3

                  flex
                  gap-3
                  overflow-x-auto

                  pb-1

                  lg:justify-center
                "
              >
                {gallery.map(
                  (
                    image,
                    index
                  ) => (
                    <GalleryThumbnail
                      key={image.id}
                      src={image.url}
                      alt={image.alt}
                      onClick={() =>
                        setActiveGalleryIndex(
                          index
                        )
                      }
                      className="
                        h-[60px]
                        w-[96px]
                        shrink-0
                      "
                    />
                  )
                )}
              </div>
            </section>
          </div>
        )}
    </>
  )
}

export default DestinationGallery