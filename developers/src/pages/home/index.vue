<template>
  <div :class="['home-page', $i18n.locale]" ref="root">
    <Header />
    <img class="bg-top" src="@/assets/img/svg/home_bg_top.svg" />
    <img class="bg-bottom" src="@/assets/img/svg/home_bg_bottom.svg" />

    <!--  -->
    <section class="main-title">
      <h2>
        {{$t('home.main.title')}}
        <i
          v-for="i in 3"
          :key="i"
          class="title-dec"
        ></i>
      </h2>
      <ul>
        <li
          v-for="(item, index) in $t('home.main.info')"
          :key="index"
          v-html="item"
        ></li>
        <div class="decoration-list">
          <img
            v-for="(icon, index) in ['ltc','sia','zec','doge','btc_','eth','eos','btc','nem','xrp']"
            :key="index"
            :src="require(`@/assets/img/coin/${icon}.png`)"
            class="decoration"
          />

          <img
            src="@/assets/img/coin/coder.png"
            class="decoration"
          />

          <i class="decoration left-line"></i>
          <i class="decoration right-line"></i>
        </div>
        <div class="router-list">
          <a
            v-for="(item,index) in $t('home.main.button')"
            :key="index"
            :href="mainRoute[index]"
            :target="'_blank'"
            class="button"
          >{{item}}</a>
        </div>
      </ul>
    </section>

    <!--  -->
    <section class="latest-news">
      <h2>{{$t('news.title')}}</h2>
      <ul>
        <li
          v-for="(item,index) in $t('news.list').slice(0,6)"
          :key="index"
        >
          <a :href="'/news/'+item.filename" class="title">{{item.title}}</a>
          <span class="time">{{item.date}}</span>
        </li>
      </ul>
      <router-link
        class="button"
        to="/news"
        tag="a"
      >{{$t('home.button.readmore')}}</router-link>
    </section>

    <!--  -->
    <section class="user-cases">
      <h2>{{$t('cases.title')}}</h2>
      <ul>
        <li v-for="(item,index) in $t('cases.list').slice(0,2)" :key="index">
          <div class="title">{{item.title}}</div>
          <img
            :src="require(`@/i18n/${$i18n.locale}/cases/${item.img}`)"
          />
          <div v-html="item.info" class="desc"></div>
        </li>
      </ul>
      <a class="button" href="cases">{{$t('home.button.readmore')}}</a>
    </section>

    <!--  -->
    <!-- <section class="documentation">
      <h2
       
        
      >{{$t('home.documentation.title')}}</h2>
      <div class="container">
        <ul class="section1">
          <li
            v-for="(item,index) in $t('home.documentation.left')"
            :key="index"
           
            
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
           
            
          >
            <p>{{item.title}}</p>
            <a href="#">{{item.info}}</a>
          </li>
        </ul>
      </div>
    </section>-->

    <!--  -->
    <!-- <section class="next-step documentation">
      <h2>{{$t('home.nextstep.title')}}</h2>
      <div class="container">
        <ul class="section1">
          <li
            v-for="(item,index) in $t('home.nextstep.left')"
            :key="index"
           
            
          >
            <p>{{item.info}}</p>
            <a href="dashboard" class="button">{{item.button}}</a>
          </li>
        </ul>
        <ul class="section2">
          <li
            v-for="(item,index) in $t('home.nextstep.right')"
            :key="index"
           
            
          >
            <p>{{item.title}}</p>
            <a href="#">{{item.info}}</a>
          </li>
        </ul>
      </div>
    </section>-->
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
      mainRoute: ["/document", "/dashboard"]
    };
  },
  mounted() {
    tools.changeTheme("#fff");
    require("@/assets/js/resize-first");
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
