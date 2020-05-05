<template>
  <div class="api-page">
    <Header />

    <section>
      <nav>
        <ul v-for="(item, index) in $t('documentation')" :key="index">
          <a :href="'/document/' +item.filename" class="top">{{item.name}}</a>
          <li
            v-for="(nitem, nindex) in item.child"
            :key="nindex"
            :class="nitem.filename === active_filename ? 'active' : ''"
          >
            <a :href="'/document/' +nitem.filename" class="item">{{nitem.name}}</a>
          </li>
        </ul>
      </nav>
      <div class="container markdown-body" v-html="page"></div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Header from "@/components/MainHeader";
import Footer from "@/components/MainFooter";
import tools from "@/assets/js/tools";
import "github-markdown-css";
export default {
  name: "News",
  components: { Header, Footer },
  data() {
    return {
      page: "",
      active_filename: "overview"
    };
  },
  methods: {},
  mounted() {
    tools.changeTheme("#fff");
    let { title = "overveiw" } = this.$route.params;
    if (title) this.active_filename = title;
    let { locale } = this.$i18n;
    this.page = require(`@/i18n/${locale}/document/${title}.md`);
    this.$nextTick(() => {
      let t = require("@/assets/js/animate-up").default;
      t();
    });
  }
};
</script>

<style lang="scss" scoped>
.api-page {
  font-family: SF Pro Text;
  background-color: #fff;
}

section {
  max-width: 52rem;
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

nav {
  background: #f5f7fa;
  padding-left: 1.25rem;
  min-width: 12.5rem;
  height: 36.25rem;
  border-radius: 0.3rem;
}

ul {
  margin: 1rem 0;
}

li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 0.625rem;
  height: 3.75rem;
  border-radius: 0.25rem 0 0 0.25rem;
}

.top {
  margin-bottom: 1.2rem;
  font-weight: 600;
}

.item {
  font-size: 1rem;
  opacity: 0.6;
}

li.active {
  background-color: #fff;
  border-radius: 0.3rem 0 0 0.3rem;
}

.container {
  margin-left: 2rem;
  flex: 1;
  max-width: 64rem;

  /deep/ {
    h1 {
      font-size: 3.75rem;
      font-weight: 600;
      line-height: 4.5rem;
      margin-bottom: 2.5rem;
    }
    p {
      color: rgba($color: #3a3c3e, $alpha: 0.8);
      margin: 2.5rem 0;
      line-height: 1.75rem;
    }

    strong {
      font-size: 1.125rem;
      color: #333;
    }

    ol {
      padding-left: 1.25rem;
    }
    li {
      list-style-type: decimal;
      color: #3a3c3e;
      line-height: 1.25rem;
      margin-bottom: 0.625rem;
      opacity: 0.6;
    }
  }
}
@media screen and (max-width: 75rem) and (min-width: 60.0625rem) {
  section {
    max-width: 40rem;
  }
}
</style>