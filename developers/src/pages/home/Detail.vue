<template>
  <div class="detail-page">
    <Header />

    <section class="page animate-up" data-animate="fadeInUp,0.5s,easin-in-out">
      <nav>
        <router-link tag="a" :to="`/${path}`">{{route}}</router-link>
        <span>> {{info.title}}</span>
      </nav>

      <h2>{{info.title}}</h2>

      <p class="date">{{info.date}}</p>

      <div class="desc markdown-body" v-html="desc"></div>

      <img src="@/assets/img/svg/black_logo.svg" />
    </section>

    <Footer />
  </div>
</template>

<script>
import Header from "@/components/MainHeader";
import Footer from "@/components/MainFooter";
import tools from "@/assets/js/tools";
import 'github-markdown-css'

export default {
  name: "NewsDetail",
  components: { Header, Footer },
  data() {
    return {
      route: "",
      info: {},
      path: "",
      desc: ""
    };
  },
  mounted() {
    tools.changeTheme("#fdfeff");
    window.scrollTo(0, 0);
    let { filename: _filename } = this.$route.params;
    let path = "";

    let { name } = this.$route;
    if (name.startsWith("news")) {
      path = "news";
    } else if (name.startsWith("cases")) {
      path = "cases";
    }
    this.path = path;
    this.route = this.$t(path + ".route");

    this.info = this.$t(path + ".list").find(
      item => item.filename === _filename
    );
    let { locale } = this.$i18n;
    let { filename } = this.info;
    if (filename) {
      let t = require(`@/i18n/${locale}/${path}/${this.info.filename}.md`);
      this.desc = t;
    }
    this.$nextTick(() => {
      let t = require("@/assets/js/animate-up").default;
      t();
    });
  }
};
</script>

<style lang="scss" scoped>
.detail-page {
  background: #fdfeff;
}

.page {
  margin: 2.75rem auto;
  max-width: 73.75rem;
  padding: 2.5rem 3.125rem;
  font-family: Maven Pro;

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
  margin-top: 3.375rem;
  font-size: 2.5rem;
  color: #2f3032;
}

.date {
  margin-top: 1.875rem;
  font-size: 1.25rem;
  line-height: 1.5rem;

  color: #c7c9d2;
}

/deep/ .desc {
  margin-top: 3.75rem;
  li {
    list-style: initial;
  }
}

img {
  align-self: flex-end;
  margin: 1.75rem 0 5rem;
}

/deep/ footer {
  margin-top: 10rem;
}

@media screen and (max-width: 60rem) {
  .detail-page {
    background: #fff;
  }

  .page {
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

  /deep/ footer {
    margin-top: 7.5rem;
  }
}
</style>