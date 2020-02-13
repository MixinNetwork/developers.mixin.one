<template>
  <div v-loading="all_loading" :class="['development-dashboard', $t('language')]">
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
      <div class="dashboard-center-and-nav">
        <div v-if="entring_status.welcome" class="welcome">
          <img src="@/assets/img/svg/robot.svg" />
          <h1>{{$t('home.welcome')}}</h1>
          <p>{{$t('home.welcome_d')}}</p>
          <button @click="click_new_app" class="primary">{{$t('home.create_btn')}}</button>
        </div>
        <div v-else>
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
          <div v-loading="loading" class="dashboard-main">
            <component
              :is="tmp_component"
              @add_new_app="add_new_app"
              @loading="change_loading"
              :active_app="active_app"
            ></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss' scoped>
@import "./style.scss";
</style>