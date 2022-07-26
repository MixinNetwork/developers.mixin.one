<template>
  <div v-if="$route.name!=='dashboard' || !isMobile" class="dashboard-center-and-nav">
    <div v-if="showWelcome" class="welcome">
      <img src="@/assets/img/svg/robot.svg" alt="robot-icon"/>
      <h1>{{ $t('dashboard.welcome') }}</h1>
      <p>{{ $t('dashboard.welcome_d') }}</p>
      <button @click="newAppClickHandler" class="primary">{{ $t('dashboard.create_btn') }}</button>
    </div>
    <div v-else v-loading="loadingApp">
      <d-header v-if="$route.name!=='dashboard'" class="app-header">
        <template #left>
          <div class="header-back" @click="backward">
            <img src="@/assets/img/app-svg/left.svg" alt="backward-icon"/>
          </div>
        </template>
        <template #center>
          <div>{{ appInfo.name || $t('dashboard.new_app') }}</div>
        </template>
      </d-header>
      <header>
        <div class="header-list">
          <template v-if="isNewApp">
            <span class="header-item new-item">{{ $t('dashboard.new_app') }}</span>
          </template>
          <template v-else>
            <span
              v-for="(item, index) in navList"
              :key="index"
              :class="['header-item', (currentNavIndex === index ? 'header-item-active': '')]"
              @click="navItemClickHandler(index)"
            >{{ $t(item + '.title') }}</span>
          </template>
        </div>
      </header>
      <div class="dashboard-main">
        <component
          :is="currentNav"
          :client="client"
          :active_app="appInfo"
          @add_new_app="add_new_app"
          @loading="changeAppLoadingState"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import DHeader from '@/components/DHeader'
import DModal from '@/components/DModal'
import Information from "@/pages/dashboard/app-information";
import Secret from "@/pages/dashboard/app-secret";
import Wallet from "@/pages/dashboard/app-wallet";

export default {
  name: "app-container",
  components: { Information, Secret, Wallet, DModal, DHeader },
  props: ['isMobile', 'isNewApp', 'showWelcome', 'client', 'appId'],
  data() {
    return {
      loadingApp: false,
      currentNavIndex: 0,
      currentNav: computed(() => this.navList[this.currentNavIndex]),
      navList: ['information', 'wallet', 'secret'],
      appInfo: {}
    }
  },
  watch: {
    '$route.path'(val) {
      this.fetchAppInfo()
    }
  },
  async mounted() {
    this.fetchAppInfo()
  },
  methods: {
    add_new_app() {},
    fetchAppInfo() {
      const { app_number } = this.$route.params
      if (this.$route.path.includes('/apps') && app_number) {
        this.currentNavIndex = 0
        this.loadingApp = true
        if (this.appId) {
          this.client.app.fetch(this.appId).then(app => this.appInfo = app)
        } else {
          this.client.app.fetchList().then(list => list.find(app => this.appInfo = app))
        }
        this.loadingApp = false
      }
    },
    newAppClickHandler() {
      this.$emit('add-new-app')
    },
    navItemClickHandler(index) {
      this.currentNavIndex = index
    },
    changeAppLoadingState(state) {
      this.loadingApp = state
    },
    backward() {
      this.$router.go(-1)
    },
  }
}
</script>

<style lang="scss" scoped>
.dashboard-center-and-nav {
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: #f6f7f9;
  overflow: hidden;
  position: relative;

  & > div {
    width: 100%;
    height: 100%;
  }

  .dashboard-main {
    width: 100%;
    height: calc(100% - 3.75rem);
    overflow: auto;
  }
}

.welcome {
  position: absolute;
  width: 34.625rem;
  height: 18.375rem;
  top: 28.333%;
  bottom: 39%;
  z-index: 0;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
  color: rgba(51, 51, 51, 1);

  img {
    border-radius: 0;
  }

  h1 {
    font-size: 2.75rem;
    line-height: 3.3125rem;
    margin: 2rem 0 0.8125rem 0;
    font-weight: 900;
  }

  p {
    font-size: 1.5rem;
    line-height: 1.875rem;
    font-weight: 400;
  }

  button {
    margin-top: 1.875rem;
    width: 8.75rem;
    height: 3.125rem;
  }
}

header {
  height: 3.75rem;
  background: rgba(255, 255, 255, 1);
  border-bottom: 0.0625rem solid #e1e7f5;
  color: #b8bdc7;
}

.app-header {
  display: none;
}

.header-list {
  font-weight: 700;
  width: 62rem;
  max-width: 100%;
  margin: 0 auto;
  padding: 1.6rem 1rem 0;
  white-space: nowrap;
}

.header-item {
  margin-right: 5rem;
  cursor: pointer;

  &.header-item-active {
    color: #1d69ff;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -0.75rem;
      left: 0;
      height: 0.1875rem;
      width: 1.875rem;
      background: #3277ff;
    }
  }
}

@media screen and (max-width: 48rem) {
  .dashboard-center-and-nav .dashboard-main {
    height: calc(100% - 6rem);
  }

  .app-header {
    display: block;
  }

  .header-back {
    width: 3.125rem;
    transform: translate(-1.5625rem);
    padding-left: 1.5625rem;

    img {
      height: 1.5rem;
      width: 1.5rem;
      transform: translate(0, 0.3125rem)
    }
  }

  .header-list {
    display: flex;
    justify-content: space-between;

    .header-item {
      margin: 0;
    }
  }

}
</style>