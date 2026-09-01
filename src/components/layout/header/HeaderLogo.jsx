import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import logoBg from '../../../assets/logo-light.svg'
import logoEn from '../../../assets/logo-light-en.svg'

function HeaderLogo({
  mobile = false,
  onClick,
}) {
  const { t, i18n } = useTranslation()

  const locale = i18n.resolvedLanguage === 'en' ? 'en' : 'bg'
  const logo = locale === 'en' ? logoEn : logoBg

  return (
    <Link
      to="/#home"
      onClick={onClick}
      className="shrink-0"
    >
      <img
        src={logo}
        alt={t('footer.logoAlt')}
        className={
          mobile
            ? 'h-auto w-(--logo-width-mobile)'
            : 'h-auto w-(--logo-width-desktop)'
        }
      />
    </Link>
  )
}

export default HeaderLogo