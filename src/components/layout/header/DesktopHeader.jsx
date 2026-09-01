import {
  Link,
  NavLink,
} from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import HeaderLogo from './HeaderLogo'
import LanguageSwitcher from './LanguageSwitcher'
import { DESTINATION_LINKS } from './navigationConfig'

const BASE_NAV_LINK_CLASS = `
  relative inline-block

  font-body
  text-link-navigation
  text-white

  after:absolute
  after:bottom-[-3px]
  after:left-0
  after:h-[2px]
  after:w-full

  after:origin-left
  after:bg-accent-orange

  after:transition-transform
  after:duration-200
  after:ease-out
`

function DesktopHeader({
  activeSection,
  isHomePage,
}) {
  const { t } = useTranslation()

  const getSectionLinkClass = (section) => {
    const isActive =
      isHomePage &&
      (
        activeSection === section ||
        (!activeSection && section === 'home')
      )

    return `
      ${BASE_NAV_LINK_CLASS}

      ${
        isActive
          ? 'after:scale-x-100'
          : 'after:scale-x-0 hover:after:scale-x-100'
      }
    `
  }

  const getRouteLinkClass = ({ isActive }) => `
    ${BASE_NAV_LINK_CLASS}

    ${
      isActive
        ? 'after:scale-x-100'
        : 'after:scale-x-0 hover:after:scale-x-100'
    }
  `

  return (
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
          flex h-(--header-height-desktop) max-w-main
          items-center justify-between

          lg:px-[20px]
          xl:px-0
        "
      >
        <HeaderLogo />

        <nav
          aria-label={t('navigation.mainNavigationAriaLabel')}
          className="flex items-center gap-4"
        >
          <Link
            to="/#home"
            className={getSectionLinkClass('home')}
          >
            {t('navigation.home')}
          </Link>

          <div className="group relative">
            <div className="flex items-center gap-[5px]">
              <Link
                to="/#destinations"
                className={getSectionLinkClass('destinations')}
              >
                {t('navigation.destinations')}
              </Link>

              <ChevronDown
                aria-hidden="true"
                strokeWidth={1.8}
                className="
                  h-[15px] w-[15px] shrink-0
                  text-white

                  transition-transform duration-200 ease-out

                  group-hover:rotate-180
                  group-focus-within:rotate-180
                "
              />
            </div>

            <div
              className="
                invisible
                absolute left-1/2 top-full z-[2200]
                w-[270px] -translate-x-1/2
                pt-[14px]

                opacity-0

                transition-[opacity,visibility]
                duration-200 ease-out

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
                  border border-border-light
                  bg-background-card
                  p-[6px]

                  shadow-hover
                "
              >
                {DESTINATION_LINKS.map((destination) => (
                  <NavLink
                    key={destination.slug}
                    to={`/destinations/${destination.slug}`}
                    className={({ isActive }) => `
                      flex w-full items-center

                      rounded-sm
                      px-[14px] py-[10px]

                      font-body
                      text-body-small

                      transition-colors duration-200 ease-out

                      ${
                        isActive
                          ? 'bg-accent-orange text-white'
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
                    {t(destination.labelKey)}
                  </NavLink>
                ))}
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
            className={getSectionLinkClass('about')}
          >
            {t('navigation.about')}
          </Link>
        </nav>

        <LanguageSwitcher />
      </div>
    </div>
  )
}

export default DesktopHeader