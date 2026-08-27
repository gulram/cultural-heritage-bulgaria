import {
  useState,
} from 'react'

import ImageFallback from '../ui/ImageFallback'

function GalleryThumbnail({
  src,
  alt,
  className = '',
  onClick,
}) {
  const [
    failedImage,
    setFailedImage,
  ] = useState(null)

  const hasValidImage =
    Boolean(src) &&
    failedImage !== src

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={alt}
      className={`
        group
        relative
        block
        overflow-hidden
        rounded-md
        text-left

        ${onClick ? 'cursor-pointer' : ''}

        ${className}
      `}
    >
      {hasValidImage ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() =>
            setFailedImage(src)
          }
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