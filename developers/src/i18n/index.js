import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh'
import en from './en'


Vue.use(VueI18n)
let lang = window.localStorage.getItem('lang')
let language = lang || (navigator.language.includes('zh') ? 'zh' : 'en')
if (!lang) window.localStorage.setItem('lang', language)
const i18n = new VueI18n({
  locale: language,
  messages: { en, zh },
  fallbackLocale: 'en'
})

export default i18n
