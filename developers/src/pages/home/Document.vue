<template>
  <div class="api-page">
    <Header />

    <section>
      <nav>
        <ul v-for="(item, index) in document" :key="index">
          <a href class="top">{{item.name}}</a>
          <li
            :class="nindex === activeIdx ? 'active' : ''"
            v-for="(nitem, nindex) in item.child"
            :key="nindex"
          >
            <a :href="nitem.route" class="item">{{nitem.name}}</a>
          </li>
        </ul>
      </nav>
      <div class="container" v-html="page">123</div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Header from "@/components/MainHeader";
import Footer from "@/components/MainFooter";
export default {
  name: "News",
  components: { Header, Footer },
  data() {
    return {
      page: "",
      activeIdx: 0,
      document: [
        {
          name: "Get Start",
          route: ""
        },
        {
          name: "Build your first app",
          route: "",
          child: [
            { name: "Overview", route: "/document/0" },
            { name: "Create new app", route: "/document/1" },
            { name: "Create user", route: "/document/2" },
            { name: "Transfer", route: "/document/3" }
          ]
        },
        {
          name: "API reference",
          route: ""
        },
        {
          name: "Best practies",
          route: ""
        }
      ]
    };
  },
  methods: {},
  mounted() {
    this.page = require("@/i18n/en/document/overview.md");
    let { title } = this.$route.params;
    if (title) this.activeIdx = Number(title);

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
}

section {
  max-width: 72.5rem;
  margin: 3.25rem auto;
  padding: 0 3rem;

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
}

.container {
  margin-left: 2rem;
  flex: 1;
  max-width: 64rem;

  /deep/ {
    h1 {
      font-size: 60px;
      font-weight: 600;
      line-height: 72px;
      margin-bottom: 40px;
    }
    p {
      color: rgba($color: #3a3c3e, $alpha: 0.8);
      margin: 40px 0;
      line-height: 28px;
    }

    strong {
      font-size: 18px;
      color: #333;
    }

    ol {
      padding-left: 1.25rem;
    }
    li {
      list-style-type: decimal;
      color: #3a3c3e;
      line-height: 20px;
      margin-bottom: 10px;
      opacity: 0.6;
    }
  }
}
</style>