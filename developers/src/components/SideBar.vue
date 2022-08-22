<template>
  <nav>
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
            :class="['app-item', route.params.app_number === item.app_number ? 'app-item-active': '']"
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

  <div v-if="route.name==='dashboard'" class="app-dashboard-container">
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
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import DHeader from '@/components/DHeader';
import { useBuyModalStore, useLayoutStore } from '@/stores';
import { getImmersive } from '@/utils/tools';
import defaultAppIcon from '@/assets/img/default_robot.png';
import defaultAvatar from '@/assets/img/default_avatar.png';

const dataStore = useLayoutStore();
const { appList, userInfo } = storeToRefs(dataStore);

const { useCheckCredit } = useBuyModalStore();

const { t } = useI18n();
const showLogoutModal = ref(false);
const isImmersive = ref(getImmersive());
const mobileTitlePosition = computed(() => (!isImmersive.value ? 'left' : 'center'));
const mobileUserPosition = computed(() => (!isImmersive.value ? 'right' : 'left'));

const route = useRoute();
const router = useRouter();
const useToApp = (item) => {
  const uri = `/apps/${item.app_number}`;
  if (uri === route.path) return;
  router.push({
    path: uri,
    hash: '#information',
  });
};

const useClickNewApp = async () => {
  useCheckCredit();
};
const useClickApp = async (item) => {
  useToApp(item);
};
const useClickUser = () => {
  showLogoutModal.value = !showLogoutModal.value;
  if (showLogoutModal.value) {
    document.onclick = () => {
      showLogoutModal.value = false;
    };
  }
};
const useClickSignOut = () => {
  window.localStorage.clear();
  showLogoutModal.value = false;
  setTimeout(() => {
    window.location.href = window.location.origin;
  }, 100);
};
</script>

<style lang="scss" scoped>
nav {
  font-weight: 700;
  z-index: 10;
  background: #fff;
  width: 17.5rem;
  border-right: 0.0625rem solid #e1e7f5;
  position: relative;
  overflow: hidden;

  .top-logo-title {
    height: 3.75rem;
    padding-left: 2.375rem;
    color: #fff;
    background: #1d69ff;
    display: flex;
    align-items: center;

    .home {
      line-height: 0;
    }

    img {
      border-radius: 0;
    }

    span {
      margin-left: 1.5rem;
      font-size: 1rem;
    }
  }

  .middle-app-list {
    height: 100%;

    .create-app {
      cursor: pointer;
      width: 15rem;
      line-height: 3.125rem;
      margin: 2.5rem 0 0 1.25rem;
      border-radius: 0.5rem;

      img {
        width: 1.375rem;
        height: 1.375rem;
        transform: translate(0, 0.3125rem);
        margin-left: 0.875rem;
      }

      span {
        font-size: 1rem;
        line-height: 1rem;
        margin-left: 1.25rem;
      }

      &:hover {
        background: #f6f9ff;
      }

      &.create-app-active {
        background: #f6f9ff;
      }
    }

    .app-list-container {
      margin-top: 2.5rem;
      height: 100%;

      .app-list-header {
        padding-left: 1.875rem;
        padding-right: 1.625rem;
        margin-bottom: 0.375rem;
        display: flex;
        justify-content: space-between;

        .iconfont {
          cursor: pointer;
        }
      }

      .app-list {
        overflow-y: auto;
        height: calc(100% - 20rem);

        &::-webkit-scrollbar {
          width: 0.125rem;
          height: 100%;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 0.625rem;
          -webkit-box-shadow: inset 0 0 0.3125rem #1d69ff;
        }

        .app-item {
          cursor: pointer;
          padding: 0 1.875rem 0 1.875rem;
          height: 3.375rem;
          display: flex;
          align-items: center;

          img {
            width: 1.875rem;
            height: 1.875rem;
            border-radius: 50%;
          }

          span {
            display: inline-block;
            margin-left: 1rem;
            max-width: 10.625rem;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 0.875rem;
          }

          &.app-item-active,
          &:hover {
            background: #f6f9ff;
          }
        }
      }
    }
  }

  .bottom-info {
    position: absolute;
    width: 17.5rem;
    cursor: pointer;
    bottom: 0;
    border: 0;
    background: #fff;
  }

  .middle {
    cursor: pointer;
    padding: 1.875rem;
    height: 6.25rem;
    align-content: center;
    border-bottom: 0.0625rem solid #e1e7f5;
    display: flex;

    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      margin-right: 1rem;
    }

    .user-name-id {
      line-height: 1;

      div:first-child {
        max-width: 9.375rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 0.3125rem;
        font-size: 1rem;
      }

      div:last-child {
        margin-top: 0.1875rem;
        font-size: 0.875rem;
        font-weight: 400;
        color: #b8bdc7;
      }
    }

    &:hover {
      background: #f6f9ff;
    }

    .bottom-more {
      display: none;
      transition: all 0.3s ease-in;
      position: absolute;
      width: 13.75rem;
      top: -1.5625rem;
      background-color: #fff;
      left: 1.25rem;
      box-shadow: 0 0.125rem 1rem 0 rgba(47, 48, 50, 0.4);
      border-radius: 0.375rem;
      overflow: hidden;

      &.bottom-more-active {
        display: block;
        top: -3.4375rem;
      }
    }

    .bottom-button-list {
      font-size: 0.875rem;

      .bottom-button-item {
        padding-left: 1.625rem;
        line-height: 3.75rem;

        i {
          display: inline-block;
          font-size: 1rem;
          transform: translate(0, 0.0625rem);
          margin-right: 0.25rem;
        }

        span {
          font-weight: 500;
        }

        &:hover {
          background: #f6f9ff;
        }
      }

      img {
        width: initial;
        height: initial;
        border-radius: initial;
        display: inline-block;
        transform: translate(0, 0.1875rem);
      }
    }
  }
}

.app-dashboard-container {
  display: none;

  .header-slot-img {
    width: 2rem;
    height: 2rem;
    transform: translate(0, 0.375rem);
  }

  .header-slot-right {
    position: relative;
  }

  .header-slot-left.right-more {
    right: initial;
    left: -0.625rem;

    &:after {
      left: 1.375rem;
    }
  }

  .right-more {
    display: none;
    position: absolute;
    top: 2.5rem;
    transition: top 0.5s;
    right: -0.625rem;
    width: 10rem;
    overflow: hidden;
    box-shadow: 0 0.125rem 0.75rem 0 rgba($color: #2f3032, $alpha: 0.26);
    border-radius: 0.375rem;

    &::after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border: solid 0.3125rem;
      top: -0.625rem;
      right: 1.375rem;
      border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #fff rgba(0, 0, 0, 0);
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: -1;
      background-color: #fff;
    }

    &.right-more-active {
      top: 3.125rem;
      display: block;
    }
  }

  .right-button-list {
    li {
      height: 4rem;
      border-bottom: solid 0.0625rem rgba(255, 255, 255, 0.19);

      display: flex;
      align-items: center;

      img {
        margin-left: 2rem;
        height: 1rem;
        width: 1rem;
        border-radius: 0;
        display: inline-block;
        transform: translate(0, 0);
      }

      span {
        font-size: 0.875rem;
        padding-left: 1.25rem;
      }
    }
  }

  .iconguanbi {
    position: absolute;
    top: 0.8125rem;
    right: 0.8125rem;
    color: #b8bdc7;
    cursor: pointer;
    padding: 0.3125rem;

    &:hover {
      color: rgba(50, 119, 255, 0.8);
    }
  }
}

@media screen and (max-width: 48rem) {
  nav {
    display: none;
  }

  .app-dashboard-container {
    display: block;
    width: 100%;
    height: 100%;

    .no-app {
      position: absolute;
      top: 42%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }

    .no-app-title {
      font-size: 1.125rem;
      line-height: 1.375rem;
      font-weight: 700;
    }

    .no-app-content {
      margin: 0.875rem 0 1.25rem 0;
      width: 15rem;
      font-size: 0.875rem;
      line-height: 1rem;
    }

    .no-app-button {
      font-size: 1rem;
      line-height: 1.1875rem;
      font-weight: 500;
      color: #3277ff;

      img {
        height: 0.875rem;
        transform: translate(0.5rem, 0.125rem);
      }
    }

    .has-app {
      padding: 1.75rem 1.25rem 0 1.25rem;
      overflow-y: auto;
      height: calc(100% - 2.75rem);
    }

    .has-app-list {
      display: flex;
      flex-direction: column;
    }

    .has-app-item {
      height: 4rem;
      border-radius: 0.625rem;
      padding: 0 1.4rem;
      background-color: #eceff6;
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;

      img {
        width: 2.3rem;
        height: 2.3rem;
      }

      & > div {
        padding: 0 1rem;
        max-width: 100%;
      }

      .item-name {
        color: #333;
        font-size: 1rem;
        font-weight: 500;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .item-number {
        font-size: 0.75rem;
        margin-top: 0.3rem;
        color: #a9b0bf;
      }

      &.has-app-new-app {
        color: #fff;
        background-color: #3277ff;

        .new-app-bg {
          position: relative;
          width: 2.3rem;
          height: 2.3rem;
          margin: 0;
          padding: 0;
          background-color: #fff;
          border-radius: 50%;
          line-height: 2rem;
          text-align: center;

          &::after,
          &::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 0.125rem;
            width: 0.25rem;
            height: 1.125rem;
            background-color: #3277ff;
          }

          &::after {
            height: 0.25rem;
            width: 1.125rem;
          }
        }
      }
    }
  }
}
</style>
