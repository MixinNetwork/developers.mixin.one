<template>
  <nav class="side-bar">
    <div class="logo-container">
      <a href="/" class="home">
        <img src="@/assets/img/logo.svg" alt="mixin-logo"/>
      </a>
      <span>{{ t('dashboard.title') }}</span>
    </div>

    <div
      @click="useClickNewApp"
      :class="['create-app', route.name === 'new_app' ? 'create-app-active' : '' ]"
    >
      <img src="@/assets/img/svg/add.svg" alt="add-new-app"/>
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

    <div @click.stop="useClickUser" class="user-info">
      <img :src="userInfo.avatar_url || defaultAvatar" alt="user-avatar"/>
      <div class="user-name-id">
        <div>{{ userInfo.full_name }}</div>
        <div>ID: {{ userInfo.identity_number }}</div>
      </div>
      <div :class="['logout-modal', (showLogoutModal ? 'active' : '')]">
        <div class="logout-button" @click.stop="useClickSignOut">
          <img src="@/assets/img/svg/logout.svg" alt="logout-logo"/>
          <span>{{ t('dashboard.sign_out') }}</span>
        </div>
      </div>
    </div>
  </nav>

  <div v-if="route.name==='dashboard'" class="app-nav">
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
            'app-logout-modal',
            showLogoutModal ? 'active' : '',
            !isImmersive ? '' : 'header-slot-left'
          ]"
          @click.stop="useClickSignOut"
        >
          <img class="logout-icon" src="@/assets/img/app-svg/logout.svg" alt="logout-logo"/>
          <span>{{ t('dashboard.sign_out') }}</span>
        </div>
      </template>
    </d-header>
    <div v-if="!appList.length" class="welcome">
      <div class="title">{{ t('dashboard.welcome') }}</div>
      <div class="content">{{ t('dashboard.welcome_d') }}</div>
      <div @click="useClickNewApp" class="create-button">
        {{ t('dashboard.create_btn1') }}
        <img src="@/assets/img/app-svg/right.svg" alt="add-new-app-logo"/>
      </div>
    </div>
    <div v-else class="app-list-container">
      <ul class="app-list">
        <li @click="useClickNewApp" class="app-item new-app">
          <div class="new-app-icon"></div>
          <div class="info">{{ t('dashboard.new_app') }}</div>
        </li>
        <li
          v-for="(item, index) in appList"
          :key="index"
          @click="useClickApp(item)"
          class="app-item"
        >
          <img :src="item.icon_url || defaultAppIcon" class="avatar" alt="app-logo"/>
          <div class="info">
            <div class="name">{{ item.name }}</div>
            <div class="number">{{ item.app_number }}</div>
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
.side-bar {
  font-weight: 700;
  z-index: 10;
  background: #fff;
  width: 17.5rem;
  border-right: 0.0625rem solid #e1e7f5;
  position: relative;
  overflow: hidden;

  .logo-container {
    display: flex;
    align-items: center;
    height: 3.75rem;
    padding-left: 2.375rem;
    color: #fff;
    background: #1d69ff;

    .home {
      line-height: 0;
    }

    span {
      margin-left: 1.5rem;
      font-size: 1rem;
    }
  }

  .create-app {
    width: 15rem;
    margin: 2.5rem 0 0 1.25rem;
    border-radius: 0.5rem;
    line-height: 3.125rem;
    cursor: pointer;

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
    height: 100%;
    margin-top: 2.5rem;

    .app-list-header {
      padding: 0 1.625rem 0 1.875rem;
      margin-bottom: 0.375rem;
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

  .user-info {
    display: flex;
    width: 17.5rem;
    height: 6.25rem;
    position: absolute;
    bottom: 0;
    padding: 1.875rem;
    align-content: center;
    border: 0;
    border-bottom: 0.0625rem solid #e1e7f5;
    background: #fff;
    cursor: pointer;

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

    .logout-modal {
      display: none;
      width: 13.75rem;
      position: absolute;
      top: -3.4375rem;
      left: 1.25rem;
      box-shadow: 0 0.125rem 1rem 0 rgba(47, 48, 50, 0.4);
      border-radius: 0.375rem;
      background-color: #fff;
      overflow: hidden;

      &.active {
        display: block;
      }

      .logout-button {
        padding-left: 1.625rem;
        line-height: 3.75rem;
        font-size: 0.875rem;

        &:hover {
          background: #f6f9ff;
        }

        img {
          display: inline-block;
          width: initial;
          height: initial;
          border-radius: initial;
          transform: translate(0, 0.1875rem);
        }

        span {
          font-weight: 500;
        }
      }
    }
  }
}

.app-nav {
  display: none;
  width: 100%;
  height: 100%;

  .header-slot-img {
    width: 2rem;
    height: 2rem;
    transform: translate(0, 0.375rem);
  }

  .app-logout-modal {
    display: none;
    width: 10rem;
    height: 4rem;
    position: absolute;
    top: 3.125rem;
    right: -0.625rem;
    background-color: #fff;
    border-radius: 0.375rem;
    border-bottom: solid 0.0625rem rgba(255, 255, 255, 0.19);
    box-shadow: 0 0.125rem 0.75rem 0 rgba($color: #2f3032, $alpha: 0.26);
    overflow: hidden;

    &.active {
      display: flex;
      align-items: center;
    }

    &.header-slot-left {
      right: initial;
      left: -0.625rem;

      &:after {
        left: 1.375rem;
      }
    }

    .logout-icon {
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

  .welcome {
    position: absolute;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    .title {
      line-height: 1.375rem;
      font-weight: 700;
      font-size: 1.125rem;
    }

    .content {
      width: 15rem;
      margin: 0.875rem 0 1.25rem 0;
      line-height: 1rem;
      font-size: 0.875rem;
    }

    .create-button {
      color: #3277ff;
      font-weight: 500;
      font-size: 1rem;
      line-height: 1.1875rem;

      img {
        height: 0.875rem;
        transform: translate(0.5rem, 0.125rem);
      }
    }
  }

  .app-list-container {
    height: 100%;
    padding: 1.75rem 1.25rem 2.75rem 1.25rem;
    overflow-y: auto;

    .app-list {
      display: flex;
      flex-direction: column;
    }

    .app-item {
      display: flex;
      align-items: center;
      height: 4rem;
      margin-bottom: 0.75rem;
      padding: 0 1.4rem;
      background-color: #eceff6;
      border-radius: 0.625rem;

      .avatar {
        width: 2.3rem;
        height: 2.3rem;
      }

      .info {
        padding: 0 1rem;
        max-width: 100%;

        .name {
          color: #333;
          font-size: 1rem;
          font-weight: 500;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .number {
          margin-top: 0.3rem;
          font-size: 0.75rem;
          color: #a9b0bf;
        }
      }
    }

    .new-app {
      color: #fff;
      background-color: #3277ff;

      .new-app-icon {
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

@media screen and (max-width: 48rem) {
  .side-bar {
    display: none;
  }

  .app-nav {
    display: block;
  }
}
</style>
