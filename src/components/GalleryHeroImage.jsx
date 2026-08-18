function GalleryHeroImage({
  src,
  alt,
  className = '',
}) {
  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-[12px]

        ${className}
      `}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
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
    </div>
  )
}

export default GalleryHeroImage