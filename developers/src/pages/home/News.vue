<template>
  <div class="news-page">
    <Header />

    <section class="content">
      <ul v-if="reloadState">
        <li
          v-for="(item, index) in viewList"
          :key="index"
        >
          <a :href="`/news/${item.filename}`">{{item.title}}</a>
          <span>{{item.date}}</span>
        </li>
      </ul>

      <Pages
        align="right"
        :currentPage="currentPage"
        :split="split"
        :allPage="allList && allList.length"
        @page="toPage"
      />
    </section>

    <button v-if="!isAll" @click="clickReadMore">Read More</button>

    <Footer />
  </div>
</template>

<script>
  import Header from "@/components/MainHeader"
  import Footer from "@/components/MainFooter"
  import Pages from "@/components/Pages"
  import tools from "@/assets/js/tools"

  export default {
    name: "News",
    components: { Header, Footer, Pages },
    data() {
      return {
        allList: [],
        viewList: [],
        currentPage: 1,
        split: 10,
        reloadState: true
      }
    },
    computed: {
      isAll() {
        let { allList, viewList } = this
        return allList.length === viewList.length
      }
    },
    methods: {
      toPage(pageNum) {
        this.currentPage = pageNum
        let start = (pageNum - 1) * this.split
        this.viewList = this.allList.slice(start, start + this.split)
      },
      clickReadMore() {
        this.currentPage++
        let currentPage = this.currentPage
        let start = (currentPage - 1) * this.split
        let appendList = this.allList.slice(start, start + this.split)
        this.viewList = this.viewList.concat(appendList)
      },
      newsIndex(index) {
        let { currentPage, split, viewList } = this
        return viewList.length > split
          ? index
          : (currentPage - 1) * split + index
      }
    },
    mounted() {
      tools.changeTheme("#fdfeff")
      window.scrollTo(0, 0)
      this.reloadState = true
      this.allList = this.$t("news.list")
      this.viewList = this.allList.slice(0, this.split)
    }
  }
</script>

<style lang="scss" scoped>
  @import "./common.scss";

  .news-page {
    position: relative;
    overflow: hidden;
    font-family: "Maven Pro", sans-serif;

    background: #fdfeff;
  }

  .content {
    box-shadow: 0 1.25rem 3.75rem rgba(61, 117, 227, 0.06);
    border-radius: 0.75rem;
    padding: 4rem 2.5rem;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 0 2.5rem 3.25rem;

      font-size: 1.125rem;
    }

    img {
      min-width: 16.375rem;
      max-width: 16.375rem;
      height: 14rem;
    }

    .container {
      display: flex;
      flex-direction: column;

      padding-left: 2.25rem;
    }

    a {
      color: #3d75e3;
      font-size: 1.125rem;
      max-width: calc(100% - 10rem);
    }

    span {
      font-size: 1.125rem;
      line-height: 1.5rem;

      color: #c7c9d2;
    }
  }

  button {
    display: none;
  }

  /deep/ footer {
    margin-top: 11.25rem;
  }

  @media screen and (max-width: 60rem) {
    .news-page {
      min-width: 20rem;
    }
    .content {
      padding: 2rem 1rem;

      li {
        flex-direction: column;
        align-items: start;

        padding: 0;

        a {
          max-width: initial;
        }
      }

      img {
        max-width: 100%;
        min-width: 100%;
        height: initial;
        border-radius: 0.75rem 0.75rem 0 0;
      }

      .container {
        padding: 0 1.25rem;
      }

      span {
        font-size: 0.875rem;
        line-height: 1.5rem;
        margin-bottom: 1.25rem;
      }
    }

    button {
      display: block;
      margin: 5rem auto 7.5rem auto;
      font-size: 1.25rem;
      padding: 0 2rem;
      line-height: 3rem;

      font-family: "Maven Pro", sans-serif;
      font-weight: 400;
      font-size: 1.5rem;
      background: #3d75e3;
      color: #ffffff;
      border-radius: 0.625rem;
      border: 0.125rem solid #397ee4;

      transition: background-color 0.2s, color 0.2s;

      &:hover {
        background: #fff;
        color: #3d75e3;
      }
    }

    /deep/ .pages {
      display: none;
    }

    /deep/ footer {
      margin-top: 0;
    }
  }
</style>
