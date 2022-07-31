<template>
  <div v-loading="loadingAll" :class="['development-dashboard', t('language')]">
    <div class="dashboard-container">
      <nav v-if="!isMobile">
        <div class="top-logo-title">
          <a href="/" class="home">
            <img src="@/assets/img/logo.svg" alt="mixin-logo"/>
          </a>
          <span>{{ t('dashboard.title') }}</span>
        </div>
        <div class="middle-app-list">
          <div
            @click="useClickNewApp"
            :class="['create-app', route.name === 'new_app' ? 'create-app-active' : '' ]"
          >
            <img src="@/assets/img/svg/add.svg" alt="add-new-app-logo"/>
            <span>{{ t('dashboard.new_app') }}</span>
          </div>
          <div class="app-list-container" v-if="appList.length">
            <div class="app-list-header">{{ t('dashboard.my_app') }}</div>
            <ul class="app-list">
              <li
                v-for="(item, index) in appList"
                :key="index"
                @click="useClickApp(item)"
                :class="['app-item', currentAppId === item.app_id ? 'app-item-active': '']"
              >
                <img :src="item.icon_url || defaultAppIcon" alt="app-logo"/>
                <span>{{ item.name }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div @click.stop="useClickUser" class="bottom-info middle">
          <img :src="userInfo.avatar_url || defaultAvatar" alt="user-avatar"/>
          <div class="user-name-id">
            <div>{{ userInfo.full_name }}</div>
            <div>ID: {{ userInfo.identity_number }}</div>
          </div>
          <div :class="['bottom-more', (showLogoutModal ? 'bottom-more-active' : '')]">
            <div class="bottom-button-list">
              <div @click.stop="useClickSignOut" class="bottom-button-item">
                <img src="@/assets/img/svg/logout.svg" alt="logout-logo"/>
                <span>{{ t('dashboard.sign_out') }}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div v-else-if="route.name==='dashboard'" class="app-dashboard-container">
        <d-header>
          <template v-slot:[mobileTitlePosition]>
            {{ t('dashboard.title') }}
          </template>
          <template v-slot:[mobileUserPosition]>
            <img
              class="header-slot-img"
              @click.stop="useClickUser"
              :src="userInfo.avatar_url || defaultAvatar"
              alt="user-avatar"
            />
            <div
              :class="[
            'right-more',
            showLogoutModal ? 'right-more-active' : '',
            !isImmersive ? 'header-slot-right' : 'header-slot-left'
          ]"
            >
              <ul class="right-button-list">
                <li @click.stop="useClickSignOut" class="right-button-item">
                  <img class="icondengchu" src="@/assets/img/app-svg/logout.svg" alt="logout-logo"/>
                  <span>{{ t('dashboard.sign_out') }}</span>
                </li>
              </ul>
            </div>
          </template>
        </d-header>
        <div v-if="!appList.length" class="no-app">
          <div class="no-app-title">{{ t('dashboard.welcome') }}</div>
          <div class="no-app-content">{{ t('dashboard.welcome_d') }}</div>
          <div @click="useClickNewApp" class="no-app-button">
            {{ t('dashboard.create_btn1') }}
            <img src="@/assets/img/app-svg/right.svg" alt="add-new-app-logo"/>
          </div>
        </div>
        <div v-else class="has-app">
          <ul class="has-app-list">
            <li @click="useClickNewApp" class="has-app-item has-app-new-app">
              <div class="new-app-bg"></div>
              <div>{{ t('dashboard.new_app') }}</div>
            </li>
            <li
              v-for="(item, index) in appList"
              :key="index"
              @click="useClickApp(item)"
              class="has-app-item"
            >
              <img :src="item.icon_url || defaultAppIcon" alt="app-logo"/>
              <div>
                <div class="item-name">{{ item.name }}</div>
                <div class="item-number">{{ item.app_number }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <app-container
        :appId="currentAppId"
        :isMobile="isMobile"
        @check-app-credit="useClickNewApp"
        @add-new-app="useNewAppSubmitted"
      ></app-container>
    </div>

    <d-modal :show="showBuyModal">
      <div class="edit-modal">
        <img @click="showBuyModal=false" src="@/assets/img/app-svg/close.svg" alt="close-modal-btn"/>
        <h3 class="edit-modal-title">{{ t('dashboard.buy.title') }}</h3>
        <span>{{ t('dashboard.buy.desc1') }}</span>
        <p>{{ t('dashboard.buy.desc2') }}</p>
        <button
          @click="useClickBuyApp(1)"
          class="btns-save primary"
        >{{ t('dashboard.buy.btn', {count: 1}) }}
        </button>
        <button
          @click="useClickBuyApp(2)"
          class="btns-save primary"
        >{{ t('dashboard.buy.btns', {count: 2}) }}
        </button>
        <button
          @click="useClickBuyApp(5)"
          class="btns-save primary"
        >{{ t('dashboard.buy.btns', {count: 5}) }}
        </button>
      </div>
    </d-modal>
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
