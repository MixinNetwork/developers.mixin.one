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
          <a :href="`/cases/${(currentPage - 1) * split + index}`">
            <img :src="require(`@/assets/img/${$route.name}/${item.img || index+1}.png`)" />
            <div class="container">
              <h4>{{item.title}}</h4>
              <p v-html="item.info"></p>
              <span>{{item.date}}</span>
            </div>
          </a>
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
      split: 6,
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

      this.$router.push(`/cases/${id}`);
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.reloadState = true;
    this.allList = this.$t("cases.list");
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

  margin: 2.75rem auto 0;
  padding: 4rem 2.5rem;

  li {
    padding: 0 2.5rem 2.5rem;
    background-color: #fff;
    margin-bottom: 3rem;
    border-bottom: 0.0625rem solid #edf0f5;
  }

  a {
    display: flex;
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

  h4 {
    font-size: 2rem;
    margin-bottom: 1rem;

    cursor: pointer;
  }

  p {
    font-size: 22px;
    line-height: 28px;
    height: 84px;
    margin-bottom: 1rem;
    overflow: hidden;
    color: #2f3032;

    cursor: pointer;
  }

  span {
    font-size: 1.25rem;
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
    padding: 0;
    li {
      margin-bottom: 1.25rem;
      padding: 0;

      border-radius: 0.875rem;
      box-shadow: 0 1.25rem 3.75rem rgba(61, 117, 227, 0.06);
    }

    a {
      flex-direction: column;
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

    h4 {
      font-size: 1.25rem;
      line-height: 28px;
      margin-top: 1.25rem;
    }

    p {
      font-size: 0.875rem;
      line-height: 1.5rem;
      height: 4.5rem;
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