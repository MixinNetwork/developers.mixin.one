<template>
  <div class="news-page">
    <Header/>

    <section class="content">
      <ul v-if="reloadState">
        <li
          v-for="(item, index) in viewList"
          :key="index"
        >
          <a :href="`/news/${item.filename}`">{{ item.title }}</a>
          <span>{{ item.date }}</span>
        </li>
      </ul>

      <Pages
        align="right"
        :currentPage="currentPage"
        :split="split"
        :allPage="allList && allList.length"
        @page="usePage"
      />
    </section>

    <button v-if="!isAll" @click="useReadMore">Read More</button>

    <Footer/>
  </div>
</template>

<script>
import { computed, onMounted, reactive, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import Header from "@/components/MainHeader"
import Footer from "@/components/MainFooter"
import Pages from "@/components/Pages"
import { changeTheme } from "@/utils"

export default {
  name: "News",
  components: {Header, Footer, Pages},
  setup() {
    const {t, tm} = useI18n()

    const state = reactive({
      allList: [],
      viewList: [],
      currentPage: 1,
      split: 10,
      reloadState: true
    })
    const isAll = computed(() => state.allList.length === state.viewList.length)

    const usePage = (pageNum) => {
      state.currentPage = pageNum
      let start = (pageNum - 1) * state.split
      state.viewList = state.allList.slice(start, start + state.split)
    }
    const useReadMore = () => {
      state.currentPage++
      const start = (state.currentPage - 1) * state.split
      const appendList = state.allList.slice(start, start + state.split)
      state.viewList = state.viewList.concat(appendList)
    }

    onMounted(() => {
      changeTheme("#fdfeff")
      window.scrollTo(0, 0)
      state.reloadState = true
      state.allList = tm("news.list")
      state.viewList = state.allList.slice(0, state.split)
    })

    return {
      t,
      ...toRefs(state),
      isAll,
      usePage,
      useReadMore
    }
  },
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

:deep(footer) {
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

  :deep(.pages) {
    display: none;
  }

  :deep(footer) {
    margin-top: 0;
  }
}
</style>
