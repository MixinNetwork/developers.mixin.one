<template>
  <div class="api-page">
    <Header />

    <section>
      <nav>
        <ul v-for="(item, index) in $t('documentation')" :key="index">
          <a :href="'/document/' +item.router" class="top">{{item.name}}</a>
          <li
            v-for="(nitem, nindex) in item.child"
            :key="nindex"
            :class="n_path_change(nitem, nindex)"
          >
            <a :href="'/document/' +nitem.router" class="item">{{nitem.name}}</a>
            <ul v-if="n_path_change(nitem, nindex) ==='n-active'" class="nnitem-ul">
              <li
                v-for="(nnitem, nnindex) in nitem.child"
                :key="nnindex"
                :class="['nnitem-li', nn_path_change(nnitem, nindex)]"
              >
                <a :href="'/document/' +nnitem.router" class="item">{{nnitem.name}}</a>
              </li>
            </ul>
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
      active_path: "overview",
      active_nindex: -1
    };
  },
  methods: {
    n_path_change(item, nindex) {
      if (item.router === this.active_path || this.active_nindex === nindex) {
        return "n-active";
      }
    },
    nn_path_change(item, nindex) {
      if (item.router === this.active_path) {
        this.active_nindex = nindex;
        return "active";
      }
    }
  },
  mounted() {
    tools.changeTheme("#fff");
    let { router = "overview" } = this.$route.params;
    if (router) this.active_path = router;
    let { locale } = this.$i18n;
    let path = getPathByRouter.call(this, router);
    this.page = require(`@/i18n/${locale}/document/${path}.md`);
    this.$nextTick(() => {
      let t = require("@/assets/js/animate-up").default;
      t();
    });
  }
};

function getPathByRouter(originRouter) {
  let _path = [];
  let documenList = this.$t("documentation");
  let path = iterate(documenList, originRouter, _path);
  this.active_nindex = _path[1];
  return path;
}

function iterate(list, originRouter, _path) {
  let targetRouter = "";
  for (let i = 0; i < list.length; i++) {
    let { router, path, child } = list[i];
    if (originRouter === router) {
      _path.push(i);
      return path;
    }
    if (child) {
      _path.push(i);
      targetRouter = iterate(child, originRouter, _path);
    }
    if (targetRouter) return targetRouter;
  }
  if (!targetRouter) _path.pop();
}
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
  min-width: 15.5rem;
  max-width: 15.5rem;
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
  line-height: 3.75rem;
  border-radius: 0.25rem 0 0 0.25rem;
}
.n-active {
  font-weight: 700;
}

.nnitem-ul {
  margin: 0;
}
.nnitem-li {
  line-height: 2.6rem;
  font-weight: normal;
  margin: 0.2rem 0;
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
  width: calc(100% - 17.5rem);
}
@media screen and (max-width: 75rem) and (min-width: 60.0625rem) {
  section {
    max-width: 40rem;
  }
}
</style>