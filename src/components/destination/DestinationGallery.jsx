import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
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

  const [isGalleryModalOpen, setIsGalleryModalOpen] =
    useState(false)

  const [activeGalleryIndex, setActiveGalleryIndex] =
    useState(0)

  const galleryLength = gallery.length

  const openGallery = (index = 0) => {
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

    setActiveGalleryIndex((currentIndex) =>
      currentIndex === 0
        ? galleryLength - 1
        : currentIndex - 1
    )
  }

  const showNextImage = () => {
    if (galleryLength === 0) {
      return
    }

    setActiveGalleryIndex((currentIndex) =>
      currentIndex === galleryLength - 1
        ? 0
        : currentIndex + 1
    )
  }

  useEffect(() => {
    if (
      !isGalleryModalOpen ||
      galleryLength === 0
    ) {
      return
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsGalleryModalOpen(false)
      }

      if (event.key === 'ArrowLeft') {
        setActiveGalleryIndex((currentIndex) =>
          currentIndex === 0
            ? galleryLength - 1
            : currentIndex - 1
        )
      }

      if (event.key === 'ArrowRight') {
        setActiveGalleryIndex((currentIndex) =>
          currentIndex === galleryLength - 1
            ? 0
            : currentIndex + 1
        )
      }
    }

    const previousOverflow =
      document.body.style.overflow

    document.body.style.overflow = 'hidden'

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
          {t('destination.gallery')}
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
            .map((image, index) => (
              <GalleryHeroImage
                key={image.id}
                src={image.url}
                alt={image.alt}
                onClick={() =>
                  openGallery(index)
                }
                className="
                  h-[180px]

                  lg:h-[160px]
                "
              />
            ))}

          {galleryLength > 0 && (
            <button
              type="button"
              onClick={() => openGallery(0)}
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
                {t('destination.viewAllPhotos')}
              </span>
            </button>
          )}
        </div>
      </section>

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

              bg-black/85

              md:bg-black/35
              md:px-8
              md:py-6

              lg:px-5
            "
            onMouseDown={(event) => {
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
                max-h-[100dvh]

                bg-transparent

                md:max-w-[1180px]
                md:max-h-[92vh]
                md:overflow-y-auto

                md:rounded-lg

                md:border
                md:border-border-light

                md:bg-background-card

                md:px-6
                md:py-4

                md:shadow-hover
              "
            >
              <div
                className="
                  absolute
                  right-3
                  top-3
                  z-20

                  md:static
                  md:flex
                  md:items-start
                  md:justify-between
                  md:gap-6
                "
              >
                <div className="hidden md:block">
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

                <h2
                  id="gallery-modal-title-mobile"
                  className="sr-only md:hidden"
                >
                  {destinationTitle}
                </h2>

                <button
                  type="button"
                  aria-label={t(
                    'destination.closeGallery'
                  )}
                  onClick={closeGallery}
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center

                    rounded-full

                    bg-black/35
                    text-white

                    backdrop-blur-sm

                    transition-colors
                    duration-200
                    ease-out

                    hover:bg-black/55

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-accent-orange
                    focus-visible:ring-offset-2

                    md:h-9
                    md:w-9
                    md:rounded-none
                    md:bg-transparent
                    md:text-text-primary
                    md:backdrop-blur-none

                    md:hover:bg-transparent
                    md:hover:text-accent-orange
                  "
                >
                  <X
                    aria-hidden="true"
                    size={22}
                    strokeWidth={1.7}
                  />
                </button>
              </div>

              <div
                className="
                  relative

                  flex
                  h-[72dvh]
                  w-full
                  items-center
                  justify-center

                  overflow-hidden

                  md:mt-4
                  md:block
                  md:h-auto
                  md:rounded-lg
                  md:bg-black/5
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
                    h-full
                    w-full
                    object-contain

                    md:h-[380px]

                    lg:h-[460px]
                  "
                />

                <button
                  type="button"
                  aria-label={t(
                    'destination.previousPhoto'
                  )}
                  onClick={showPreviousImage}
                  className="
                    absolute
                    left-2
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

                    bg-black/35
                    text-white

                    backdrop-blur-sm

                    transition-colors
                    duration-200
                    ease-out

                    hover:bg-black/55

                    md:left-4
                  "
                >
                  <ChevronLeft
                    aria-hidden="true"
                    size={28}
                    strokeWidth={1.7}
                  />
                </button>

                <button
                  type="button"
                  aria-label={t(
                    'destination.nextPhoto'
                  )}
                  onClick={showNextImage}
                  className="
                    absolute
                    right-2
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

                    bg-black/35
                    text-white

                    backdrop-blur-sm

                    transition-colors
                    duration-200
                    ease-out

                    hover:bg-black/55

                    md:right-4
                  "
                >
                  <ChevronRight
                    aria-hidden="true"
                    size={28}
                    strokeWidth={1.7}
                  />
                </button>
              </div>

              <div
                className="
                  mt-2

                  flex
                  justify-center
                  gap-2
                  overflow-x-auto

                  px-3
                  pb-3

                  md:mt-3
                  md:justify-start
                  md:gap-3
                  md:px-0
                  md:pb-1

                  lg:justify-center
                "
              >
                {gallery.map(
                  (image, index) => (
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
                        h-[44px]
                        w-[64px]
                        shrink-0

                        md:h-[60px]
                        md:w-[96px]
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