import Vue from 'vue';
import VueI18n from 'vue-i18n'
import zh from './config/zh'
import en from './config/en'


Vue.use(VueI18n)
let language = navigator.language.includes('zh') ? 'zh' : 'en'

const i18n = new VueI18n({
  locale: language,
  messages: { en, zh }
})

export default i18n