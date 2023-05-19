// import the original type declarations
import 'i18next'
// import all namespaces (for the default language, only)
import home from 'src/i18n/locales/en/home.json'
import product from 'src/i18n/locales/en/product.json'
import { defaultNS, resources } from '../i18n'

declare module 'i18next' {
  // Extend CustomTypeOptions
  type DefaultResources = (typeof resources)['vi']
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: typeof defaultNS
    // custom resources type
    resources: DefaultResources
    // other
  }
}
s
