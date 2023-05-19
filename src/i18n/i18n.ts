// import i18n from 'i18next'
import { use } from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from './locales/en/home.json'
import HOME_VI from './locales/vi/home.json'
import PRODUCT_EN from './locales/en/product.json'
import PRODUCT_VI from './locales/vi/product.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng việt'
}

export const resources = {
  en: {
    home: HOME_EN,
    product: PRODUCT_EN
  },
  vi: {
    home: HOME_VI,
    product: PRODUCT_VI
  }
}

export const defaultNS = 'product'

use(initReactI18next).init({
  lng: 'en', // if you're using a language detector, do not define the lng option
  fallbackLng: 'en',
  defaultNS: defaultNS,
  ns: ['en', 'vi'],
  interpolation: {
    escapeValue: false // react already safes from xss
  },
  resources: resources
})
