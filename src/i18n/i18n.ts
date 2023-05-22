// import i18n from 'i18next'
import i18n, { use } from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from './locales/en/home.json'
import HOME_VI from './locales/vi/home.json'
import PRODUCT_EN from './locales/en/product.json'
import PRODUCT_VI from './locales/vi/product.json'
import PROFILE_EN from './locales/en/profile.json'
import PROFILE_VI from './locales/vi/profile.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng việt'
}

export const resources = {
  en: {
    home: HOME_EN,
    product: PRODUCT_EN,
    profile: PROFILE_EN
  },
  vi: {
    home: HOME_VI,
    product: PRODUCT_VI,
    profile: PROFILE_VI
  }
}

export const defaultNS = 'product'

const i18nCustom = use(initReactI18next).init({
  lng: 'en', // if you're using a language detector, do not define the lng option
  fallbackLng: 'en',
  defaultNS: defaultNS,
  ns: ['en', 'vi'],
  interpolation: {
    escapeValue: false // react already safes from xss
  },
  resources: resources
})

export default i18nCustom
