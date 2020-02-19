<template>
  <div v-loading="all_loading" :class="['development-dashboard', $t('language')]">
    <template v-if="init_status">
      <t-header v-if="$route.name!=='dashboard'" class="app-header">
        <div class="header-back" @click="back" slot="left">
          <img src="@/assets/img/app-svg/left.svg" />
        </div>
        <div slot="center">{{active_app.name || $t('home.new_app')}}</div>
      </t-header>
      <t-header v-else-if="is_mobile">
        <div :slot="!is_immersive? 'left': 'center'">{{$t('home.title')}}</div>
        <div :slot="!is_immersive? 'right': 'left'">
          <img
            class="header-slot-img"
            @click.stop="click_user"
            :src="user_info.avatar_url || _const.default.avatar_url"
          />
          <div
            :class="['right-more', show_click_user ? 'right-more-active' : '',!is_immersive ? 'header-slot-right' : 'header-slot-left']"
          >
            <ul class="right-button-list">
              <li @click.stop="click_sign_out" class="right-button-item">
                <img class="icondengchu" src="@/assets/img/app-svg/logout.svg" />
                <span>{{$t('home.sign_out')}}</span>
              </li>
            </ul>
          </div>
        </div>
      </t-header>
      <div class="dashboard-container">
        <nav>
          <div class="top-logo-title">
            <img src="@/assets/img/logo.svg" />
            <span>{{$t('home.title')}}</span>
          </div>
          <div class="middle-app-list">
            <div
              @click="click_new_app"
              :class="['create-app',is_new_app ? 'create-app-active' : '' ]"
            >
              <img src="@/assets/img/svg/add.svg" />
              <span>{{$t('home.new_app')}}</span>
            </div>
            <div class="app-list-container" v-if="app_list.length">
              <div class="app-list-header">{{$t('home.my_app')}}</div>
              <ul class="app-list">
                <li
                  v-for="(item,index) in app_list"
                  :key="index"
                  @click="click_app_list_item(index)"
                  :class="['app-item', active_app.app_id === item.app_id ? 'app-item-active': '']"
                >
                  <img :src="item.icon_url || _const.default.app_icon_url" />
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div @click.stop="click_user" class="bottom-info middle">
            <img :src="user_info.avatar_url || _const.default.avatar_url" />
            <div class="user-name-id">
              <div>{{user_info.full_name}}</div>
              <div>ID:{{user_info.identity_number}}</div>
            </div>
            <div :class="['bottom-more', (show_click_user ? 'bottom-more-active' : '')]">
              <div class="bottom-button-list">
                <div @click.stop="click_sign_out" class="bottom-button-item">
                  <img src="@/assets/img/svg/logout.svg" />
                  <span>{{$t('home.sign_out')}}</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div v-if="$route.name!=='dashboard' || !is_mobile" class="dashboard-center-and-nav">
          <div v-if="is_welcome" class="welcome">
            <img src="@/assets/img/svg/robot.svg" />
            <h1>{{$t('home.welcome')}}</h1>
            <p>{{$t('home.welcome_d')}}</p>
            <button @click="click_new_app" class="primary">{{$t('home.create_btn')}}</button>
          </div>
          <div v-loading="loading" v-else>
            <header>
              <div :class="['header-list', ('header-index-' +nav_header_index)]">
                <template v-if="is_new_app">
                  <span class="header-item new-item">{{$t('home.new_app')}}</span>
                </template>
                <template v-else>
                  <span
                    v-for="(item,index) in nav_list"
                    :key="index"
                    :class="['header-item', (nav_header_index === index ? 'herader-item-active':'')]"
                    @click="change_router(index)"
                  >{{$t(item + '.title')}}</span>
                  <div class="move-slider"></div>
                </template>
              </div>
            </header>
            <div class="dashboard-main">
              <component
                :is="tmp_component"
                @add_new_app="add_new_app"
                @loading="change_loading"
                :active_app="active_app"
              ></component>
            </div>
          </div>
        </div>
        <div v-if="$route.name==='dashboard' && is_mobile" class="app-dashboard-container">
          <div v-if="!app_list.length" class="no-app">
            <div class="no-app-title">{{$t('home.welcome')}}</div>
            <div class="no-app-content">{{$t('home.welcome_d')}}</div>
            <div @click="click_new_app" class="no-app-button">
              {{$t('home.create_btn1')}}
              <img src="@/assets/img/app-svg/right.svg" />
            </div>
          </div>
          <div v-else class="has-app">
            <ul class="has-app-list">
              <li @click="click_new_app" class="has-app-item has-app-new-app">
                <div class="new-app-bg"></div>
                <div>{{$t('home.new_app')}}</div>
              </li>
              <li
                v-for="(item,index) in app_list"
                :key="index"
                @click="click_app_list_item(index)"
                class="has-app-item"
              >
                <img :src="item.icon_url || _const.default.app_icon_url" />
                <div>
                  <div class="item-name">{{item.name}}</div>
                  <div class="item-number">{{item.app_number}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <div v-show="balance_modal" class="edit-information">
      <t-modal :show="balance_modal" :width="is_mobile ? 300 : 600" :height="is_mobile ? 474 : 312">
        <div class="edit-modal">
          <img @click="balance_modal=false" src="@/assets/img/app-svg/close.svg" />
          <h3 class="edit-modal-title">{{$t('home.buy.title')}}</h3>
          <span>{{$t('home.buy.desc1')}}</span>
          <p>{{$t('home.buy.desc2')}}</p>
          <button
            @click="click_buy_item(1)"
            class="btns-save primary"
          >{{$t('home.buy.btn',{count:1})}}</button>
          <button
            @click="click_buy_item(2)"
            class="btns-save primary"
          >{{$t('home.buy.btns',{count:2})}}</button>
          <button
            @click="click_buy_item(5)"
            class="btns-save primary"
          >{{$t('home.buy.btns',{count:5})}}</button>
        </div>
      </t-modal>
    </div>
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
