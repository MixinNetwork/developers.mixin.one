import { createI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler.js'
import zh from './zh'
import en from './en'

const lang = window.localStorage.getItem('lang')
const language = lang || (navigator.language.includes('zh') ? 'zh' : 'en')
if (!lang) window.localStorage.setItem('lang', language)

const i18n = createI18n({
  legacy: false,
  locale: language,
  messages: { en, zh },
  fallbackLocale: 'en',
})

export default i18n
