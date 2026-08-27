import {
  useState,
} from 'react'

import {
  Link,
  NavLink,
  useLocation,
} from 'react-router-dom'

import {
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'

import {
  useTranslation,
} from 'react-i18next'

import logoBg from '../../assets/logo-light.svg'
import logoEn from '../../assets/logo-light-en.svg'

import useActiveSection from '../../hooks/useActiveSection'

const HOME_SECTIONS = [
  'home',
  'destinations',
  'about',
]

const DESTINATION_LINKS = [
  {
    slug: 'rila-monastery',
    labelKey:
      'navigation.destinationItems.rilaMonastery',
  },
  {
    slug: 'old-nesebar',
    labelKey:
      'navigation.destinationItems.nessebar',
  },
  {
    slug: 'boyana-church',
    labelKey:
      'navigation.destinationItems.boyanaChurch',
  },
  {
    slug: 'madara-rider',
    labelKey:
      'navigation.destinationItems.madaraRider',
  },
  {
    slug: 'kazanlak-tomb',
    labelKey:
      'navigation.destinationItems.kazanlakTomb',
  },
]

function Header() {
  const [
    isMenuOpen,
    setIsMenuOpen,
  ] = useState(false)

  const [
    isDestinationsOpen,
    setIsDestinationsOpen,
  ] = useState(false)

  const location = useLocation()

  const {
    t,
    i18n,
  } = useTranslation()

  const locale =
    i18n.resolvedLanguage === 'en'
      ? 'en'
      : 'bg'

  const currentLogo =
    locale === 'en'
      ? logoEn
      : logoBg

  const activeSection =
    useActiveSection(HOME_SECTIONS)

  const isHomePage =
    location.pathname === '/'

  const getSectionLinkClass = (
    section
  ) => {
    const isActive =
      isHomePage &&
      (
        activeSection === section ||
        (
          !activeSection &&
          section === 'home'
        )
      )

    return `
      relative inline-block
      font-body text-link-navigation text-white
      after:absolute
      after:left-0
      after:bottom-[-3px]
      after:h-[2px]
      after:w-full
      after:bg-accent-orange
      after:origin-left
      after:transition-transform
      after:duration-200
      after:ease-out
      ${
        isActive
          ? 'after:scale-x-100'
          : 'after:scale-x-0 hover:after:scale-x-100'
      }
    `
  }

  const getRouteLinkClass = ({
    isActive,
  }) => `
    relative inline-block
    font-body text-link-navigation text-white
    after:absolute
    after:left-0
    after:bottom-[-3px]
    after:h-[2px]
    after:w-full
    after:bg-accent-orange
    after:origin-left
    after:transition-transform
    after:duration-200
    after:ease-out
    ${
      isActive
        ? 'after:scale-x-100'
        : 'after:scale-x-0 hover:after:scale-x-100'
    }
  `

  const closeMobileMenu = () => {
    setIsMenuOpen(false)
    setIsDestinationsOpen(false)
  }

  const handleLanguageChange = (
    language
  ) => {
    i18n.changeLanguage(language)

    localStorage.setItem(
      'language',
      language
    )
  }

  return (
    <header className="absolute left-0 top-0 z-[2000] w-full">
      {/* DESKTOP */}
      <div
        className="
          hidden w-full
          border border-header-stroke
          bg-header-glass
          backdrop-blur-[3px]
          md:block
        "
      >
        <div
          className="
            mx-auto
            flex
            h-(--header-height-desktop)
            max-w-main
            items-center
            justify-between

            lg:px-[20px]
            xl:px-0
          "
        >
          {/* Logo */}
          <Link
            to="/#home"
            className="shrink-0"
          >
            <img
              src={currentLogo}
              alt={t('footer.logoAlt')}
              className="h-auto w-(--logo-width-desktop)"
            />
          </Link>

          {/* Navigation */}
          <nav
            aria-label="Основна навигация"
            className="
              flex
              items-center
              gap-4
            "
          >
            <Link
              to="/#home"
              className={getSectionLinkClass(
                'home'
              )}
            >
              {t('navigation.home')}
            </Link>

            {/* DESTINATIONS DROPDOWN */}
            <div
              className="
                group
                relative
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-[5px]
                "
              >
                <Link
                  to="/#destinations"
                  className={getSectionLinkClass(
                    'destinations'
                  )}
                >
                  {t(
                    'navigation.destinations'
                  )}
                </Link>

                <ChevronDown
                  aria-hidden="true"
                  className="
                    h-[15px]
                    w-[15px]
                    shrink-0
                    text-white

                    transition-transform
                    duration-200
                    ease-out

                    group-hover:rotate-180
                    group-focus-within:rotate-180
                  "
                  strokeWidth={1.8}
                />
              </div>

              {/* DROPDOWN */}
              <div
                className="
                  invisible

                  absolute
                  left-1/2
                  top-full
                  z-[2200]

                  w-[270px]
                  -translate-x-1/2

                  pt-[14px]

                  opacity-0

                  transition-[opacity,visibility]
                  duration-200
                  ease-out

                  group-hover:visible
                  group-hover:opacity-100

                  group-focus-within:visible
                  group-focus-within:opacity-100
                "
              >
                <div
                  className="
                    overflow-hidden

                    rounded-md
                    border
                    border-border-light
                    bg-background-card

                    p-[6px]

                    shadow-hover
                  "
                >
                  {DESTINATION_LINKS.map(
                    (destination) => (
                      <NavLink
                        key={
                          destination.slug
                        }
                        to={`/destinations/${destination.slug}`}
                        className={({
                          isActive,
                        }) => `
                          flex
                          w-full
                          items-center

                          rounded-sm

                          px-[14px]
                          py-[10px]

                          font-body
                          text-body-small

                          transition-colors
                          duration-200
                          ease-out

                          ${
                            isActive
                              ? `
                                bg-accent-orange
                                text-white
                              `
                              : `
                                text-text-primary
                                hover:bg-accent-orange/10
                                hover:text-accent-orange
                              `
                          }

                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-accent-orange
                          focus-visible:ring-inset
                        `}
                      >
                        {t(
                          destination.labelKey
                        )}
                      </NavLink>
                    )
                  )}
                </div>
              </div>
            </div>

            <NavLink
              to="/map"
              className={getRouteLinkClass}
            >
              {t('navigation.map')}
            </NavLink>

            <Link
              to="/#about"
              className={getSectionLinkClass(
                'about'
              )}
            >
              {t('navigation.about')}
            </Link>
          </nav>

          {/* Language */}
          <div className="flex items-center font-body text-body-small">
            <button
              type="button"
              onClick={() =>
                handleLanguageChange('bg')
              }
              aria-pressed={
                locale === 'bg'
              }
              className={`
                transition-colors
                duration-200
                hover:text-accent-antique
                ${
                  locale === 'bg'
                    ? 'font-semibold text-white'
                    : 'text-white/70'
                }
              `}
            >
              BG
            </button>

            <span
              aria-hidden="true"
              className="mx-2 text-white/50"
            >
              |
            </span>

            <button
              type="button"
              onClick={() =>
                handleLanguageChange('en')
              }
              aria-pressed={
                locale === 'en'
              }
              className={`
                transition-colors
                duration-200
                hover:text-accent-antique
                ${
                  locale === 'en'
                    ? 'font-semibold text-white'
                    : 'text-white/70'
                }
              `}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden">
        {/* Mobile top bar */}
        <div
          className="
            flex
            h-(--spacing-6)
            items-center
            justify-between
            px-4

            border
            border-header-stroke
            bg-header-glass
            backdrop-blur-[3px]

            sm:px-6
            md:px-8
          "
        >
          <Link
            to="/#home"
            onClick={closeMobileMenu}
          >
            <img
              src={currentLogo}
              alt={t('footer.logoAlt')}
              className="h-auto w-(--logo-width-mobile)"
            />
          </Link>

          <button
            type="button"
            aria-label={
              isMenuOpen
                ? t(
                    'navigation.closeMenu'
                  )
                : t(
                    'navigation.openMenu'
                  )
            }
            aria-expanded={
              isMenuOpen
            }
            aria-controls="mobile-navigation"
            onClick={() =>
              setIsMenuOpen(
                (prev) => !prev
              )
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              text-white
            "
          >
            {isMenuOpen ? (
              <X
                aria-hidden="true"
                className="
                  h-(--icon-size-large)
                  w-(--icon-size-large)
                "
              />
            ) : (
              <Menu
                aria-hidden="true"
                className="
                  h-(--icon-size-large)
                  w-(--icon-size-large)
                "
              />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="
              absolute
              left-0
              top-0
              z-[2100]

              h-[492px]
              w-full
              overflow-y-auto

              border
              border-header-stroke
              bg-header-glass

              px-4
              pb-5
              pt-4

              backdrop-blur-[10px]

              sm:px-6
              md:px-8
            "
          >
            <div
              className="
                flex
                h-(--spacing-6)
                items-center
                justify-between
              "
            >
              <Link
                to="/#home"
                onClick={
                  closeMobileMenu
                }
              >
                <img
                  src={currentLogo}
                  alt={t('footer.logoAlt')}
                  className="h-auto w-[105px]"
                />
              </Link>

              <button
                type="button"
                aria-label={t(
                  'navigation.closeMenu'
                )}
                onClick={
                  closeMobileMenu
                }
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  text-white
                "
              >
                <X
                  aria-hidden="true"
                  className="
                    h-(--icon-size-large)
                    w-(--icon-size-large)
                  "
                />
              </button>
            </div>

            <nav
              aria-label="Мобилна навигация"
              className="
                flex
                flex-col
                items-center
                gap-(--nav-gap-desktop)
                pt-(--spacing-5)

                font-body
                text-mobile-link
                text-white
              "
            >
              <Link
                to="/#home"
                onClick={
                  closeMobileMenu
                }
              >
                {t('navigation.home')}
              </Link>

              {/* MOBILE DESTINATIONS */}
              <div
                className="
                  flex
                  w-full
                  flex-col
                  items-center
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    setIsDestinationsOpen(
                      (current) =>
                        !current
                    )
                  }
                  aria-expanded={
                    isDestinationsOpen
                  }
                  aria-controls="mobile-destinations-submenu"
                  className="
                    flex
                    items-center
                    gap-[5px]

                    font-body
                    text-mobile-link
                    text-white

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-accent-orange
                    focus-visible:ring-offset-2
                  "
                >
                  {t(
                    'navigation.destinations'
                  )}

                  <ChevronDown
                    aria-hidden="true"
                    className={`
                      h-[16px]
                      w-[16px]

                      transition-transform
                      duration-200
                      ease-out

                      ${
                        isDestinationsOpen
                          ? 'rotate-180'
                          : ''
                      }
                    `}
                    strokeWidth={1.8}
                  />
                </button>

                {isDestinationsOpen && (
                  <div
                    id="mobile-destinations-submenu"
                    className="
                      mt-[14px]

                      flex
                      w-full
                      max-w-[300px]
                      flex-col

                      overflow-hidden

                      rounded-md
                      border
                      border-white/15

                      bg-black/15

                      p-[6px]
                    "
                  >
                    {/* All destinations */}
                    <Link
                      to="/#destinations"
                      onClick={
                        closeMobileMenu
                      }
                      className="
                        rounded-sm

                        px-[14px]
                        py-[9px]

                        text-center

                        font-body
                        text-mobile-small
                        text-white/90

                        transition-colors
                        duration-200
                        ease-out

                        hover:bg-white/10

                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-accent-orange
                        focus-visible:ring-inset
                      "
                    >
                      {t(
                        'navigation.allDestinations'
                      )}
                    </Link>

                    {DESTINATION_LINKS.map(
                      (
                        destination
                      ) => (
                        <NavLink
                          key={
                            destination.slug
                          }
                          to={`/destinations/${destination.slug}`}
                          onClick={
                            closeMobileMenu
                          }
                          className={({
                            isActive,
                          }) => `
                            rounded-sm

                            px-[14px]
                            py-[9px]

                            text-center

                            font-body
                            text-mobile-small

                            transition-colors
                            duration-200
                            ease-out

                            ${
                              isActive
                                ? `
                                  bg-accent-orange
                                  text-white
                                `
                                : `
                                  text-white/90
                                  hover:bg-white/10
                                `
                            }

                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-accent-orange
                            focus-visible:ring-inset
                          `}
                        >
                          {t(
                            destination.labelKey
                          )}
                        </NavLink>
                      )
                    )}
                  </div>
                )}
              </div>

              <NavLink
                to="/map"
                onClick={
                  closeMobileMenu
                }
              >
                {t('navigation.map')}
              </NavLink>

              <Link
                to="/#about"
                onClick={
                  closeMobileMenu
                }
              >
                {t('navigation.about')}
              </Link>

              {/* MOBILE LANGUAGE */}
              <div className="flex items-center font-body text-body-small">
                <button
                  type="button"
                  onClick={() =>
                    handleLanguageChange(
                      'bg'
                    )
                  }
                  aria-pressed={
                    locale === 'bg'
                  }
                  className={
                    locale === 'bg'
                      ? 'font-semibold text-white'
                      : 'text-white/70'
                  }
                >
                  BG
                </button>

                <span
                  aria-hidden="true"
                  className="mx-2 text-white/50"
                >
                  |
                </span>

                <button
                  type="button"
                  onClick={() =>
                    handleLanguageChange(
                      'en'
                    )
                  }
                  aria-pressed={
                    locale === 'en'
                  }
                  className={
                    locale === 'en'
                      ? 'font-semibold text-white'
                      : 'text-white/70'
                  }
                >
                  EN
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header