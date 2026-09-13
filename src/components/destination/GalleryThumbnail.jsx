import { useState } from 'react'

import ImageFallback from '../ui/ImageFallback'

function GalleryThumbnail({
  src,
  alt,
  ariaLabel,
  className = '',
  onClick,
  isSelected = false,
}) {
  const [failedImage, setFailedImage] = useState(null)

  const hasValidImage =
    Boolean(src) && failedImage !== src

  const selectionClass = isSelected
    ? 'border-accent-orange'
    : 'border-transparent'

  const imageClass = isSelected
    ? 'opacity-100 saturate-100'
    : 'opacity-55 saturate-50 group-hover:opacity-80 group-hover:saturate-75'

  const handleImageError = () => {
    setFailedImage(src)
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || alt || undefined}
      aria-pressed={isSelected}
      className={`
        group relative block overflow-hidden

        rounded-md
        border-2
        text-left

        transition-[border-color]
        duration-200 ease-out

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-accent-orange
        focus-visible:ring-offset-2

        ${selectionClass}
        ${className}
      `}
    >
      {hasValidImage ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={handleImageError}
          className={`
            h-full w-full object-cover

            transition-[transform,opacity,filter]
            duration-300 ease-out

            group-hover:scale-[1.04]

            ${imageClass}
          `}
        />
      ) : (
        <ImageFallback
          compact
          className="
            h-full w-full
            rounded-none
            border-0
            shadow-none
          "
        />
      )}
    </button>
  )
}

export default GalleryThumbnail