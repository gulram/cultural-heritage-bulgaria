import { Link } from 'react-router-dom'

const BASE_STYLES = `
  inline-flex h-5
  items-center justify-center gap-1

  rounded-md
  px-2
  whitespace-nowrap

  font-body
  text-button

  transition-[background-color,border-color,color,box-shadow]
  duration-[180ms] ease-out

  focus-visible:outline-none
`

const VARIANT_STYLES = {
  filled: `
    border border-transparent
    bg-accent-orange
    text-white

    hover:bg-accent-antique
    hover:shadow-button

    focus-visible:bg-accent-light
    focus-visible:shadow-focus
  `,

  outline: `
    border border-accent-orange
    bg-surface
    text-accent-orange

    hover:border-accent-antique
    hover:text-accent-antique
    hover:shadow-button

    focus-visible:border-accent-light
    focus-visible:text-accent-light
    focus-visible:shadow-focus
  `,

  primary: `
    border border-transparent
    bg-primary
    text-white
    shadow-button

    hover:bg-accent-orange

    focus-visible:shadow-focus
  `,
}

function Button({
  children,
  to,
  variant = 'filled',
  icon: Icon,
  iconPosition = 'right',
  iconSize = 20,
  type = 'button',
  disabled = false,
  className = '',
  onClick,
  ...props
}) {
  const variantStyles =
    VARIANT_STYLES[variant] ?? VARIANT_STYLES.filled

  const disabledStyles = disabled
    ? 'pointer-events-none opacity-50'
    : ''

  const classes = `
    ${BASE_STYLES}
    ${variantStyles}
    ${disabledStyles}
    ${className}
  `

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon
          aria-hidden="true"
          size={iconSize}
          className="shrink-0"
          strokeWidth={1.8}
        />
      )}

      <span>{children}</span>

      {Icon && iconPosition === 'right' && (
        <Icon
          aria-hidden="true"
          size={iconSize}
          className="shrink-0"
          strokeWidth={1.8}
        />
      )}
    </>
  )

  if (to) {
    const handleLinkClick = (event) => {
      if (disabled) {
        event.preventDefault()
        return
      }

      onClick?.(event)
    }

    return (
      <Link
        {...props}
        to={to}
        onClick={handleLinkClick}
        className={classes}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      {...props}
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {content}
    </button>
  )
}

export default Button