import {
  Link,
  NavLink,
  useLocation,
} from 'react-router-dom'

import {
  useTranslation,
} from 'react-i18next'

import logoBg from '../assets/logo-light.svg'
import logoEn from '../assets/logo-light-en.svg'

import useActiveSection from '../hooks/useActiveSection'

const HOME_SECTIONS = [
  'home',
  'destinations',
  'about',
]

function Footer() {
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

  const projectNote =
    locale === 'en'
      ? 'This website was developed as an educational diploma project and is not an official UNESCO website.'
      : 'Уебсайтът е разработен като образователен дипломен проект и не е официален уебсайт на ЮНЕСКО.'

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
      relative
      inline-block

      font-body
      text-mobile-small
      text-white/80

      after:absolute
      after:left-0
      after:bottom-[-3px]
      after:h-[2px]
      after:w-full
      after:origin-left
      after:bg-accent-orange
      after:transition-transform
      after:duration-200
      after:ease-out

      ${
        isActive
          ? 'after:scale-x-100'
          : 'after:scale-x-0 hover:after:scale-x-100'
      }

      lg:text-body-small
    `
  }

  const getRouteLinkClass = ({
    isActive,
  }) => `
    relative
    inline-block

    font-body
    text-mobile-small
    text-white/80

    after:absolute
    after:left-0
    after:bottom-[-3px]
    after:h-[2px]
    after:w-full
    after:origin-left
    after:bg-accent-orange
    after:transition-transform
    after:duration-200
    after:ease-out

    ${
      isActive
        ? 'after:scale-x-100'
        : 'after:scale-x-0 hover:after:scale-x-100'
    }

    lg:text-body-small
  `

  return (
    <footer
      className="
        w-full
        bg-primary
        text-white
      "
    >
      <div
        className="
          mx-auto
          max-w-main

          px-5
          py-6

          lg:px-0
          lg:pb-6
          lg:pt-4
        "
      >
        {/* MAIN FOOTER CONTENT */}
        <div
          className="
            grid
            grid-cols-1

            lg:grid-cols-[1.15fr_0.8fr_1fr]
            lg:pb-3
          "
        >
          {/* BRAND */}
          <div
            className="
              flex
              items-start
              gap-4
              pb-5

              lg:block
              lg:pb-6
              lg:pr-10
            "
          >
            <Link
              to="/#home"
              className="shrink-0"
            >
              <img
                src={currentLogo}
                alt={t('footer.logoAlt')}
                className="
                  h-auto
                  w-[105px]

                  lg:w-[150px]
                "
              />
            </Link>

            <p
              className="
                max-w-[210px]

                font-body
                text-mobile-small
                text-white/85

                lg:mt-3
                lg:max-w-[290px]
                lg:text-body-small
              "
            >
              {t('footer.description')}
            </p>
          </div>

          {/* NAVIGATION */}
          <div
            className="
              border-t
              border-white/15

              py-5

              lg:border-l
              lg:border-t-0
              lg:px-10
              lg:py-2
            "
          >
            <h2
              className="
                font-body
                text-[12px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-white
              "
            >
              {t('footer.navigation')}
            </h2>

            <nav
              aria-label={t(
                'footer.navigationAriaLabel'
              )}
              className="
                mt-4

                flex
                flex-col
                items-start
                gap-3
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
          </div>

          {/* PROJECT INFORMATION */}
          <div
            className="
              border-t
              border-white/15

              py-5

              lg:border-l
              lg:border-t-0
              lg:py-2
              lg:pl-10
            "
          >
            <h2
              className="
                font-body
                text-[12px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-white
              "
            >
              {t('navigation.about')}
            </h2>

            <p
              className="
                mt-4
                max-w-[320px]

                font-body
                text-mobile-small
                text-white/85

                lg:text-body-small
              "
            >
              {projectNote}
            </p>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div
          className="
            border-t
            border-accent-orange/70

            pt-4
          "
        >
          <p
            className="
              text-center

              font-body
              text-mobile-small
              text-accent-orange

              lg:text-left
              lg:text-body-small
            "
          >
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer