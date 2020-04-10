<template>
  <div class="news-page">
    <Header />

    <section class="list">
      <ul v-if="reloadState">
        <li
          v-for="(item, index) in viewList"
          :key="index"
          class="animate-up"
          :data-animate="`fadeInUp,1s,easin-in-out,.1s`"
        >
          <a :href="`/news/${index}`">{{item.title}}</a>
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
import Header from "@/components/MainHeader";
import Footer from "@/components/MainFooter";
import Pages from "@/components/Pages";
export default {
  name: "News",
  components: { Header, Footer, Pages },
  data() {
    return {
      allList: [],
      viewList: [],
      currentPage: 1,
      split: 20,
      refresh: null,
      reloadState: true
    };
  },
  computed: {
    isAll() {
      let { allList, viewList } = this;
      return allList.length === viewList.length;
    }
  },
  methods: {
    toPage(pageNum) {
      this.currentPage = pageNum;
      let start = (pageNum - 1) * this.split;
      this.viewList = this.allList.slice(start, start + this.split);
      setTimeout(refresh);
    },
    clickReadMore() {
      this.currentPage++;
      let currentPage = this.currentPage;
      let start = (currentPage - 1) * this.split;
      let appendList = this.allList.slice(start, start + this.split);
      this.viewList = this.viewList.concat(appendList);
      setTimeout(refresh);
    },
    clickNews(index) {
      let { currentPage } = this;
      let id = (currentPage - 1) * this.split + index;

      this.$router.push(`/news/${id}`);
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.reloadState = true;
    this.allList = this.$t("news.list");
    this.viewList = this.allList.slice(0, this.split);
    setTimeout(refresh);
  }
};

function refresh() {
  let t = require("@/assets/js/animate-up").default;
  t();
}
</script>

<style lang="scss" scoped>
@import "./button.scss";
.news-page {
  position: relative;
  overflow: hidden;
  font-family: Maven Pro;

  background: #fdfeff;
}

.list {
  width: 100%;
  max-width: 1180px;

  box-shadow: 0 1.25rem 3.75rem rgba(61, 117, 227, 0.06);
  border-radius: 0.75rem;

  margin: 2.75rem auto 0;
  padding: 4rem 2.5rem;

  li {
    display: flex;
    justify-content: space-between;

    padding: 0 2.5rem 3.25rem;

    font-size: 18px;
  }

  img {
    min-width: 262px;
    max-width: 262px;
    height: 164px;
  }

  .container {
    display: flex;
    flex-direction: column;

    padding-left: 2.25rem;
  }
  a {
    color: #3d75e3;
    font-size: 1.125rem;
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
  margin-top: 180px;
}

@media screen and (max-width: 60rem) {
  .news-page {
    min-width: 20rem;
  }
  .list {
    max-width: 540px;
    width: calc(100% - 2.5rem);
    margin: 3rem auto;
    padding: 2rem 1rem;
    li {
      flex-direction: column;

      padding: 0;
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
    margin: 5rem auto 7.5rem;
    height: 3rem;
    font-size: 1.25rem;
  }

  /deep/ .pages {
    display: none;
  }

  /deep/ footer {
    margin-top: 0;
  }
}
</style>