<template>
  <div class="home-page" ref="root">
    <Header />
    <img class="bg-top" src="@/assets/img/svg/home_bg_top.svg" />
    <img class="bg-bottom" src="@/assets/img/svg/home_bg_bottom.svg" />

    <!--  -->
    <section class="animate-up main-title" data-animate="fadeInUp,1s,easin-in-out">
      <h2>
        {{$t('home.title')}}
        <i
          v-for="i in 3"
          :key="i"
          class="title-dec animate-up"
          data-animate="fadeInUpRotate,1s,easin-in-out"
        ></i>
      </h2>
      <ul>
        <li
          v-for="(item, index) in $t('home.main.info')"
          :key="index"
          class="animate-up"
          data-animate="fadeInUp,1s,easin-in-out"
          v-html="item"
        ></li>
        <div class="decoration-list">
          <img
            v-for="(icon, index) in ['ltc','sia','zec','doge','btc_','eth','eos','btc','nem','xrp']"
            :key="index"
            :src="require(`@/assets/img/coin/${icon}.png`)"
            class="decoration animate-up"
            :data-animate="`fadeInUpRotate,1s,easin-in-out,${(index+1)/20}s`"
          />

          <img
            src="@/assets/img/coin/coder.png"
            class="decoration animate-up"
            data-animate="fadeInUp,1s,easin-in-out,.5s"
          />

          <i class="decoration left-line"></i>
          <i class="decoration right-line"></i>
        </div>
      </ul>
      <div class="router-list">
        <button
          v-for="(item,index) in $t('home.main.button')"
          :key="index"
          class="animate-up"
          data-animate="fadeInUp,1s,easin-in-out"
        >{{item}}</button>
      </div>
    </section>

    <!--  -->
    <section class="latest-news">
      <img
        class="text-segmentation animate-up"
        data-animate="fadeInUp,1s,easin-in-out,.1s"
        src="@/assets/img/text-segmentation.png"
      />
      <h2 class="animate-up" data-animate="fadeInUp,1s,easin-in-out">{{$t('news.title')}}</h2>
      <ul>
        <li
          v-for="(item,index) in $t('news.list').slice(0,6)"
          :key="index"
          class="animate-up"
          :data-animate="`fadeInUp,1s,easin-in-out`"
        >
          <span @click="$router.push('/news/'+index)" class="title">{{item.title}}</span>
          <span class="time">{{item.date}}</span>
        </li>
      </ul>
      <router-link
        class="animate-up"
        data-animate="fadeInUp,1s,easin-in-out"
        to="/news"
        tag="button"
      >{{$t('home.button.readmore')}}</router-link>
    </section>

    <!--  -->
    <section class="user-cases">
      <h2 class="animate-up" data-animate="fadeInUp,1s,easin-in-out">{{$t('cases.title')}}</h2>
      <ul>
        <li v-for="(item,index) in $t('cases.list')" :key="index">
          <div class="title animate-up" data-animate="fadeInUp,1s,easin-in-out,.1s">{{item.title}}</div>
          <img
            :src="require(`@/assets/img/cases/${index+1}.png`)"
            class="animate-up"
            data-animate="fadeInUp,1s,easin-in-out,.2s"
          />
          <div
            v-html="item.info"
            class="desc animate-up"
            data-animate="fadeInUp,1s,easin-in-out,.3s"
          ></div>
        </li>
      </ul>
      <button
        class="animate-up"
        data-animate="fadeInUp,1s,easin-in-out, .3s"
      >{{$t('home.button.readmore')}}</button>
    </section>

    <!--  -->
    <section class="documentation">
      <h2
        class="animate-up"
        data-animate="fadeInUp,1s,easin-in-out"
      >{{$t('home.documentation.title')}}</h2>
      <div class="container">
        <ul class="section1">
          <li
            v-for="(item,index) in $t('home.documentation.left')"
            :key="index"
            class="animate-up"
            data-animate="fadeInUp,1s,easin-in-out"
          >
            <h3>{{item.title}}</h3>
            <p>{{item.info}}</p>
            <router-link :to="item.href" tag="button">{{item.button}}</router-link>
          </li>
        </ul>
        <ul class="section2">
          <li
            v-for="(item,index) in $t('home.documentation.right')"
            :key="index"
            class="animate-up"
            data-animate="fadeInUp,1s,easin-in-out"
          >
            <p>{{item.title}}</p>
            <router-link :to="item.href" tag="p">{{item.info}}</router-link>
          </li>
        </ul>
      </div>
    </section>

    <!--  -->
    <section class="next-step documentation">
      <h2 class="animate-up" data-animate="fadeInUp,1s,easin-in-out">{{$t('home.nextstep.title')}}</h2>
      <div class="container">
        <ul class="section1">
          <li
            v-for="(item,index) in $t('home.nextstep.left')"
            :key="index"
            class="animate-up"
            data-animate="fadeInUp,1s,easin-in-out"
          >
            <p>{{item.info}}</p>
            <router-link :to="item.href" tag="button">{{item.button}}</router-link>
          </li>
        </ul>
        <ul class="section2">
          <li
            v-for="(item,index) in $t('home.nextstep.right')"
            :key="index"
            class="animate-up"
            data-animate="fadeInUp,1s,easin-in-out"
          >
            <p>{{item.title}}</p>
            <router-link :to="item.href" tag="p">{{item.info}}</router-link>
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
export default {
  name: "Home",
  components: { Header, Footer },
  mounted() {
    require("@/assets/js/resize-first");
    let t = require("@/assets/js/animate-up").default;
    setTimeout(t.bind(this.$refs.root));
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>