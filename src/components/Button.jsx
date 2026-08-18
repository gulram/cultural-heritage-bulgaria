import { Link } from 'react-router-dom'

const BASE_STYLES = `
  inline-flex
  h-12
  items-center
  justify-center
  gap-2
  rounded-md
  px-4

  font-body
  text-button
  font-medium

  transition-[background-color,border-color,color,box-shadow]
  duration-[180ms]
  ease-out

  focus-visible:outline-none

  disabled:pointer-events-none
  disabled:opacity-50
`

const VARIANT_STYLES = {
  filled: `
    border
    border-transparent
    bg-accent-orange
    text-white

    hover:bg-accent-gold
    hover:shadow-button

    focus-visible:bg-accent-light
    focus-visible:shadow-button-focus
  `,

  outline: `
    border
    border-accent-orange
    bg-surface
    text-accent-orange

    hover:border-accent-gold
    hover:text-accent-gold
    hover:shadow-button

    focus-visible:border-accent-light
    focus-visible:text-accent-light
    focus-visible:shadow-button-focus
  `,

  primary: `
    border
    border-transparent
    bg-primary
    text-white
    shadow-button

    hover:bg-accent-orange

    focus-visible:shadow-button-focus
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
  ...props
}) {
  const classes = `
    ${BASE_STYLES}
    ${VARIANT_STYLES[variant] ?? VARIANT_STYLES.filled}
    ${disabled ? 'pointer-events-none opacity-50' : ''}
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
    return (
      <Link
        to={to}
        className={classes}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        {...props}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  )
}

export default Button