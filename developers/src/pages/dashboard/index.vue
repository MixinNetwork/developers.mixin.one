<template>
  <div v-loading="loadingAll" :class="['development-dashboard', $t('language')]">
    <div class="dashboard-container">
      <nav v-if="!isMobile">
        <div class="top-logo-title">
          <a href="/" class="home">
            <img src="@/assets/img/logo.svg"/>
          </a>
          <span>{{ $t('dashboard.title') }}</span>
        </div>
        <div class="middle-app-list">
          <div
            @click="newAppHandler"
            :class="['create-app', isNewApp ? 'create-app-active' : '' ]"
          >
            <img src="@/assets/img/svg/add.svg"/>
            <span>{{ $t('dashboard.new_app') }}</span>
          </div>
          <div class="app-list-container" v-if="appList.length">
            <div class="app-list-header">{{ $t('dashboard.my_app') }}</div>
            <ul class="app-list">
              <li
                v-for="(item, index) in appList"
                :key="index"
                @click="appItemClickHandler(item)"
                :class="['app-item', currentAppId === item.app_id ? 'app-item-active': '']"
              >
                <img :src="item.icon_url || _const.default.app_icon_url"/>
                <span>{{ item.name }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div @click.stop="userClickHandler" class="bottom-info middle">
          <img :src="userInfo.avatar_url || _const.default.avatar_url"/>
          <div class="user-name-id">
            <div>{{ userInfo.full_name }}</div>
            <div>ID: {{ userInfo.identity_number }}</div>
          </div>
          <div :class="['bottom-more', (showLogoutPanel ? 'bottom-more-active' : '')]">
            <div class="bottom-button-list">
              <div @click.stop="signOut" class="bottom-button-item">
                <img src="@/assets/img/svg/logout.svg"/>
                <span>{{ $t('dashboard.sign_out') }}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div v-else-if="$route.name==='dashboard'" class="app-dashboard-container">
        <d-header>
          <template v-slot:[mobileTitlePosition]>
            {{ $t('dashboard.title') }}
          </template>
          <template v-slot:[mobileUserPosition]>
            <img
              class="header-slot-img"
              @click.stop="userClickHandler"
              :src="userInfo.avatar_url || _const.default.avatar_url"
            />
            <div
              :class="[
            'right-more',
            showLogoutPanel ? 'right-more-active' : '',
            !isImmersive ? 'header-slot-right' : 'header-slot-left'
          ]"
            >
              <ul class="right-button-list">
                <li @click.stop="signOutClickHandler" class="right-button-item">
                  <img class="icondengchu" src="@/assets/img/app-svg/logout.svg"/>
                  <span>{{ $t('dashboard.sign_out') }}</span>
                </li>
              </ul>
            </div>
          </template>
        </d-header>
        <div v-if="!appList.length" class="no-app">
          <div class="no-app-title">{{ $t('dashboard.welcome') }}</div>
          <div class="no-app-content">{{ $t('dashboard.welcome_d') }}</div>
          <div @click="newAppHandler" class="no-app-button">
            {{ $t('dashboard.create_btn1') }}
            <img src="@/assets/img/app-svg/right.svg"/>
          </div>
        </div>
        <div v-else class="has-app">
          <ul class="has-app-list">
            <li @click="newAppHandler" class="has-app-item has-app-new-app">
              <div class="new-app-bg"></div>
              <div>{{ $t('dashboard.new_app') }}</div>
            </li>
            <li
              v-for="(item,index) in appList"
              :key="index"
              @click="appItemClickHandler(item)"
              class="has-app-item"
            >
              <img :src="item.icon_url || _const.default.app_icon_url"/>
              <div>
                <div class="item-name">{{ item.name }}</div>
                <div class="item-number">{{ item.app_number }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <Container
        :appId="currentAppId"
        :isMobile="isMobile"
        :isNewApp="isNewApp"
        :showWelcome="showWelcome"
        :client="client"
        @add-new-app="newAppHandler"
      ></Container>
    </div>

    <d-modal :show="showBuyPanel">
      <div class="edit-modal">
        <img @click="showBuyPanel=false" src="@/assets/img/app-svg/close.svg"/>
        <h3 class="edit-modal-title">{{ $t('dashboard.buy.title') }}</h3>
        <span>{{ $t('dashboard.buy.desc1') }}</span>
        <p>{{ $t('dashboard.buy.desc2') }}</p>
        <button
          @click="buyAppClickHandler(1)"
          class="btns-save primary"
        >{{ $t('dashboard.buy.btn', {count: 1}) }}
        </button>
        <button
          @click="buyAppClickHandler(2)"
          class="btns-save primary"
        >{{ $t('dashboard.buy.btns', {count: 2}) }}
        </button>
        <button
          @click="buyAppClickHandler(5)"
          class="btns-save primary"
        >{{ $t('dashboard.buy.btns', {count: 5}) }}
        </button>
      </div>
    </d-modal>
  </div>
</template>

<script type='text/javascript' charset='utf-8' src='./script.js'></script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
