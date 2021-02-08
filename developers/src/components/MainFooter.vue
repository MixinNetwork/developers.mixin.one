<template>
  <footer>
    <div class="container">
      <div class="community">
        <h6>{{$t('home.footer.community.title')}}</h6>
        <ul>
          <li
            v-for="(value, key) in $t('home.footer.community.list')"
            :key="key"
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
        <h6>{{$t('home.footer.resources.title')}}</h6>
        <ul>
          <a
            v-for="(item, index) in $t('home.footer.resources.list')"
            :key="index"
            :href="item.href"
          >{{item.name}}</a>
        </ul>
      </div>

      <div class="others">
        <h6>{{$t('home.footer.others.title')}}</h6>
        <ul>
          <li class="i18n">
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
      }
    },
    methods: {
      clickChangeLocale(lang) {
        this.$ls.set("lang", lang)
        window.location.reload()
      },
      toggleLocale() {
        this.showLocale = !this.showLocale
      }
    },
    mounted() {
      this.lang = this.$i18n.locale
    }
  }
</script>

<style lang="scss" scoped>
  footer {
    font-family: sans-serif;
    background: #eef1f9;
    margin-top: 300px;
    padding: 110px 0 30px 0;
    display: flex;
    justify-content: center;
  }

  .container {
    display: flex;
    justify-content: space-around;
    max-width: 63.75rem;
    width: 100%;
    overflow: hidden;
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
    }

    li:nth-child(4) {
      div {
        padding-top: 0.3rem;
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
      padding: 0 40px 75px 0px;

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
      margin-top: 10rem;
      padding: 0 0 100px 2rem;

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
