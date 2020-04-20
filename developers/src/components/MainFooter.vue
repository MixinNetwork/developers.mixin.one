<template>
  <footer>
    <div class="container">
      <div class="community">
        <h6
          class="animate-up"
          data-animate="fadeInUp,0.5s,easin-in-out"
        >{{$t('home.footer.community.title')}}</h6>
        <ul>
          <li
            v-for="(value, key,index) in $t('home.footer.community.list')"
            :key="key"
            class="animate-up"
            :data-animate="`fadeInUp,0.5s,easin-in-out,${(index+1)/10}s`"
          >
            <a :href="value.href">
              <div>
                <img :class="key" :src=" require(`@/assets/img/footer/${key}.png`)" />
              </div>
              <span>{{value.name}}</span>
            </a>
          </li>
        </ul>
      </div>
      <div :class="['resources', lang]">
        <h6
          class="animate-up"
          data-animate="fadeInUp,0.5s,easin-in-out"
        >{{$t('home.footer.resources.title')}}</h6>
        <ul>
          <a
            v-for="(item, index) in $t('home.footer.resources.list')"
            :key="index"
            :href="item.href"
            class="animate-up"
            :data-animate="`fadeInUp,0.5s,easin-in-out,${(index+1) / 5}s`"
          >{{item.name}}</a>
        </ul>
      </div>

      <div class="others">
        <h6
          class="animate-up"
          data-animate="fadeInUp,0.5s,easin-in-out"
        >{{$t('home.footer.others.title')}}</h6>
        <ul>
          <li class="i18n animate-up" data-animate="fadeInUp,0.5s,easin-in-out,0.2s">
            <div @click="toggleLocale" class="locale">
              {{lang === 'zh' ? '中文':'English'}}
              <ul v-if="showLocale" class="select">
                <li @click="clickChangeLocale('zh')">中文</li>
                <li @click="clickChangeLocale('en')">English</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      lang: "",
      showLocale: false
    };
  },
  methods: {
    clickChangeLocale(lang) {
      window.localStorage.setItem("lang", lang);
      window.location.reload();
    },
    toggleLocale() {
      this.showLocale = !this.showLocale;
    }
  },
  mounted() {
    this.lang = this.$i18n.locale;
  }
};
</script>

<style lang="scss" scoped>
footer {
  background: #eef1f9;
  padding-top: 110px;
  margin-top: 300px;
  padding: 110px 0 30px 0;
  display: flex;
  justify-content: center;
}

.container {
  display: flex;
  justify-content: space-around;
  width: 47.875rem;
}

h6 {
  font-size: 22px;
  line-height: 26px;
  margin-bottom: 3.75rem;

  color: #333333;
}

.community {
  min-width: 20rem;
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    // width: 20.75rem;
  }

  li:nth-child(4) {
    div {
      padding-top: 0.3rem;
      // line-height: 1rem;
    }
  }

  a {
    display: flex;
    align-items: center;
    margin-bottom: 3rem;
    cursor: pointer;

    div {
      width: 40px;
    }

    span {
      font-style: italic;
    }

    .twitter {
      width: 24px;
    }
    .github {
      width: 26px;
    }
    .facebook {
      width: 15px;
      height: 25px;
    }
    .youtube {
      width: 30px;
    }
    .reddit {
      width: 27px;
    }
    .telegram {
      width: 25px;
    }
  }
}
.resources {
  &.en {
    min-width: 11rem;
  }
  &.zh {
    min-width: 9rem;
  }
  a {
    cursor: pointer;
    display: block;
    margin-bottom: 3.5rem;
  }
}

.i18n {
  .locale {
    display: inline-block;
    padding: 0 40px 0 0px;

    cursor: pointer;

    position: relative;

    &::before {
      display: block;
      content: "";
      width: 0;
      height: 0;
      position: absolute;
      top: 7px;
      right: 15px;
      border-width: 5px;
      border-style: solid;
      border-color: #000 transparent transparent transparent;
    }
  }

  .select {
    background-color: rgba($color: #fff, $alpha: 0.5);
    width: 100%;
    position: absolute;
    left: 0;
    top: 1.6rem;
    border-radius: 5px;
    li {
      text-align: center;
      border-bottom: 1px solid #eee;
      line-height: 2rem;
    }
  }
}

@media screen and (max-width: 60rem) {
  footer {
    margin-top: 0;
    padding: 0 2.25rem 100px 0;

    .container {
      flex-direction: column;
      justify-content: start;
      width: initial;
      height: 100%;
      padding-top: 1.25rem;
    }

    h6 {
      margin-top: 5rem;
      margin-bottom: 2.625rem;
    }

    .community {
      ul {
        width: 100%;
        min-width: 18rem;
      }
      li {
        margin-bottom: 2rem;
      }
    }

    .resources {
      h6 {
        margin-top: 3rem;
      }
      li {
        margin-bottom: 1.88rem;
      }
    }
  }
}
</style>