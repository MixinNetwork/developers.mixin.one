<template>
  <div :class="['home-page', $i18n.locale]" ref="root">
    <Header />
    <img class="bg-top" src="@/assets/img/svg/home_bg_top.svg" />
    <img class="bg-bottom" src="@/assets/img/svg/home_bg_bottom.svg" />

    <!--  -->
    <section class="animate-up main-title" data-animate="fadeInUp,0.5s,easin-in-out">
      <h2>
        {{$t('home.main.title')}}
        <i
          v-for="i in 3"
          :key="i"
          class="title-dec animate-up"
          data-animate="fadeInUpRotate,0.5s,easin-in-out"
        ></i>
      </h2>
      <ul>
        <li
          v-for="(item, index) in $t('home.main.info')"
          :key="index"
          class="animate-up"
          data-animate="fadeInUp,0.5s,easin-in-out"
          v-html="item"
        ></li>
        <div class="decoration-list">
          <img
            v-for="(icon, index) in ['ltc','sia','zec','doge','btc_','eth','eos','btc','nem','xrp']"
            :key="index"
            :src="require(`@/assets/img/coin/${icon}.png`)"
            class="decoration animate-up"
            :data-animate="`fadeInUpRotate,0.5s,easin-in-out,${(index+1)/20}s`"
          />

          <img
            src="@/assets/img/coin/coder.png"
            class="decoration animate-up"
            data-animate="fadeInUp,0.5s,easin-in-out,.5s"
          />

          <i class="decoration left-line"></i>
          <i class="decoration right-line"></i>
        </div>
        <div class="router-list">
          <a
            v-for="(item,index) in $t('home.main.button')"
            :key="index"
            :href="mainRoute[index]"
            class="animate-up button"
            data-animate="fadeInUp,0.5s,easin-in-out"
          >{{item}}</a>
        </div>
      </ul>
    </section>

    <!--  -->
    <section class="latest-news">
      <!-- <img
        class="text-segmentation animate-up"
        data-animate="fadeInUp,0.5s,easin-in-out,.1s"
        src="@/assets/img/text-segmentation.png"
      />-->
      <h2 class="animate-up" data-animate="fadeInUp,0.5s,easin-in-out">{{$t('news.title')}}</h2>
      <ul>
        <li
          v-for="(item,index) in $t('news.list').slice(0,6)"
          :key="index"
          class="animate-up"
          :data-animate="`fadeInUp,0.5s,easin-in-out`"
        >
          <a :href="'/news/'+index" class="title">{{item.title}}</a>
          <span class="time">{{item.date}}</span>
        </li>
      </ul>
      <router-link
        class="animate-up button"
        data-animate="fadeInUp,0.5s,easin-in-out"
        to="/news"
        tag="a"
      >{{$t('home.button.readmore')}}</router-link>
    </section>

    <!--  -->
    <section class="user-cases">
      <h2 class="animate-up" data-animate="fadeInUp,0.5s,easin-in-out">{{$t('cases.title')}}</h2>
      <ul>
        <li v-for="(item,index) in $t('cases.list')" :key="index">
          <div class="title animate-up" data-animate="fadeInUp,0.5s,easin-in-out,.1s">{{item.title}}</div>
          <img
            :src="require(`@/assets/img/cases/${index+1}.png`)"
            class="animate-up"
            data-animate="fadeInUp,0.5s,easin-in-out,.2s"
          />
          <div
            v-html="item.info"
            class="desc animate-up"
            data-animate="fadeInUp,0.5s,easin-in-out,.3s"
          ></div>
        </li>
      </ul>
      <a
        class="animate-up button"
        data-animate="fadeInUp,0.5s,easin-in-out, .3s"
        href="cases"
      >{{$t('home.button.readmore')}}</a>
    </section>

    <!--  -->
    <section class="documentation">
      <h2
        class="animate-up"
        data-animate="fadeInUp,0.5s,easin-in-out"
      >{{$t('home.documentation.title')}}</h2>
      <div class="container">
        <ul class="section1">
          <li
            v-for="(item,index) in $t('home.documentation.left')"
            :key="index"
            class="animate-up"
            data-animate="fadeInUp,0.5s,easin-in-out"
          >
            <h3>{{item.title}}</h3>
            <p>{{item.info}}</p>
            <a href="#" class="button">{{item.button}}</a>
          </li>
        </ul>
        <ul class="section2">
          <li
            v-for="(item,index) in $t('home.documentation.right')"
            :key="index"
            class="animate-up"
            data-animate="fadeInUp,0.5s,easin-in-out"
          >
            <p>{{item.title}}</p>
            <a href="#">{{item.info}}</a>
          </li>
        </ul>
      </div>
    </section>

    <!--  -->
    <section class="next-step documentation">
      <h2 class="animate-up" data-animate="fadeInUp,0.5s,easin-in-out">{{$t('home.nextstep.title')}}</h2>
      <div class="container">
        <ul class="section1">
          <li
            v-for="(item,index) in $t('home.nextstep.left')"
            :key="index"
            class="animate-up"
            data-animate="fadeInUp,0.5s,easin-in-out"
          >
            <p>{{item.info}}</p>
            <a href="dashboard" class="button">{{item.button}}</a>
          </li>
        </ul>
        <ul class="section2">
          <li
            v-for="(item,index) in $t('home.nextstep.right')"
            :key="index"
            class="animate-up"
            data-animate="fadeInUp,0.5s,easin-in-out"
          >
            <p>{{item.title}}</p>
            <a href="#">{{item.info}}</a>
          </li>
        </ul>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/MainHeader";
import Footer from "@/components/MainFooter";
import tools from "@/assets/js/tools";
export default {
  name: "Home",
  components: { Header, Footer },
  data() {
    return {
      mainRoute: ["/start", "/document", "/dashboard"]
    };
  },
  mounted() {
    tools.changeTheme("#fff");
    require("@/assets/js/resize-first");
    let t = require("@/assets/js/animate-up").default;
    setTimeout(t.bind(this.$refs.root));
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>