import { useState } from 'react'
import {
  Link,
  NavLink,
  useLocation,
} from 'react-router-dom'
import { Menu, X } from 'lucide-react'

import logo from '../assets/logo-light.svg'
import useActiveSection from '../hooks/useActiveSection'

const HOME_SECTIONS = [
  'home',
  'destinations',
  'about',
  'contacts',
]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  const getRouteLinkClass = ({ isActive }) => `
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
  }

  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      {/* DESKTOP */}
      <div
        className="
            hidden w-full
            border border-header-stroke
            bg-header-glass
            backdrop-blur-[3px]
            lg:block
        "
        >
            <div
             className="
             mx-auto flex h-[72px] max-w-main
             items-center justify-between
             "
           >
        {/* Logo */}
        <Link
          to="/#home"
          className="shrink-0"
        >
          <img
            src={logo}
            alt="Културно наследство България"
            className="h-auto w-[150px]"
          />
        </Link>

        {/* Navigation */}
        <nav
          aria-label="Основна навигация"
          className="flex items-center gap-10"
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

          <Link
            to="/#contacts"
            className={getSectionLinkClass(
              'contacts'
            )}
          >
            Контакти
          </Link>
        </nav>

        {/* Language */}
        <div className="flex items-center font-body text-body-small">
          <button
            type="button"
            className="font-semibold text-white transition-colors duration-200 hover:text-accent-gold"
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
            className="text-white/70 transition-colors duration-200 hover:text-accent-gold"
          >
            EN
          </button>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden">
        {/* Mobile top bar */}
        <div
        className="
            flex h-[64px] items-center justify-between px-5
            border border-header-stroke
            bg-header-glass
            backdrop-blur-[3px]
        "
        >
          <Link
            to="/#home"
            onClick={closeMobileMenu}
          >
            <img
              src={logo}
              alt="Културно наследство България"
              className="h-auto w-[105px]"
            />
          </Link>

          <button
            type="button"
            aria-label={
              isMenuOpen
                ? 'Затвори менюто'
                : 'Отвори менюто'
            }
            aria-expanded={isMenuOpen}
            onClick={() =>
              setIsMenuOpen((prev) => !prev)
            }
            className="flex h-10 w-10 items-center justify-center text-white"
          >
            {isMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="
              absolute left-0 top-0
              h-[492px] w-full
              border border-header-stroke
              bg-header-glass
              px-5 pb-5 pt-4
              backdrop-blur-[10px]
            "
          >
            <div className="flex h-[64px] items-center justify-between">
              <Link
                to="/#home"
                onClick={closeMobileMenu}
              >
                <img
                  src={logo}
                  alt="Културно наследство България"
                  className="h-auto w-[105px]"
                />
              </Link>

              <button
                type="button"
                aria-label="Затвори менюто"
                onClick={closeMobileMenu}
                className="flex h-10 w-10 items-center justify-center text-white"
              >
                <X size={24} />
              </button>
            </div>

            <nav
              aria-label="Мобилна навигация"
              className="flex flex-col items-center gap-10 pt-12 font-body text-mobile-link text-white"
            >
              <Link
                to="/#home"
                onClick={closeMobileMenu}
              >
                Начало
              </Link>

              <Link
                to="/#destinations"
                onClick={closeMobileMenu}
              >
                Дестинации
              </Link>

              <NavLink
                to="/map"
                onClick={closeMobileMenu}
              >
                Карта
              </NavLink>

              <Link
                to="/#about"
                onClick={closeMobileMenu}
              >
                За проекта
              </Link>

              <Link
                to="/#contacts"
                onClick={closeMobileMenu}
              >
                Контакти
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header