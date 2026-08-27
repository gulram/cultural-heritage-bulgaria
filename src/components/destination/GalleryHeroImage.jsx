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
    Boolean(src) &&
    failedImage !== src

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || alt}
      className={`
        group
        relative
        block
        w-full
        overflow-hidden
        rounded-md
        text-left

        ${className}
      `}
    >
      {hasValidImage ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailedImage(src)}
          className="
            h-full
            w-full
            object-cover

            transition-transform
            duration-300
            ease-out

            group-hover:scale-[1.04]
          "
        />
      ) : (
        <ImageFallback
          compact
          className="
            h-full
            w-full
            min-h-full

            rounded-md
            border
            border-border-light
            shadow-none
          "
        />
      )}
    </button>
  )
}

export default GalleryHeroImage