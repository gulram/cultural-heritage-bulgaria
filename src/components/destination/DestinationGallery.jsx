import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image as ImageIcon } from 'lucide-react'

import GalleryHeroImage from './GalleryHeroImage'
import GalleryModal from './GalleryModal'

function DestinationGallery({
  gallery = [],
  destinationTitle,
}) {
  const { t } = useTranslation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const galleryLength = gallery.length

  const openGallery = (index = 0) => {
    if (galleryLength === 0) return

    setActiveIndex(index)
    setIsModalOpen(true)
  }

  const closeGallery = () => {
    setIsModalOpen(false)
  }

  const showPreviousImage = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0
        ? galleryLength - 1
        : currentIndex - 1
    )
  }

  const showNextImage = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === galleryLength - 1
        ? 0
        : currentIndex + 1
    )
  }

  if (galleryLength === 0) {
    return null
  }

  return (
    <>
      <section
        aria-labelledby="gallery-title"
        className="
          mt-6 border-t border-border-light pt-6
        "
      >
        <h2
          id="gallery-title"
          className="
            font-heading text-mobile-h2 uppercase text-primary
            md:text-h3
          "
        >
          {t('destination.gallery')}
        </h2>

        <div
          className="
            mt-6 grid grid-cols-1 gap-2
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {gallery.slice(0, 3).map((image, index) => (
            <GalleryHeroImage
              key={image.id}
              src={image.url}
              alt={image.alt}
              onClick={() => openGallery(index)}
              className="h-[180px] lg:h-[160px]"
            />
          ))}

          <button
            type="button"
            onClick={() => openGallery(0)}
            className="
              flex min-h-[160px] flex-col items-center justify-center gap-3
              
              rounded-md border border-border-light
              
              bg-background-card px-4 shadow-default
              
              transition-[border-color,box-shadow] duration-200 ease-out
              hover:border-accent-orange 
              hover:shadow-hover
              focus-visible:outline-none focus-visible:shadow-focus
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
                font-body text-mobile-small text-text-primary
                md:text-body-small
              "
            >
              {t('destination.viewAllPhotos')}
            </span>
          </button>
        </div>
      </section>

      {isModalOpen && (
        <GalleryModal
          gallery={gallery}
          activeIndex={activeIndex}
          destinationTitle={destinationTitle}
          onClose={closeGallery}
          onPrevious={showPreviousImage}
          onNext={showNextImage}
          onSelect={setActiveIndex}
        />
      )}
    </>
  )
}

export default DestinationGallery