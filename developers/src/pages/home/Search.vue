<template>
  <div class="search-page">
    <Header />

    <section class="content">
      <div class="search-bar">
        <input type="text" v-model="search" @keydown.enter="handleEnterToSearch" />
        <i v-if="search" @click="search=''" class="btn-close" />
      </div>
      <div class="search-content">

        <div class="head">
          <span
            v-for="key in ['all','news','cases','docs']"
            :key="key"
            :class="key === activeTab ? 'active':''"
            @click="handleClickTab(key)"
          >{{$t(`search.${key}`)}}</span>
        </div>

        <p class="info">{{list.length}} results for "{{searchKey}}"</p>

        <ul class="search-list">
          <li v-for="(item,idx) in list" :key="idx" class="search-item">
            <h4 class="title">
              <router-link :to="item.router">
                {{item.title}}
              </router-link>
            </h4>
            <span>{{item.route}}</span>
            <p>{{item.info}}</p>
          </li>
        </ul>
        <!--        <div>Show more</div>-->
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
  import Footer from "@/components/MainFooter"
  import Header from "@/components/MainHeader"

  let searchList = []
  export default {
    name: "Search",
    components: { Header, Footer },
    data() {
      return {
        search: "",
        searchKey: "",
        list: [],
        activeTab: "all",
        searchList: [],
        pages: 0
      }
    },
    methods: {
      handleEnterToSearch() {
        location.href = `/search?q=` + this.search
      },
      handleClickTab(key) {
        this.activeTab = key
        if (this.activeTab === 'all') {
          this.list = searchList
        } else {
          this.list = searchList.filter(item => item.key === key)
        }
      },
    },
    created() {
      const { q } = this.$route.query
      if (q) {
        this.search = q
        this.searchKey = q
        const key = q.toLowerCase()
        const { vm, locale } = this.$i18n
        const { news, cases, documentation } = vm.messages[locale]
        const list = [
          ...getNewsOrCasesItem(news, "news", locale, key),
          ...getNewsOrCasesItem(cases, "cases", locale, key),
        ]
        const docsList = []
        getDocumentItem(documentation, this.$t("home.documentation.title") + " > ", locale, key, docsList)
        searchList = [...docsList, ...list.sort((a, b) => b.date - a.date)]
        this.handleClickTab(this.activeTab)
      }

    }
  }

  function getNewsOrCasesItem(origin, info, locale, key) {
    const list = []
    for (const { title, filename, date } of origin.list) {
      const content = require(`@/i18n/${locale}/${info}/${filename}.md`).replace(/<(?:.|\s)*?>/g, "")
      if (content.toLowerCase().includes(key)) list.push({
        key: info,
        title,
        route: `${origin.route} > ${title}`,
        router: `/${info}/${filename}`,
        info: content.slice(0, 100) + "...",
        date: new Date(date)
      })
    }
    return list
  }

  function getDocumentItem(origin, route, locale, key, list) {
    for (const { child, name, path, router } of origin) {
      let route_name = route
      if (child) {
        route_name += `${name} > `
        getDocumentItem(child, route_name, locale, key, list)
      } else {
        const content = require(`@/i18n/${locale}/document/${router}.md`).replace(/<(?:.|\s)*?>/g, "")
        if (content.toLowerCase().includes(key)) list.push({ key: "docs", title: name, route: route + `${name}`, router: `/document/${path}`, info: content.slice(0, 100) + "..." })
      }
    }
  }


</script>

<style lang="scss" scoped>
  @import "common";

  .content {
    padding: 0;
    font-family: "Maven Pro", sans-serif;
  }

  .search-bar {
    width: 100%;
    height: 54px;
    background: #F5F8FE;
    border-radius: 80px;
    display: flex;
    align-items: center;
    padding: 0 30px;

    input {
      flex: 1;
      background-color: transparent;
      height: 54px;
      font-size: 18px;
      width: 100%;
      color: #3F444E;
      margin-right: 20px;
    }
  }

  .search-content {
    padding: 32px;
  }

  .head {
    border-bottom: 1px solid #EDF1FA;
    padding: 8px 0;

    span {
      padding: 8px 4px;
      margin-right: 36px;
      color: #3F444E;
      opacity: 0.6;
      cursor: pointer;
    }

    .active {
      opacity: 1;
      border-bottom: 2px solid #3F444E;
    }
  }

  .info {
    margin-top: 18px;
    color: #3F444E;
    opacity: 0.6;
  }

  .search-list {
    margin-top: 2rem;
  }

  .search-item {
    margin-bottom: 36px;

    .title a {
      font-size: 22px;
      color: #3D75E3;
      cursor: pointer;
    }

    span {
      display: inline-block;
      color: #9FACC5;
      margin: 8px 0 12px 0;
    }

    p {
      color: #2F3032;
    }
  }

  .btn-close {
    width: 20px;
    height: 20px;
    background: #BCBEC3;
    border-radius: 50%;
    position: relative;

    &::after,
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 9px;
      height: 2px;
      background-color: #fff;
    }

    &:after {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  @media screen and (max-width: 60rem) {
    .search-content {
      padding: 0 4px;
    }

    .search-bar {
      display: none;
    }

    .head {
      display: flex;
      justify-content: space-between;
      padding: 0;

      span {
        margin: 0;
      }
    }
  }

</style>
