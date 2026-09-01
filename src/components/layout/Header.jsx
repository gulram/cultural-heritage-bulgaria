import { useLocation } from 'react-router-dom'

import useActiveSection from '../../hooks/useActiveSection'

import DesktopHeader from './header/DesktopHeader'
import MobileHeader from './header/MobileHeader'
import { HOME_SECTIONS } from './header/navigationConfig'

function Header() {
  const location = useLocation()

  const activeSection = useActiveSection(HOME_SECTIONS)
  const isHomePage = location.pathname === '/'

  return (
    <header
      className="
        absolute left-0 top-0 z-[2000] w-full
      "
    >
      <DesktopHeader
        activeSection={activeSection}
        isHomePage={isHomePage}
      />

      <MobileHeader />
    </header>
  )
}

export default Header