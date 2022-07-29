<template>
  <div class="detail-page">
    <Header/>

    <section class="content">
      <!-- <nav>
        <router-link tag="a" :to="`/${path}`">{{route}}</router-link>
        <span>> {{info.title}}</span>
      </nav>-->

      <h2>{{ info.title }}</h2>

      <p class="date">{{ info.date }}</p>

      <div class="desc markdown-body" v-html="desc"></div>

      <!-- <img src="@/assets/img/svg/black_logo.svg" /> -->
    </section>

    <Footer/>
  </div>
</template>

<script>
import "github-markdown-css"
import { onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import Header from "@/components/MainHeader"
import Footer from "@/components/MainFooter"
import { changeTheme } from "@/utils"

export default {
  name: "NewsDetail",
  components: {Header, Footer},
  setup() {
    const {t, tm, locale} = useI18n()
    const state = reactive({
      route: "",
      info: {},
      path: "",
      desc: ""
    })

    const route = useRoute()
    onMounted(() => {
      changeTheme("#fdfeff")
      window.scrollTo(0, 0)

      const name = route.name
      const {filename} = route.params

      let path = ""
      if (name.startsWith("news")) {
        path = "news"
      } else if (name.startsWith("cases")) {
        path = "cases"
      }
      state.path = path
      state.route = t(path + ".route")
      state.info = tm(path + ".list").find(
        item => item.filename === filename
      )

      console.log(locale)
      if (state.info.filename) {
        try {
          state.desc = require(`@/i18n/${locale.value}/${path}/${state.info.filename}.md`)
        } catch (e) {
          state.desc = require(`@/i18n/en/${path}/${state.info.filename}.md`)
        }
      }
    })

    return {
      ...toRefs(state)
    }
  },
}
</script>

<style lang="scss" scoped>
.detail-page {
  background: #fdfeff;

  .content {
    margin: 2.75rem auto;
    max-width: 52rem;
    padding: 2.5rem 3.125rem;
    font-family: "Maven Pro", sans-serif;

    display: flex;
    flex-direction: column;

    background: #ffffff;
    box-shadow: 0 1.25rem 3.75rem rgba(61, 117, 227, 0.06);
    border-radius: 0.75rem;
  }

  nav {
    font-size: 1.25rem;

    span {
      padding-left: 0.5rem;
      color: #c7c9d2;
    }
  }

  h2 {
    font-size: 1.6rem;
    color: #2f3032;
  }

  .date {
    margin-top: 1.875rem;
    line-height: 1.5rem;

    color: #c7c9d2;
  }

  :deep(.desc) {
    margin-top: 2.75rem;

    li {
      list-style: initial;
    }
  }

  img {
    align-self: flex-end;
    margin: 1.75rem 0 5rem;
  }

  :deep(footer) {
    margin-top: 10rem;
  }
}

@media screen and (max-width: 75rem) and (min-width: 60.0625rem) {
  .content {
    max-width: 40rem;
  }
}

@media screen and (max-width: 60rem) {
  .detail-page {
    background: #fff;

    .content {
      margin-top: 1.875rem;
      padding: 0 1.25rem 0;
      box-shadow: none;
    }

    nav {
      font-size: 0.875rem;
    }

    h2 {
      margin-top: 1.25rem;
      font-size: 1.5rem;
    }

    .date {
      margin-top: 0.625rem;
      font-size: 0.875rem;
      color: #c7c9d2;
    }

    .desc {
      margin-top: 0.625rem;
    }

    img {
      margin: 1.75rem 1.25rem 0 0;
    }

    :deep(footer) {
      margin-top: 7.5rem;
    }
  }
}
</style>
