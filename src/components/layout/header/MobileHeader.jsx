import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import HeaderLogo from './HeaderLogo'
import LanguageSwitcher from './LanguageSwitcher'
import { DESTINATION_LINKS } from './navigationConfig'

function MobileHeader() {
  const { t } = useTranslation()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false)

  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsDestinationsOpen(false)
  }

  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        setIsDestinationsOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  return (
    <div className="md:hidden">
      <div
        className="
          flex h-(--spacing-6)
          items-center justify-between

          border border-header-stroke
          bg-header-glass
          px-4

          backdrop-blur-[3px]

          sm:px-6
        "
      >
        <HeaderLogo
          mobile
          onClick={closeMenu}
        />

        <button
          type="button"
          aria-label={
            isMenuOpen
              ? t('navigation.closeMenu')
              : t('navigation.openMenu')
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="
            flex h-10 w-10
            items-center justify-center

            text-white

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-accent-orange
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

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="
            absolute left-0 top-0 z-[2100]
            h-[492px] w-full
            overflow-y-auto

            border border-header-stroke
            bg-header-glass

            px-4 pb-5 pt-4

            backdrop-blur-[10px]

            sm:px-6
          "
        >
          <div
            className="
              flex h-(--spacing-6)
              items-center justify-between
            "
          >
            <HeaderLogo
              mobile
              onClick={closeMenu}
            />

            <button
              type="button"
              aria-label={t('navigation.closeMenu')}
              onClick={closeMenu}
              className="
                flex h-10 w-10
                items-center justify-center

                text-white

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-accent-orange
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
            aria-label={t('navigation.mobileNavigationAriaLabel')}
            className="
              flex flex-col items-center

              gap-(--nav-gap-desktop)
              pt-(--spacing-5)

              font-body
              text-mobile-link
              text-white
            "
          >
            <Link
              to="/#home"
              onClick={closeMenu}
            >
              {t('navigation.home')}
            </Link>

            <div className="flex w-full flex-col items-center">
              <button
                type="button"
                onClick={() =>
                  setIsDestinationsOpen((current) => !current)
                }
                aria-expanded={isDestinationsOpen}
                aria-controls="mobile-destinations-submenu"
                className="
                  flex items-center gap-[5px]

                  font-body
                  text-mobile-link
                  text-white

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-accent-orange
                  focus-visible:ring-offset-2
                "
              >
                {t('navigation.destinations')}

                <ChevronDown
                  aria-hidden="true"
                  strokeWidth={1.8}
                  className={`
                    h-[16px] w-[16px]

                    transition-transform duration-200 ease-out

                    ${isDestinationsOpen ? 'rotate-180' : ''}
                  `}
                />
              </button>

              {isDestinationsOpen && (
                <div
                  id="mobile-destinations-submenu"
                  className="
                    mt-[14px]

                    flex w-full max-w-[300px] flex-col
                    overflow-hidden

                    rounded-md
                    border border-white/15
                    bg-black/15

                    p-[6px]
                  "
                >
                  <Link
                    to="/#destinations"
                    onClick={closeMenu}
                    className="
                      rounded-sm
                      px-[14px] py-[9px]

                      text-center

                      font-body
                      text-mobile-small
                      text-white/90

                      transition-colors duration-200 ease-out

                      hover:bg-white/10

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-accent-orange
                      focus-visible:ring-inset
                    "
                  >
                    {t('navigation.allDestinations')}
                  </Link>

                  {DESTINATION_LINKS.map((destination) => (
                    <NavLink
                      key={destination.slug}
                      to={`/destinations/${destination.slug}`}
                      onClick={closeMenu}
                      className={({ isActive }) => `
                        rounded-sm
                        px-[14px] py-[9px]

                        text-center

                        font-body
                        text-mobile-small

                        transition-colors duration-200 ease-out

                        ${
                          isActive
                            ? 'bg-accent-orange text-white'
                            : 'text-white/90 hover:bg-white/10'
                        }

                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-accent-orange
                        focus-visible:ring-inset
                      `}
                    >
                      {t(destination.labelKey)}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <NavLink
              to="/map"
              onClick={closeMenu}
            >
              {t('navigation.map')}
            </NavLink>

            <Link
              to="/#about"
              onClick={closeMenu}
            >
              {t('navigation.about')}
            </Link>

            <LanguageSwitcher />
          </nav>
        </div>
      )}
    </div>
  )
}

export default MobileHeader