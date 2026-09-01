import { useEffect, useRef, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import GalleryThumbnail from './GalleryThumbnail'
import ImageFallback from '../ui/ImageFallback'

const FOCUSABLE_ELEMENTS = `
  button:not([disabled]),
  [href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  [tabindex]:not([tabindex="-1"])
`

function GalleryModal({
  gallery = [],
  activeIndex,
  destinationTitle,
  onClose,
  onPrevious,
  onNext,
  onSelect,
}) {
  const { t } = useTranslation()

  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const [failedImage, setFailedImage] = useState(null)

  const galleryLength = gallery.length
  const activeImage = gallery[activeIndex]

  const hasValidImage =
    Boolean(activeImage?.url) &&
    failedImage !== activeImage.url

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousActiveElement = document.activeElement

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow

      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus()
      }
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === 'ArrowLeft') {
        onPrevious()
        return
      }

      if (event.key === 'ArrowRight') {
        onNext()
        return
      }

      if (event.key !== 'Tab') return

      const dialog = dialogRef.current

      if (!dialog) return

      const focusableElements = Array.from(
        dialog.querySelectorAll(FOCUSABLE_ELEMENTS)
      ).filter(
        (element) =>
          element instanceof HTMLElement &&
          !element.hasAttribute('disabled') &&
          element.offsetParent !== null
      )

      if (focusableElements.length === 0) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement =
        focusableElements[focusableElements.length - 1]

      const activeElement = document.activeElement

      if (
        event.shiftKey &&
        activeElement === firstElement
      ) {
        event.preventDefault()
        lastElement.focus()
        return
      }

      if (
        !event.shiftKey &&
        activeElement === lastElement
      ) {
        event.preventDefault()
        firstElement.focus()
        return
      }

      if (
        activeElement &&
        !dialog.contains(activeElement)
      ) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, onPrevious, onNext])

  if (!activeImage) {
    return null
  }

  const handleImageError = () => {
    setFailedImage(activeImage.url)
  }

  const handleBackdropMouseDown = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/85
        md:bg-black/35 md:px-8 md:py-6
        lg:px-5
      "
      onMouseDown={handleBackdropMouseDown}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-modal-title"
        tabIndex={-1}
        className="
          relative
          max-h-[100dvh] w-full
          bg-transparent
          focus:outline-none
          md:max-h-[92vh] md:max-w-[1180px] md:overflow-y-auto
          md:rounded-lg md:border md:border-border-light
          md:bg-background-card md:px-6 md:py-4
          md:shadow-hover
        "
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={t('destination.closeGallery')}
          className="
            absolute right-2 top-2 z-20
            flex h-4 w-4 items-center justify-center
            rounded-full border border-white/50
            bg-black/45 text-white backdrop-blur-sm
            transition-colors duration-200 ease-out
            hover:bg-black/65
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-white
            md:right-3 md:top-3
          "
        >
          <X
            aria-hidden="true"
            size={20}
            strokeWidth={1.8}
          />
        </button>

        <div className="md:pr-[48px]">
          <h2
            id="gallery-modal-title"
            className="
              sr-only
              md:not-sr-only md:font-heading
              md:text-h3 md:text-text-primary
            "
          >
            {destinationTitle}
          </h2>

          <p
            className="
              sr-only
              md:not-sr-only md:mt-1
              md:font-body md:text-body-small md:text-text-secondary
            "
          >
            {t('destination.photoCounter', {
              current: activeIndex + 1,
              total: galleryLength,
            })}
          </p>
        </div>

        <div
          className="
            relative
            flex w-full items-center justify-center
            overflow-hidden
            md:mt-4 md:block
            md:rounded-lg md:bg-black/5
          "
        >
          {hasValidImage ? (
            <img
              src={activeImage.url}
              alt={activeImage.alt}
              onError={handleImageError}
              className="
                h-auto max-h-[68dvh] w-full object-contain
                md:h-[380px] md:max-h-none
                lg:h-[460px]
              "
            />
          ) : (
            <ImageFallback
              className="
                h-[320px]
                rounded-none border-0 shadow-none
                md:h-[380px] md:rounded-lg
                lg:h-[460px]
              "
            />
          )}

          {galleryLength > 1 && (
            <>
              <button
                type="button"
                aria-label={t('destination.previousPhoto')}
                onClick={onPrevious}
                className="
                  absolute left-2 top-1/2 -translate-y-1/2

                  flex h-11 w-11
                  items-center justify-center

                  rounded-full
                  border border-white/70
                  bg-black/35
                  text-white
                  backdrop-blur-sm

                  transition-colors duration-200 ease-out

                  hover:bg-black/55

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white

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
                aria-label={t('destination.nextPhoto')}
                onClick={onNext}
                className="
                  absolute right-2 top-1/2 -translate-y-1/2

                  flex h-11 w-11 
                  items-center justify-center

                  rounded-full 
                  border border-white/70
                  bg-black/35 
                  text-white 
                  backdrop-blur-sm
                  
                  transition-colors duration-200 ease-out
                  
                  hover:bg-black/55
                  
                  focus-visible:outline-none
                  focus-visible:ring-2 
                  focus-visible:ring-white
                  
                  md:right-4
                "
              >
                <ChevronRight
                  aria-hidden="true"
                  size={28}
                  strokeWidth={1.7}
                />
              </button>
            </>
          )}
        </div>

        {galleryLength > 1 && (
          <div
            className="
              mt-2
              flex justify-center gap-2 overflow-x-auto
              px-3 pb-3
              md:mt-3 md:justify-start md:gap-3 md:px-0 md:pb-1
              lg:justify-center
            "
          >
            {gallery.map((image, index) => (
              <GalleryThumbnail
                key={image.id}
                src={image.url}
                alt={image.alt}
                onClick={() => onSelect(index)}
                className="
                  h-[44px] w-[64px] shrink-0
                  md:h-[60px] md:w-[96px]
                "
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default GalleryModal