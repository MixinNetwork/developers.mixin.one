<template>
  <div v-loading="all_loading" class="development-dashboard-web-app safe-view">
    <template v-if="component_name === ''">
      <transition :name="transition_name">
        <div class="safe-view">
          <m-header :has_shadow="app_list.length ? 0 : 1">
            <template v-if="!is_immersive">
              <div slot="left">{{$t('home.title')}}</div>
              <div class="header-slot-right" slot="right">
                <img
                  class="header-slot-img"
                  @click.stop="click_user_img"
                  :src="user_info.avatar_url || _const.default.avatar_url"
                />
                <div
                  :class="['right-user-more', (show_click_user ? 'right-user-more-active' : '')]"
                >
                  <div class="right-user-button-list">
                    <div @click.stop="click_sign_out" class="right-user-button-item">
                      <img class="icondengchu" src="@/assets/img/app-svg/logout.svg" />
                      <span>{{$t('home.sign_out')}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div slot="center">{{$t('home.title')}}</div>
              <div class="header-slot-left" slot="left">
                <img
                  class="header-slot-img"
                  @click.stop="click_user_img"
                  :src="user_info.avatar_url || _const.default.avatar_url"
                />
                <div
                  :class="['right-user-more', (show_click_user ? 'right-user-more-active' : '')]"
                >
                  <div class="right-user-button-list">
                    <div @click.stop="click_sign_out" class="right-user-button-item">
                      <img class="icondengchu" src="@/assets/img/app-svg/logout.svg" />
                      <span>{{$t('home.sign_out')}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </m-header>
          <m-content :background="app_list.length ? '#fff' : ''">
            <div v-if="!app_list.length" class="no-app">
              <div class="no-app-title">{{$t('home.welcome')}}</div>
              <div class="no-app-content">{{$t('home.welcome_d')}}</div>
              <div @click="click_app_item(null)" class="no-app-button">
                {{$t('home.create_btn1')}}
                <img src="@/assets/img/app-svg/right.svg" />
              </div>
            </div>
            <div v-else class="has-app">
              <div class="has-app-list">
                <div @click="click_app_item(null)" class="has-app-item has-app-new-app">
                  <img src="@/assets/img/app-svg/add.svg" />
                  <div>{{$t('home.new_app')}}</div>
                </div>
                <div
                  v-for="(item,index) in app_list"
                  :key="index"
                  @click="click_app_item(item)"
                  class="has-app-item"
                >
                  <img :src="item.icon_url || _const.default.app_icon_url" />
                  <div>{{item.name}}</div>
                </div>
              </div>
            </div>
          </m-content>
        </div>
      </transition>
    </template>
    <template v-else>
      <transition :name="transition_name">
        <component :is="component_name" @back="back"></component>
      </transition>
    </template>
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss'>
@import "./style.scss";
</style>