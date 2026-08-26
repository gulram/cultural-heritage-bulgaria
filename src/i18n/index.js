import i18n from 'i18next'

import {
  initReactI18next,
} from 'react-i18next'

import bg from './bg'
import en from './en'

const savedLanguage =
  localStorage.getItem('language')

const initialLanguage =
  savedLanguage === 'en'
    ? 'en'
    : 'bg'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      bg: {
        translation: bg,
      },

      en: {
        translation: en,
      },
    },

    lng: initialLanguage,

    fallbackLng: 'bg',

    supportedLngs: [
      'bg',
      'en',
    ],

    interpolation: {
      escapeValue: false,
    },
  })

export default i18n