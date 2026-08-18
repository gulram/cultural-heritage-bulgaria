function GalleryThumbnail({
  src,
  alt,
  isSelected = false,
  onClick,
  ariaLabel,
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`
        shrink-0
        overflow-hidden

        rounded-[8px]

        border-2

        transition-[border-color,opacity]
        duration-200
        ease-out

        ${
          isSelected
            ? 'border-accent-orange opacity-100'
            : 'border-transparent opacity-75 hover:opacity-100'
        }
      `}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="
          h-[56px]
          w-[88px]
          object-cover

          md:h-[60px]
          md:w-[96px]
        "
      />
    </button>
  )
}

export default GalleryThumbnail