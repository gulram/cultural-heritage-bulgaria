import { useTranslation } from 'react-i18next'

function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const locale = i18n.resolvedLanguage === 'en' ? 'en' : 'bg'

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
    localStorage.setItem('language', language)
    document.documentElement.lang = language
  }

  const getButtonClass = (language) =>
    locale === language
      ? 'font-semibold text-white'
      : 'text-white/70'

  return (
    <div className="flex items-center font-body text-body-small">
      <button
        type="button"
        onClick={() => changeLanguage('bg')}
        aria-pressed={locale === 'bg'}
        className={`
          transition-colors duration-200 ease-out
         
          hover:text-accent-antique
          
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-accent-orange
          focus-visible:ring-offset-2
          ${getButtonClass('bg')}
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
        onClick={() => changeLanguage('en')}
        aria-pressed={locale === 'en'}
        className={`
          transition-colors duration-200 ease-out
          
          hover:text-accent-antique
          
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-accent-orange
          focus-visible:ring-offset-2
          ${getButtonClass('en')}
        `}
      >
        EN
      </button>
    </div>
  )
}

export default LanguageSwitcher