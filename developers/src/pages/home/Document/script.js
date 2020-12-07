import Header from "@/components/MainHeader"
import Footer from "@/components/MainFooter"
import tools from "@/assets/js/tools"

import { getPathByRouter, getPageContent } from './handleMd'
import { handleCodeHighLight } from './hl'

export default {
  name: "News",
  components: { Header, Footer },
  data() {
    return {
      page: "",
      active_path: "",
      path: "",
      showNav: false
    }
  },
  watch: {
    '$route.path'() {
      let { pathMatch } = this.$route.params
      handlePathInit.call(this, pathMatch)
      this.showNav = false
    }
  },
  mounted() {
    tools.changeTheme("#fff")
    let { pathMatch } = this.$route.params
    handlePathInit.call(this, pathMatch)
  },
}

function handlePathInit(pathMatch) {
  this.$nextTick(() => {
    require("@/assets/js/animate-up").default()
    handleCodeHighLight()
    document.documentElement.scrollTop = 0
  })
  pathMatch = pathMatch ? pathMatch.substr(1) : "mainnet/overview"
  let { locale, messages } = this.$i18n
  let langCheck = new Set()
  langCheck.add(locale)
  langCheck.add('en')
  langCheck.add('zh')
  langCheck = Array.from(langCheck)
  let isFind = langCheck.some(item => getPathByRouter.call(this, pathMatch, messages[item] && messages[item].documentation || []))
  if (!isFind) return console.log('no doc')
  isFind = langCheck.some(item => getPageContent.call(this, item))
  if (!isFind) console.log('no doc2')
}
