import { computed, onMounted, reactive, toRefs, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import Header from "@/components/MainHeader"
import Footer from "@/components/MainFooter"
import { changeTheme } from "@/utils"
import { getPathByRouter, getPageContent } from './handleMd'
import { handleCodeHighLight } from './hl'

export default {
  name: "News",
  components: { Header, Footer },
  setup(props, ctx) {
    const { t, locale, messages } = useI18n()
    const state = reactive({
      page: "",
      active_path: "",
      path: "",
      showNav: false,
      locale: 'zh'
    })

    const githubView = computed(() => {
      return `https://github.com/MixinNetwork/developers.mixin.one/blob/main/developers/src/i18n/${state.locale}/document/${state.path}.md`
    })
    const githubEdit = computed(() => {
      return `https://github.com/MixinNetwork/developers.mixin.one/edit/main/developers/src/i18n/${state.locale}/document/${state.path}.md`
    })

    const usePathInit = (pathMatch) => {
      ctx.nextTick(() => {
        handleCodeHighLight()
        document.documentElement.scrollTop = 0
      })
      pathMatch = pathMatch ? pathMatch.substr(1) : "mainnet/overview"
      let langCheck = new Set()
      langCheck.add(locale.value)
      langCheck.add('en')
      langCheck.add('zh')
      langCheck = Array.from(langCheck)

      let isFind = langCheck.some(item => getPathByRouter(state, pathMatch, messages[item] && messages[item].documentation || []))
      if (!isFind) return console.log('no doc')
      isFind = langCheck.some(item => getPageContent(state, item))
      if (!isFind) console.log('no doc2')
    }

    const route = useRoute()
    watch(() => route.path, () => {
      usePathInit(route.params.pathMatch)
      state.showNav = false
    })
    onMounted(() => {
      changeTheme("#fff")
      usePathInit(route.params.pathMatch)
    })

    return {
      t,
      ...toRefs(state),
      githubView,
      githubEdit
    }
  },
}

