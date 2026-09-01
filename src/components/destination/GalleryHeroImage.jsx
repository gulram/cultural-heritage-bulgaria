import { useState } from 'react'

import ImageFallback from '../ui/ImageFallback'

function GalleryHeroImage({
  src,
  alt,
  ariaLabel,
  className = '',
  onClick,
}) {
  const [failedImage, setFailedImage] = useState(null)

  const hasValidImage =
    Boolean(src) && failedImage !== src

  const handleImageError = () => {
    setFailedImage(src)
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || alt || undefined}
      className={`
        group relative block w-full overflow-hidden
        rounded-md text-left
        
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-accent-orange
        focus-visible:ring-offset-2
        ${className}
      `}
    >
      {hasValidImage ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={handleImageError}
          className="
            h-full w-full object-cover
            transition-transform duration-300 ease-out
            group-hover:scale-[1.04]
          "
        />
      ) : (
        <ImageFallback
          compact
          className="
            h-full min-h-full w-full
            rounded-md border border-border-light
            shadow-none
          "
        />
      )}
    </button>
  )
}

export default GalleryHeroImage