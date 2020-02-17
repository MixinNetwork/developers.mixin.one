<template>
  <div v-loading="all_loading" :class="['development-dashboard', $t('language')]">
    <t-header v-if="$route.path!=='/'" class="app-header">
      <div
        style="width:50px;transform:translate(-25px);padding-left:25px"
        @click="back"
        slot="left"
      >
        <img
          style="height:24px;width:24px;transform:translate(0,5px)"
          src="@/assets/img/app-svg/left.svg"
        />
      </div>
      <div slot="center">{{active_app.name || $t('home.new_app')}}</div>
    </t-header>
    <t-header v-else-if="is_mobile">
      <div :slot="!is_immersive? 'left': 'right'">{{$t('home.title')}}</div>
      <div :slot="!is_immersive? 'right': 'left'">
        <img
          class="header-slot-img"
          @click.stop="click_user_img"
          :src="user_info.avatar_url || _const.default.avatar_url"
        />
        <div
          :class="['right-user-more', show_click_user ? 'right-user-more-active' : '',!is_immersive ? 'header-slot-right' : 'header-slot-left']"
        >
          <div class="right-user-button-list">
            <div @click.stop="click_sign_out" class="right-user-button-item">
              <img class="icondengchu" src="@/assets/img/app-svg/logout.svg" />
              <span>{{$t('home.sign_out')}}</span>
            </div>
          </div>
        </div>
      </div>
    </t-header>
    <div class="dashboard-container">
      <nav class="nav-side">
        <div class="top-logo-title">
          <img src="../../assets/logo.png" />
          <span>{{$t('home.title')}}</span>
        </div>
        <div
          v-if="!app_list.length"
          @click.stop="click_user"
          class="middle-user-or-new-app top-user-info"
        >
          <img :src="user_info.avatar_url || _const.default.avatar_url" />
          <div class="user-info-name-and-id">
            <div>{{user_info.full_name}}</div>
            <div>ID: {{user_info.identity_number}}</div>
          </div>
          <div
            :class="['bottom-user-more', (entring_status.show_click_user ? 'bottom-user-more-active' : '')]"
          >
            <div class="bottom-user-button-list">
              <div @click.stop class="bottom-user-button-item">
                <img src="@/assets/img/svg/logout.svg" />
                <span>{{$t('home.sign_out')}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="middle-app-list-or-new-app">
          <div
            @click="click_new_app"
            :class="['create-new-app',entring_status.is_new_app ? 'create-new-app-active' : '' ]"
          >
            <img src="@/assets/img/svg/add.svg" />
            <span>{{$t('home.new_app')}}</span>
          </div>
          <div class="app-list-container" v-if="app_list.length">
            <div class="app-list-header">
              <div class="app-list-name">{{$t('home.my_app')}}</div>
            </div>
            <div class="app-content">
              <div
                v-for="(item,index) in app_list"
                :key="index"
                @click="click_app_list_item(index)"
                :class="['app-item', active_app.app_id === item.app_id ? 'app-item-active': '']"
              >
                <img :src="item.icon_url || _const.default.app_icon_url" />
                <span>{{item.name}}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="app_list.length"
          @click.stop="click_user"
          class="bottom-user-info middle-user-or-new-app"
        >
          <img :src="user_info.avatar_url || _const.default.avatar_url" />
          <div class="user-info-name-and-id">
            <div>{{user_info.full_name}}</div>
            <div>ID:{{user_info.identity_number}}</div>
          </div>
          <div
            :class="['bottom-user-more', (entring_status.show_click_user ? 'bottom-user-more-active' : '')]"
          >
            <div class="bottom-user-button-list">
              <div @click.stop="click_sign_out" class="bottom-user-button-item">
                <img src="@/assets/img/svg/logout.svg" />
                <span>{{$t('home.sign_out')}}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div v-if="$route.path!=='/' || !is_mobile" class="dashboard-center-and-nav">
        <div v-if="entring_status.welcome" class="welcome">
          <img src="@/assets/img/svg/robot.svg" />
          <h1>{{$t('home.welcome')}}</h1>
          <p>{{$t('home.welcome_d')}}</p>
          <button @click="click_new_app" class="primary">{{$t('home.create_btn')}}</button>
        </div>
        <div v-loading="loading" v-else>
          <header>
            <div :class="['header-list', ('header-index-' +nav_header_index)]">
              <template v-if="entring_status.is_new_app">
                <span
                  class="header-item"
                  style="font-weight:700;color:#1d69ff"
                >{{$t('home.new_app')}}</span>
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
      <div v-if="$route.path==='/' && is_mobile" class="app-dashboard-container">
        <div v-if="!app_list.length" class="no-app">
          <div class="no-app-title">{{$t('home.welcome')}}</div>
          <div class="no-app-content">{{$t('home.welcome_d')}}</div>
          <div @click="click_new_app" class="no-app-button">
            {{$t('home.create_btn1')}}
            <img src="@/assets/img/app-svg/right.svg" />
          </div>
        </div>
        <div v-else class="has-app">
          <div class="has-app-list">
            <div @click="click_new_app" class="has-app-item has-app-new-app">
              <img src="@/assets/img/app-svg/add.svg" />
              <div>{{$t('home.new_app')}}</div>
            </div>
            <div
              v-for="(item,index) in app_list"
              :key="index"
              @click="click_app_list_item(index)"
              class="has-app-item"
            >
              <img :src="item.icon_url || _const.default.app_icon_url" />
              <div>{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="balance_modal" class="edit-information">
      <t-modal :show="balance_modal" :width="is_mobile ? 300 : 600" :height="is_mobile ? 474 : 312">
        <div class="edit-main-modal">
          <img @click="balance_modal=false" src="@/assets/img/app-svg/close.svg" />
          <h3 class="edit-main-modal-title">{{$t('home.buy.title')}}</h3>
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
