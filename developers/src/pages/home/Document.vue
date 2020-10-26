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
                :key="nidx"
                :index="`${widx}-${nidx}`"
                class="path two-path"
              >
                <template slot="title">
                  <span>{{nitem.name}}</span>
                </template>
                <el-menu-item
                  v-for="(nnitem, nnidx) in nitem.child"
                  :key="nnidx"
                  :index="`${widx}-${nidx}-${nnidx}`"
                  class="path three-path content-path"
                >
                  <a class="content-a" :href="`/document/${nnitem.path}`"> {{nnitem.name}}</a>
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="`${widx}-${nidx}`"
                class="path two-path content-path"
              >
                <a class="content-a" :href="`/document/${nitem.path}`"> {{nitem.name}}</a>
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item
            v-else
            :index="String(widx)"
            class="path one-path content-path"
          >
            <a class="content-a" :href="`/document/${item.path}`"> {{item.name}}</a>
          </el-menu-item>
        </template>
      </el-menu>
      <div class="container markdown-body" v-html="page"></div>
    </section>

    <Footer />
  </div>
</template>

<script>
  import Header from "@/components/MainHeader"
  import Footer from "@/components/MainFooter"
  import tools from "@/assets/js/tools"
  import "github-markdown-css"

  export default {
    name: "News",
    components: { Header, Footer },
    data() {
      return {
        page: "",
        active_path: "",
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
      console.log(`@/i18n/${locale}/document/${path}.md`)
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
    })
  }

  function getPathByRouter(originRouter) {
    let _path = []
    let documentList = this.$t("documentation")
    let path = iterate(documentList, originRouter, _path)
    const [one, two, three] = _path
    let active_path
    console.log(_path)
    if (two === undefined) active_path = `${one}`
    else if (three === undefined) active_path = `${one}-${two}`
    else active_path = `${one}-${two}-${three}`
    this.active_path = active_path
    return path
  }

  function iterate(list, originRouter, _path) {
    let targetRouter = ""
    for (let i = 0; i < list.length; i++) {
      let { router, path, child } = list[i]
      console.log(originRouter, router)
      if (originRouter === router) {
        _path.push(i)
        return path
      }
      if (child) {
        _path.push(i)
        targetRouter = iterate(child, originRouter, _path)
      }
      if (targetRouter) return targetRouter
    }
    if (!targetRouter) _path.pop()
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
      width: 17.5rem;
      border-radius: 20px;
    }

    .el-submenu__title::before {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      transform-origin: 50% 50%;
      right: 1.25rem;
      background-image: url("~@/assets/img/svg/triangle.svg");
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
    }


    .el-menu-item.is-active {
      color: #4B7CDD;
      background-color: #fff;
      border-radius: 8px;
    }


    .one-path {

      .el-submenu__title {
        height: 56px;
        line-height: 56px;
      }

      &.content-path {
        margin: 5px 10px;
      }

    }


    .two-path {

      & > .el-submenu__title {
        height: 40px;
        line-height: 40px;
        padding: 0 40px !important;
      }

      .el-submenu__title:before {
        left: 1.25rem;
      }

      &.content-path {
        margin: 5px 20px;
      }
    }

    .content-path {
      margin: 5px 40px;

      .content-a {
        height: 40px;
        line-height: 40px;
      }
    }
  }

  .content-a {
    display: block;
    width: 100%;
    padding: 0 20px !important;
  }

  .container {
    margin-left: 2rem;
    flex: 1;
    width: calc(100% - 17.5rem);
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
