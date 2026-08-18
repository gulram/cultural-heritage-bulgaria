import {
  Link,
  NavLink,
  useLocation,
} from 'react-router-dom'
import {
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'

import logo from '../assets/logo-light.svg'
import useActiveSection from '../hooks/useActiveSection'

const HOME_SECTIONS = [
  'home',
  'destinations',
  'about',
  'contacts',
]

const CONTACTS = [
  {
    id: 'email',
    icon: Mail,
    label: 'contact@unesco-bulgaria.bg',
    href: 'mailto:contact@unesco-bulgaria.bg',
  },
  {
    id: 'phone',
    icon: Phone,
    label: '+359 888 123 456',
    href: 'tel:+359888123456',
  },
  {
    id: 'location',
    icon: MapPin,
    label: 'София, България',
  },
]

function Footer() {
  const location = useLocation()

  const activeSection = useActiveSection(HOME_SECTIONS)

  const isHomePage = location.pathname === '/'

  const getSectionLinkClass = (section) => {
    const isActive =
      isHomePage &&
      (
        activeSection === section ||
        (!activeSection && section === 'home')
      )

    return `
      relative inline-block
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

  const getRouteLinkClass = ({ isActive }) => `
    relative inline-block
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
      id="contacts"
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
                src={logo}
                alt="Културно наследство България"
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
                lg:leading-[20px]
              "
            >
              Дигитална платформа, посветена на пет от
              най-ценните български културни обекти под
              закрилата на ЮНЕСКО.
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
              Навигация
            </h2>

            <nav
              aria-label="Навигация във футъра"
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
                className={getSectionLinkClass('home')}
              >
                Начало
              </Link>

              <Link
                to="/#destinations"
                className={getSectionLinkClass(
                  'destinations'
                )}
              >
                Дестинации
              </Link>

              <NavLink
                to="/map"
                className={getRouteLinkClass}
              >
                Карта
              </NavLink>

              <Link
                to="/#about"
                className={getSectionLinkClass('about')}
              >
                За проекта
              </Link>
            </nav>
          </div>

          {/* CONTACTS */}
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
              Свържете се с нас
            </h2>

            <div
              className="
                mt-4
                flex
                flex-col
                gap-3
              "
            >
              {CONTACTS.map(
                ({
                  id,
                  icon: Icon,
                  label,
                  href,
                }) => {
                  const content = (
                    <>
                      <span
                        className="
                          flex h-4 w-4
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-accent-orange
                          text-accent-orange
                        "
                      >
                        <Icon
                          aria-hidden="true"
                          size={12}
                          strokeWidth={1.8}
                        />
                      </span>

                      <span>{label}</span>
                    </>
                  )

                  if (href) {
                    return (
                      <a
                        key={id}
                        href={href}
                        className="
                          flex
                          items-center
                          gap-2.5

                          font-body
                          text-mobile-small
                          text-white/85

                          transition-colors
                          duration-200
                          ease-out

                          hover:text-accent-orange

                          lg:text-body-small
                        "
                      >
                        {content}
                      </a>
                    )
                  }

                  return (
                    <div
                      key={id}
                      className="
                        flex
                        items-center
                        gap-2.5

                        font-body
                        text-mobile-small
                        text-white/85

                        lg:text-body-small
                      "
                    >
                      {content}
                    </div>
                  )
                }
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div
          className="
            border-t
            border-accent-orange/70
            pt-3

            lg:flex
            lg:items-center
            lg:justify-between
          "
        >
          {/* LEGAL LINKS */}
          <div
            className="
              flex
              flex-col
              items-start
              gap-3
              pb-4

              lg:order-2
              lg:flex-row
              lg:items-center
              lg:gap-3
              lg:pb-0
            "
          >
            <Link
              to="/privacy-policy"
              className="
                font-body
                text-mobile-small
                text-accent-orange

                transition-colors
                duration-200
                ease-out

                hover:text-accent-light

                lg:text-body-small
              "
            >
              Политика за поверителност
            </Link>

            <span
              aria-hidden="true"
              className="
                hidden
                text-accent-orange/60
                lg:inline
              "
            >
              |
            </span>

            <Link
              to="/terms"
              className="
                font-body
                text-mobile-small
                text-accent-orange

                transition-colors
                duration-200
                ease-out

                hover:text-accent-light

                lg:text-body-small
              "
            >
              Условия за използване
            </Link>
          </div>

          {/* COPYRIGHT */}
          <p
            className="
              border-t
              border-white/15
              pt-4
              text-center

              font-body
              text-mobile-small
              text-accent-orange

              lg:order-1
              lg:border-0
              lg:pt-0
              lg:text-left
              lg:text-body-small
            "
          >
            © 2026 Културно наследство България
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer