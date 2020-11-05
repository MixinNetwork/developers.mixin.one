<template>
  <div class="api-page">
    <Header />

    <section>
      <el-menu
        :default-active="active_path"
        class="path one-path"
      >
        <template v-for="(item, widx) in $t('documentation')">
          <el-submenu
            v-if="item.child"
            :key="widx"
            :index="String(widx)"
          >
            <template slot="title">
              <span>{{item.name}}</span>
            </template>
            <template v-for="(nitem, nidx) in item.child">
              <el-submenu
                v-if="nitem.child"
                :key="`${widx}-${nidx}`"
                :index="`${widx}-${nidx}`"
                class="path two-path"
              >
                <template slot="title">
                  <span>{{nitem.name}}</span>
                </template>
                <template v-for="(nnitem, nnidx) in nitem.child">
                  <el-submenu
                    v-if="nnitem.child"
                    :key="`${widx}-${nidx}-${nnidx}`"
                    :index="`${widx}-${nidx}-${nnidx}`"
                    class="path three-path"
                  >
                    <template slot="title">
                      <span>{{nnitem.name}}</span>
                    </template>
                    <el-menu-item
                      v-for="(nnnitem, nnnidx) in nnitem.child"
                      :key="`${widx}-${nidx}-${nnidx}-${nnnidx}`"
                      :index="`${widx}-${nidx}-${nnidx}-${nnnidx}`"
                      class="path four-path content-path"
                    >
                      <router-link class="content-a" :to="`/document/${nnnitem.path}`">{{nnnitem.name}}</router-link>
                    </el-menu-item>
                  </el-submenu>
                  <el-menu-item
                    v-else
                    :key="`${widx}-${nidx}-${nnidx}`"
                    :index="`${widx}-${nidx}-${nnidx}`"
                    class="path three-path content-path"
                  >
                    <router-link class="content-a" :to="`/document/${nnitem.path}`"> {{nnitem.name}}</router-link>
                  </el-menu-item>
                </template>


              </el-submenu>
              <el-menu-item
                v-else
                :key="`${widx}-${nidx}`"
                :index="`${widx}-${nidx}`"
                class="path two-path content-path"
              >
                <router-link class="content-a" :to="`/document/${nitem.path}`"> {{nitem.name}}</router-link>
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item
            v-else
            :key="widx"
            :index="String(widx)"
            class="path one-path content-path"
          >
            <router-link class="content-a" :to="`/document/${item.path}`"> {{item.name}}</router-link>
          </el-menu-item>
        </template>
      </el-menu>
      <div class="container markdown-body" v-html="page"></div>
      <div ref="test"></div>
    </section>

    <Footer />
  </div>
</template>

<script>
  import Header from "@/components/MainHeader"
  import Footer from "@/components/MainFooter"
  import tools from "@/assets/js/tools"
  import "github-markdown-css"
  import hljs from 'highlight.js'
  import 'highlight.js/styles/github.css'
  import katex from "katex"
  import 'katex/dist/katex.min.css'
  import 'katex/dist/fonts/KaTeX_Main-Regular.ttf'
  import 'katex/dist/fonts/KaTeX_Main-Bold.ttf'

  export default {
    name: "News",
    components: { Header, Footer },
    data() {
      return {
        page: "",
        active_path: "",
      }
    },
    watch: {
      '$route.path'() {
        let { pathMatch } = this.$route.params
        handlePathInit.call(this, pathMatch)
      }
    },
    mounted() {
      tools.changeTheme("#fff")
      let { pathMatch } = this.$route.params
      handlePathInit.call(this, pathMatch)
    }
  }

  function handlePathInit(pathMatch) {
    pathMatch = pathMatch ? pathMatch.substr(1) : "/"
    let { locale } = this.$i18n
    let path = getPathByRouter.call(this, pathMatch)
    try {
      this.page = require(`@/i18n/${locale}/document/${path}.md`)
    } catch (e) {
      try {
        this.page = require(`@/i18n/en/document/${path}.md`)
      } catch (e) {
        console.log('no doc')
      }
    }
    this.$nextTick(() => {
      let t = require("@/assets/js/animate-up").default
      t()
      handleCodeHighLight()
    })
  }


  function getPathByRouter(originRouter) {
    let _path = []
    let documentList = this.$t("documentation")
    let path = iterate(documentList, originRouter, _path)
    const [one, two, three, four] = _path
    let active_path
    if (two === undefined) active_path = `${one}`
    else if (three === undefined) active_path = `${one}-${two}`
    else if (four === undefined) active_path = `${one}-${two}-${three}`
    else active_path = `${one}-${two}-${three}-${four}`
    this.active_path = active_path
    return path
  }

  function iterate(list, originRouter, _path) {
    let targetRouter = ""
    for (let i = 0; i < list.length; i++) {
      let { router, path, child } = list[i]
      if (originRouter === path) {
        _path.push(i)
        return router
      }
      if (child) {
        _path.push(i)
        targetRouter = iterate(child, originRouter, _path)
      }
      if (targetRouter) return targetRouter
    }
    if (!targetRouter) _path.pop()
  }

  function handleCodeHighLight() {
    const preEl = document.querySelectorAll('pre code')
    preEl.forEach(el => {
      let { innerText } = el
      if (innerText.startsWith('$$') && innerText.endsWith('$$')) {
        const isBlock = el.parentNode.tagName === 'PRE'
        innerText = innerText.slice(2, -2)
        katex.render(String.raw`${innerText}`, el, {
          "displayMode": isBlock,
          "leqno": false,
          "fleqn": !isBlock,
          "throwOnError": true,
          "errorColor": "#cc0000",
          "strict": "warn",
          "output": "html",
          "trust": false,
          "macros": { "\\f": "#1f(#2)" }
        })
        if (isBlock) {
          el.parentNode.style.background = "transparent"
        }
      } else {
        hljs.highlightBlock(el)
      }
    })
  }

  function handleKaTeX() {
    const pEl = document.querySelectorAll('p')
    pEl.forEach(el => {
    })
  }
</script>

<style lang="scss" scoped>
  .api-page {
    font-family: "SF Pro Text", sans-serif;
    background-color: #fff;
  }

  section {
    max-width: 60rem;
    margin: 3.25rem auto;

    display: flex;
    align-items: flex-start;
  }

  a {
    display: inline-block;
    cursor: pointer;
  }

  a:hover {
    opacity: 0.5;
  }

  .path {
    border: 0;
  }

  /deep/ {
    .el-menu {
      background: #f5f7fa;
      min-width: 17.5rem;
      max-width: 17.5rem;
      border-radius: 20px;
      padding: 8px 4px;
    }


    .el-submenu__title::before {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      transform-origin: 50% 50%;
      right: 1.25rem;
      background-image: url("~@/assets/img/svg/triangle.svg");
      background-repeat: no-repeat;
      width: 6px;
      height: 10px;
    }

    .el-submenu.is-opened > .el-submenu__title:before {
      transform: translateY(-50%) rotate(90deg);
    }

    .el-icon-arrow-down:before {
      display: none;
    }

    .el-menu-item {
      padding: 0 !important;
      box-sizing: border-box;
      min-width: initial;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
    }


    .el-menu-item.is-active {
      color: #4B7CDD;
      background-color: #fff;
    }

    .content-path {
      margin: 5px 30px 5px 40px;
      border-radius: 8px;
      overflow: hidden;

      .content-a {
        height: 40px;
        line-height: 40px;
      }
    }

    .one-path {
      overflow: hidden;

      .el-submenu__title {
        height: 56px;
        font-size: 16px;
        line-height: 56px;
      }

      &.content-path {
        margin: 5px 10px;
      }
    }


    .two-path {
      font-size: 16px;

      & > .el-submenu__title {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        padding-left: 40px !important;
      }

      .el-submenu__title:before {
        left: 1.25rem;
      }

      &.content-path {
        margin: 5px 25px 5px 20px;
      }
    }

    .three-path {
      .el-submenu__title {
        font-size: 16px;
        line-height: 40px;
        height: 40px;
      }

      .el-submenu__title:before {
        left: 2.25rem;
      }
    }

    .four-path {
      margin: 5px 30px 5px 60px;
    }

    .container {
      margin-left: 2rem;
      flex: 1;
      width: calc(100% - 17.5rem);
    }

    .hljs {
      display: inline-block;
      transform: translateY(7px);
    }
  }

  .content-a {
    display: block;
    width: 100%;
    padding-left: 20px !important;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media screen and (max-width: 75rem) and (min-width: 60.0625rem) {
    section {
      max-width: 50rem;
    }
  }

  @media screen and (max-width: 60rem) {
    nav {
      display: none;
    }
    section {
      max-width: 40rem;
    }
    .container {
      margin: 0 2rem;
    }
  }
</style>
